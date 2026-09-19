const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const css = fs.readFileSync("style.css", "utf8");
const failures = [];

for (const token of [
  'assetRenderings: "asset_renderings"',
  "function renderingPreviewMarkup(",
  "function portfolioMediaCard(",
  "function renderAwards()",
  "function renderCredentials()",
  "function renderRecommendations()",
  'root.className = "asset-gallery-grid portfolio-gallery-grid"',
  "github-pdf-preview-button portfolio-preview-button",
  "data-display-asset"
]) {
  if (!source.includes(token)) failures.push(`script.js missing: ${token}`);
}

for (const renderer of ["renderAwards", "renderCredentials", "renderRecommendations"]) {
  const start = source.indexOf(`async function ${renderer}()`);
  const next = source.indexOf("\nasync function ", start + 1);
  const block = start >= 0 ? source.slice(start, next >= 0 ? next : source.length) : "";
  if (!block.includes("portfolioMediaCard(data,")) {
    failures.push(`${renderer} is not using the Media-style portfolio card renderer`);
  }
  if (!block.includes("bindAssetButtons(data)")) {
    failures.push(`${renderer} does not bind document viewer buttons`);
  }
}

if (!css.includes(".portfolio-gallery-grid{") || !css.includes(".portfolio-media-card{")) {
  failures.push("style.css is missing Media-style portfolio gallery rules");
}

for (const page of ["awards/index.html", "credentials/index.html", "recommendations/index.html"]) {
  const html = fs.readFileSync(page, "utf8");
  if (!html.includes('/script.js?v=20260919-portfolio-media')) {
    failures.push(`${page} does not force the current portfolio renderer`);
  }
  if (!html.includes('/style.css?v=20260919-portfolio-media')) {
    failures.push(`${page} does not force the current portfolio styles`);
  }
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log("PASS|Awards, Credentials, and Recommendations use Media & Activities-style evidence cards");
