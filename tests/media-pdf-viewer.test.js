const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const visualMatch = source.match(/function githubMediaVisual\(category, item\) \{[\s\S]*?\n\}/);

if (!visualMatch) {
  console.error("FAIL|githubMediaVisual() is required for lazy PDF cards");
  process.exit(1);
}

global.githubMediaPath = (category, file) => `/media/assets/${category}/${file}`;
global.escapeAttr = value => String(value);

eval(visualMatch[0]);

const pdfMarkup = githubMediaVisual("student-videos-and-conference-presentations", {
  file: "EV_Charging_Systems.pdf",
  preview: "EV_Charging_Systems_preview.webp",
  type: "pdf",
  title: "EV Charging Systems"
});

if (!pdfMarkup.includes("data-github-pdf")) {
  console.error("FAIL|PDF media card must expose an in-site viewer trigger");
  process.exit(1);
}
if (pdfMarkup.includes("<iframe")) {
  console.error("FAIL|PDF card must not eagerly load the full PDF");
  process.exit(1);
}
if (!pdfMarkup.includes("<img") || !pdfMarkup.includes("EV_Charging_Systems_preview.webp") || !pdfMarkup.includes('loading="lazy"')) {
  console.error("FAIL|PDF card must render a lazy first-page preview image");
  process.exit(1);
}
if (!/PDF|Presentation/.test(pdfMarkup)) {
  console.error("FAIL|PDF card needs a visible document label");
  process.exit(1);
}

if (!source.includes("function openGithubPdf(") || !source.includes("<iframe")) {
  console.error("FAIL|In-site PDF modal viewer is missing");
  process.exit(1);
}

console.log("PASS|PDF media shows a lazy first-page preview and opens the full file in-site");
