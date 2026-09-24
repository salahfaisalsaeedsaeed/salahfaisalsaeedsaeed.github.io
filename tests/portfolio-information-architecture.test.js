const fs = require("fs");

const failures = [];
const pages = {
  media: fs.readFileSync("media/index.html","utf8"),
  awards: fs.readFileSync("awards/index.html","utf8"),
  credentials: fs.readFileSync("credentials/index.html","utf8"),
  recommendations: fs.readFileSync("recommendations/index.html","utf8"),
  verification: fs.readFileSync("institutional-evidence/index.html","utf8"),
  teaching: fs.readFileSync("teaching/index.html","utf8"),
  experience: fs.readFileSync("experience/index.html","utf8"),
  documents: fs.readFileSync("documents/index.html","utf8")
};
const source = fs.readFileSync("script.js","utf8");

const requiredLabels = [
  "Media &amp; Activities",
  "Honors &amp; Awards",
  "Certifications &amp; Training",
  "Recommendations &amp; References",
  "Verification &amp; Documents"
];

for (const [name, html] of Object.entries(pages)) {
  if (name === "documents") continue;
  for (const label of requiredLabels) {
    if (!html.includes(label)) failures.push(`${name}: missing portfolio navigation label ${label}`);
  }
  if (html.includes('href="/documents/"')) failures.push(`${name}: legacy Documents navigation link remains`);
}

for (const token of [
  'id="teaching-media"',
  'id="teachingMediaPortfolio"',
  'id="experience-media"',
  'id="experienceMediaPortfolio"',
  'id="academic-documents"',
  "Academic &amp; Application Documents"
]) {
  if (![pages.teaching,pages.experience,pages.verification].some(html => html.includes(token))) {
    failures.push("missing contextual portfolio token: " + token);
  }
}

for (const token of [
  "function renderContextMedia()",
  "function contextualMediaSection(",
  "function isHonorRecord(",
  'link.textContent = "Media & Activities"',
  'link.textContent = "Honors & Awards"',
  'link.textContent = "Certifications & Training"',
  'link.textContent = "Recommendations & References"',
  'link.textContent = "Verification & Documents"'
]) {
  if (!source.includes(token)) failures.push("script.js missing: " + token);
}

if (!pages.documents.includes('/institutional-evidence/#academic-documents')) {
  failures.push("legacy Documents page does not route to merged verification page");
}

if (failures.length) {
  console.error(failures.map(x=>"FAIL|"+x).join("\n"));
  process.exit(1);
}
console.log("PASS|portfolio navigation includes Media & Activities while contextual evidence and merged Documents remain organized");
