const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const failures = [];

for (const token of [
  'assetRenderings: "asset_renderings"',
  "function renderingPreviewMarkup(",
  "function inlineAssetStrip(",
  "function renderAwards()",
  "function renderCredentials()",
  "function renderRecommendations()",
  "data-display-asset",
  "Supporting document retained privately for privacy."
]) {
  if (!source.includes(token)) failures.push(`script.js missing: ${token}`);
}

for (const renderer of ["renderAwards", "renderCredentials", "renderRecommendations"]) {
  const start = source.indexOf(`async function ${renderer}()`);
  const next = source.indexOf("\nasync function ", start + 1);
  const block = start >= 0 ? source.slice(start, next >= 0 ? next : source.length) : "";
  if (!block.includes("recordAssets(data,")) failures.push(`${renderer} does not resolve record Assets`);
  if (!block.includes("inlineAssetStrip(data, assets")) failures.push(`${renderer} does not render evidence cards/status`);
  if (!block.includes("bindAssetButtons(data)")) failures.push(`${renderer} does not bind document viewer buttons`);
}

for (const page of ["awards/index.html", "credentials/index.html", "recommendations/index.html"]) {
  const html = fs.readFileSync(page, "utf8");
  if (!html.includes('/script.js?v=20260919-evidence-fix')) {
    failures.push(`${page} does not force the current evidence renderer`);
  }
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log("PASS|Awards, Credentials, and Recommendations use the proven evidence-rendering path");
