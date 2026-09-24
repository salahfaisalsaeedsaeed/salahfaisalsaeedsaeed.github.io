const fs = require("fs");
const path = require("path");

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
    if (!/\.(?:webp|jpe?g|png)$/i.test(file)) failures.push(`${folder}: unexpected non-image display derivative ${file}`);
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
  'collection: "awards"',
  'collection: "credentials"',
  'collection: "recommendations"',
  'recordAssets(data, experience, "experiences")'
]) {
  if (!source.includes(token)) failures.push("script.js missing: " + token);
}

const paths = [...block.matchAll(/["'](\/media\/assets\/(?:awards|credentials|recommendations|experience)\/[^"']+\.webp)["']/g)]
  .map(match => match[1]);

if (!paths.length) failures.push("no GitHub evidence media paths found in LOCAL_EVIDENCE_MEDIA");

for (const publicPath of new Set(paths)) {
  const fsPath = publicPath.replace(/^\//, "");
  if (!fs.existsSync(fsPath)) failures.push("manifest path missing from repository: " + publicPath);
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log(`PASS|GitHub evidence media verified across ${Object.keys(expectedMinimums).length} folders; local-first with Appwrite fallback is configured`);
