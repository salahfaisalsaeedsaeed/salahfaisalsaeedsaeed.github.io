const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const fallback = JSON.parse(fs.readFileSync("data/public-fallback.json", "utf8"));
const teaching = fs.readFileSync("teaching/index.html", "utf8");
const failures = [];

for (const token of [
  "WITHHELD_NEMAH_RASSAM_DOCUMENTS",
  "function isNemahRassamRecord(row)",
  "function rassamTextOnlyHonors()",
  "function mergeRassamTextOnlyHonors(",
  "function honorTextCard(",
  'title: "STEM Technical Education Specialist & Laboratory Engineer"',
  'title: "Physics Teacher — Second Secondary (Grade 11)"',
  'period_label: "Aug 2023 – May 2025"',
  "Original Prusa MK4S",
  "Artificial Bee Colony (ABC)",
  "Engineering Research and Academic Writing Training Program"
]) {
  if (!source.includes(token)) failures.push("script.js missing: " + token);
}

const withheldFiles = [
  "Certificate_of_Appreciation_Laboratory_Development.webp",
  "Certificate_of_Appreciation_Professional_Excellence_and_Service.webp",
  "Certificate_of_Appreciation_Research_and_Academic_Writing.webp",
  "Salah_Faisal_Employment_Certificate_Ne_page_01.webp",
  "Salah_Faisal_Research_Mentorship_Experience_Letters_page_01.webp",
  "Salah_Faisal_Research_Mentorship_Experience_Letters_page_02.webp"
];

for (const filename of withheldFiles) {
  if (!source.includes(filename)) failures.push("withheld-file registry missing: " + filename);
}

const localStart = source.indexOf("const LOCAL_EVIDENCE_MEDIA = {");
const localEnd = source.indexOf("\nconst MEDIA_ORDER =", localStart);
const localBlock = localStart >= 0 && localEnd > localStart ? source.slice(localStart, localEnd) : "";
for (const filename of withheldFiles) {
  if (localBlock.includes(filename)) failures.push("withheld Rassam document is still mapped for public rendering: " + filename);
}

const schoolAwards = (fallback.awards || []).filter(row =>
  /rassam/i.test([row.issuer,row.title,row.description].filter(Boolean).join(" "))
);
if (schoolAwards.length !== 4) failures.push("expected 4 text-only Rassam certificates, found " + schoolAwards.length);
for (const row of schoolAwards) {
  if (row.text_only !== true) failures.push("Rassam certificate is not text-only: " + row.title);
  if (row.asset_id || row.asset_ids || row.evidence_asset_ids) failures.push("Rassam certificate exposes a file relationship: " + row.title);
}

for (const title of [
  "Certificate of Appreciation — Engineering Research & Academic Writing Program",
  "Certificate of Appreciation — Laboratory Development",
  "Certificate of Appreciation — Professional Excellence & Dedicated Service",
  "Certificate of Appreciation — Robotics & Prototyping Laboratory Development"
]) {
  if (!source.includes(title)) failures.push("text-only certificate missing from renderer: " + title);
}

const stem = (fallback.experiences || []).find(row => row.$id === "fallback-exp-rassam-stem");
const physics = (fallback.experiences || []).find(row => row.$id === "fallback-exp-rassam-physics");
if (!stem || stem.title !== "STEM Technical Education Specialist & Laboratory Engineer") failures.push("updated full-time Rassam role missing");
if (!stem || stem.start_date !== "2022-01-15" || !stem.current) failures.push("updated full-time Rassam dates/status missing");
if (!physics || physics.period_label !== "Aug 2023 – May 2025") failures.push("updated Grade 11 Physics role missing");
if ((stem?.evidence_asset_ids || []).length || (physics?.evidence_asset_ids || []).length) failures.push("Rassam experience must not expose school-issued document assets");

for (const token of [
  "Physics Teacher — Second Secondary (Grade 11)",
  "Established 2024",
  "Annual: August – April",
  "two student-involved papers published in IEEE Xplore",
  "four additional student-involved IEEE Xplore publications",
  "Six-month program"
]) {
  if (!teaching.includes(token)) failures.push("teaching page missing: " + token);
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}
console.log("PASS|four Rassam certificates are listed as text-only honors while the unsigned source documents remain hidden");
