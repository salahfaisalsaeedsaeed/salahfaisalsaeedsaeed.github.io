const fs = require("fs");
const path = require("path");
const vm = require("vm");

const source = fs.readFileSync("script.js", "utf8");
const failures = [];

const expectedMinimums = {
  awards: 5,
  credentials: 33,
  recommendations: 15,
  experience: 7
};

for (const [folder, minimum] of Object.entries(expectedMinimums)) {
  const dir = path.join("media", "assets", folder);
  if (!fs.existsSync(dir)) {
    failures.push("missing folder: " + dir);
    continue;
  }
  const files = fs.readdirSync(dir).filter(name => name !== ".gitkeep");
  if (files.length < minimum) {
    failures.push(`${folder}: expected at least ${minimum} uploaded files, found ${files.length}`);
  }
  for (const file of files) {
    const allowed = folder === "credentials"
      ? /\.(?:webp|jpe?g|png|pdf)$/i.test(file)
      : /\.(?:webp|jpe?g|png)$/i.test(file);
    if (!allowed) failures.push(`${folder}: unexpected evidence file type ${file}`);
    const full = path.join(dir, file);
    if (fs.statSync(full).size <= 0) failures.push(`${folder}: empty file ${file}`);
  }
}

const blockStart = source.indexOf("const LOCAL_EVIDENCE_MEDIA = {");
const blockEnd = source.indexOf("\nconst MEDIA_ORDER =", blockStart);
const block = blockStart >= 0 && blockEnd > blockStart ? source.slice(blockStart, blockEnd) : "";

for (const token of [
  "LOCAL_EVIDENCE_MEDIA",
  "function localEvidenceModels(",
  "fallback_display_file_ids",
  "data.localModelMap",
  "function renderingFallbackUrl(",
  "data-fallback-src",
  'sourceRecord(row, "awards")',
  'sourceRecord(row, "credentials")',
  'collection: "recommendations"',
  'recordAssets(data, experience, "experiences")'
]) {
  if (!source.includes(token)) failures.push("script.js missing: " + token);
}

const paths = [...block.matchAll(/["'](\/media\/assets\/(?:awards|credentials|recommendations|experience)\/[^"']+\.(?:webp|jpe?g|png|pdf))["']/gi)]
  .map(match => match[1]);

if (!paths.length) failures.push("no GitHub evidence media paths found in LOCAL_EVIDENCE_MEDIA");

for (const publicPath of new Set(paths)) {
  const fsPath = publicPath.replace(/^\//, "");
  if (!fs.existsSync(fsPath)) failures.push("manifest path missing from repository: " + publicPath);
}

const certificatePath = "/media/assets/credentials/Student_Appreciation_for_Teaching_Excellence.webp";
const awardsStart = block.indexOf("  awards: [");
const credentialsStart = block.indexOf("  credentials: [");
const recommendationStart = block.indexOf("  recommendations: [");
const awardSpecs = block.slice(awardsStart, credentialsStart);
const credentialSpecs = block.slice(credentialsStart, recommendationStart);
for (const [scope, specs] of [["awards", awardSpecs], ["credentials", credentialSpecs]]) {
  if (!specs.includes('all: ["student", "teaching excellence"]') ||
      !specs.includes(certificatePath)) {
    failures.push("student teaching-excellence recognition lacks a local media mapping in " + scope);
  }
}
if (!fs.existsSync(certificatePath.slice(1))) {
  failures.push("student teaching-excellence certificate asset is missing");
}
for (const token of [
  "function renderingGithubBackupUrl(",
  "data-github-fallback-src",
  "image.dataset.githubFallbackSrc",
  "image.dataset.fallbackIndex"
]) {
  if (!source.includes(token)) failures.push("missing backup image preview behavior: " + token);
}

// Regression: the public Union certificates have filenames spelling "Sinaa",
// while the displayed issuer spells "Sina’a". Use the actual site matcher to
// verify both awards work with or without an Appwrite asset ID.
const normalizedStart = source.indexOf("const normalizedKey =");
const normalizedEnd = source.indexOf("\nconst sortRows", normalizedStart);
const evidenceTextStart = source.indexOf("function localEvidenceText(");
const matcherStart = source.indexOf("function localEvidenceSpecMatches(");
const matcherEnd = source.indexOf("\nfunction localEvidenceModels(", matcherStart);
if ([normalizedStart, normalizedEnd, evidenceTextStart, matcherStart, matcherEnd].some(x => x < 0)) {
  failures.push("cannot locate actual credential media-matching functions");
} else {
  const fixtures = [
    { title: "Founding Member Certificate — Sina’a Union", issuer: "Sina’a Union", category: "community_engagement" },
    { title: "Training and Active Participation Certificate — Sina’a Union", issuer: "Sina’a Union", category: "community_engagement" },
    { title: "Founding Member Certificate — Sinaa Union", issuer: "Sinaa Union", category: "community_engagement", asset_id: "local:credential:founding" },
    { title: "Training and Active Participation Certificate — Sinaa Union", issuer: "Sinaa Union", category: "community_engagement", asset_id: "local:credential:training-participation" },
    { title: "Unrelated Community Certificate", issuer: "Another Organization", category: "community_engagement" }
  ];
  const matcherCode = [
    source.slice(normalizedStart, normalizedEnd),
    "const assetIdsFromRecord = row => row.asset_id ? [row.asset_id] : [];",
    source.slice(evidenceTextStart, matcherStart),
    source.slice(matcherStart, matcherEnd),
    block,
    'this.matches = fixtures.map(row => LOCAL_EVIDENCE_MEDIA.credentials.filter(spec => spec.id.startsWith("sinaa-") && localEvidenceSpecMatches(spec, row)).map(spec => spec.id));'
  ].join("\n");
  try {
    const context = { fixtures };
    vm.runInNewContext(matcherCode, context);
    const expected = [
      ["sinaa-founding"], ["sinaa-training"],
      ["sinaa-founding"], ["sinaa-training"], []
    ];
    expected.forEach((want, index) => {
      const got = context.matches[index] || [];
      if (JSON.stringify(Array.from(got)) !== JSON.stringify(want)) {
        failures.push("Sina’a certificate matcher failed fixture " + index + ": " + JSON.stringify(got));
      }
    });
  } catch (error) {
    failures.push("Sina’a certificate matcher threw: " + error.message);
  }
}
for (const asset of [
  "Founding_Member_Certificate_Sinaa_Union.webp",
  "Training_and_Active_Participation_Certificate_Sinaa_Union.webp"
]) {
  if (!fs.existsSync(path.join("media", "assets", "credentials", asset))) {
    failures.push("missing public Union certificate image: " + asset);
  }
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log(`PASS|GitHub evidence media verified across ${Object.keys(expectedMinimums).length} folders; local-first with Appwrite fallback is configured`);
