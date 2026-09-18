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
  type: "pdf",
  title: "EV Charging Systems"
});

if (!pdfMarkup.includes("data-github-pdf")) {
  console.error("FAIL|PDF media card must expose an in-site viewer trigger");
  process.exit(1);
}
if (pdfMarkup.includes("<iframe") || pdfMarkup.includes("<img")) {
  console.error("FAIL|PDF card must not eagerly load the PDF or render it as an image");
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

console.log("PASS|PDF media uses a lazy card and an in-site modal viewer");
