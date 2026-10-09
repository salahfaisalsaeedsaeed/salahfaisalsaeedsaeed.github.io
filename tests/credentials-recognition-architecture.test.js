const fs = require("fs");

const failures = [];
const pages = {
  legacy: fs.readFileSync("credentials/index.html","utf8"),
  honors: fs.readFileSync("awards/index.html","utf8"),
  research: fs.readFileSync("research-conferences/index.html","utf8"),
  industrial: fs.readFileSync("industrial-training/index.html","utf8"),
  development: fs.readFileSync("professional-development/index.html","utf8")
};
const source = fs.readFileSync("script.js","utf8");
const sitemap = fs.readFileSync("sitemap.xml","utf8");

const pageTokens = {
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

for (const route of ["/awards/","/research-conferences/","/industrial-training/","/professional-development/"]) {
  if (!sitemap.includes("https://salah-faisal.vercel.app" + route)) failures.push("sitemap missing " + route);
}


const communityStart = source.indexOf("function isCommunityRecognitionCredential(");
const communityEnd = source.indexOf("\nfunction isResearchConferenceCredential(", communityStart);
const communityBlock = communityStart >= 0 ? source.slice(communityStart, communityEnd) : "";
if (communityBlock.includes("english subject achievement")) {
  failures.push("English Subject Achievement Certificate must not be classified under Honors & Distinctions");
}

const languageStart = source.indexOf("function isLanguageCredential(");
const languageEnd = source.indexOf("\nfunction isTeachingLeadershipCredential(", languageStart);
const languageBlock = languageStart >= 0 ? source.slice(languageStart, languageEnd) : "";
if (!languageBlock.includes("education_language_achievement") || !languageBlock.includes("english subject achievement")) {
  failures.push("English Subject Achievement Certificate must be classified under Languages & Communication");
}

const englishRecordStart = source.indexOf('site:english-subject-achievement');
const englishRecordBlock = englishRecordStart >= 0 ? source.slice(englishRecordStart, englishRecordStart + 700) : "";
if (!englishRecordBlock.includes('category: "education_language_achievement"')) {
  failures.push("English Subject Achievement Certificate has the wrong credential category");
}

if (!pages.legacy.includes('url=/professional-development/') || !pages.legacy.includes('noindex,follow')) failures.push("legacy credentials route must redirect to the independent professional-development page");
if (sitemap.includes("https://salah-faisal.vercel.app/credentials/")) failures.push("retired combined credentials hub remains in sitemap");
const taizLocalCredentialOccurrences = (source.match(/site:taiz-academic-achievement-appreciation/g) || []).length;
if (taizLocalCredentialOccurrences !== 0) {
  failures.push("duplicate hard-coded Taiz academic achievement credential remains");
}

const fallback = JSON.parse(fs.readFileSync("data/public-fallback.json","utf8"));
const taizFallback = (fallback.awards || []).filter(row =>
  /academic achievement recognition/i.test(String(row.title || "")) &&
  /taiz university/i.test(String(row.title || "") + " " + String(row.issuer || ""))
);
if (taizFallback.length !== 1) {
  failures.push("fallback must contain exactly one canonical Taiz academic achievement honor");
}

if (pages.honors.includes("Honors &amp; Awards")) failures.push("legacy Honors & Awards label remains on honors page");

if (failures.length) {
  console.error(failures.map(x => "FAIL|" + x).join("\n"));
  process.exit(1);
}
console.log("PASS|four independent credential windows are published without a combined credentials hub");
