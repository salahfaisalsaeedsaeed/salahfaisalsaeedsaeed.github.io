const fs = require("fs");

const failures = [];
const pages = {
  overview: fs.readFileSync("credentials/index.html","utf8"),
  honors: fs.readFileSync("awards/index.html","utf8"),
  research: fs.readFileSync("research-conferences/index.html","utf8"),
  industrial: fs.readFileSync("industrial-training/index.html","utf8"),
  development: fs.readFileSync("professional-development/index.html","utf8")
};
const source = fs.readFileSync("script.js","utf8");
const sitemap = fs.readFileSync("sitemap.xml","utf8");

const pageTokens = {
  overview: ["Credentials & Recognition", 'id="credentialDirectory"', 'id="credentialOverviewHighlights"', "Selected Credentials & Distinctions"],
  honors: ["Honors & Distinctions", "#research-awards", "#academic-distinction", "#teaching-recognition", "#community-recognition"],
  research: ["Research, Conferences & Scholarly Engagement", 'id="researchConferenceContent"', "#esmarta-2026", "#scholarly-symposia"],
  industrial: ["Industrial Training & Engineering Practice", 'id="industrialTrainingList"'],
  development: ["Courses & Professional Development", 'id="professionalDevelopmentContent"', "#technology-skills", "#languages-communication"]
};

for (const [name,tokens] of Object.entries(pageTokens)) {
  for (const token of tokens) if (!pages[name].includes(token)) failures.push(name + ": missing " + token);
}

for (const token of [
  "function credentialRowsForDisplay(",
  "function isResearchConferenceCredential(",
  "function isIndustrialTrainingCredential(",
  "function isLanguageCredential(",
  "function selectedCredentialHighlights(",
  "async function renderResearchConferences()",
  "async function renderIndustrialTraining()",
  "async function renderProfessionalDevelopment()",
  "Research Awards & Recognition",
  "Academic Distinction & Ranking",
  "Teaching & Educational Recognition",
  "Professional & Institutional Recognition",
  "Leadership & Community Recognition"
]) {
  if (!source.includes(token)) failures.push("script.js missing: " + token);
}

for (const route of ["/research-conferences/","/industrial-training/","/professional-development/"]) {
  if (!sitemap.includes("https://salah-faisal.vercel.app" + route)) failures.push("sitemap missing " + route);
}

if (pages.overview.includes('id="credentialsList"')) failures.push("overview still exposes the legacy all-certificates grid");
if (pages.honors.includes("Honors &amp; Awards")) failures.push("legacy Honors & Awards label remains on honors page");

if (failures.length) {
  console.error(failures.map(x => "FAIL|" + x).join("\n"));
  process.exit(1);
}
console.log("PASS|credentials and recognition are organized into honors, scholarly engagement, industrial practice, and professional development");
