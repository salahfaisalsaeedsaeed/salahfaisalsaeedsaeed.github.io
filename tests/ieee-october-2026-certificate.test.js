const fs = require("fs");

const script = fs.readFileSync("script.js", "utf8");
const fallback = JSON.parse(fs.readFileSync("data/public-fallback.json", "utf8"));
const failures = [];

const pdfPath = "media/assets/credentials/certificate_89785861.pdf";
if (!fs.existsSync(pdfPath)) failures.push("missing uploaded IEEE certificate PDF: " + pdfPath);

const previewPath = "media/assets/credentials/certificate_89785861_preview.webp";
if (!fs.existsSync(previewPath)) {
  failures.push("missing generated IEEE certificate preview: " + previewPath);
} else {
  const bytes = fs.readFileSync(previewPath);
  if (bytes.length < 1024 || bytes.toString("ascii", 0, 4) !== "RIFF" ||
      bytes.toString("ascii", 8, 12) !== "WEBP") {
    failures.push("IEEE first-page preview is not a valid WebP image");
  }
}


for (const token of [
  "site:ieee-authorship-open-access-october-2026",
  "local:credential:ieee-authorship-oct-2026",
  "/media/assets/credentials/certificate_89785861.pdf",
  "/media/assets/credentials/certificate_89785861_preview.webp",
  "October 2, 2026",
  'preview_file_id: directPdf ? (spec.preview || spec.files[0].replace(/\\.pdf$/i, "_preview.webp")) : ""',
  "const previewPath = String(model.preview_file_id || \"\")",
  'render_type: directPdf ? "pdf_file" : "pdf_pages"',
  'if (renderType === "pdf_file")',
  'const isPdfFile = String(model.render_type || "").toLowerCase() === "pdf_file"',
  "if (!all.length && !any.length) return false;"
]) {
  if (!script.includes(token)) failures.push("script.js missing: " + token);
}

const credential = (fallback.credentials || []).find(row => row.asset_id === "local:credential:ieee-authorship-oct-2026");
if (!credential) {
  failures.push("fallback credentials missing October 2026 IEEE certificate");
} else {
  if (credential.issuer !== "IEEE") failures.push("IEEE issuer missing");
  if (credential.year !== "2026") failures.push("IEEE credential year should be 2026");
  if (credential.category !== "research_conference") failures.push("IEEE credential should be Research & Conferences");
  if (!String(credential.description || "").includes("October 2, 2026")) failures.push("IEEE credential date missing");
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log("PASS|October 2026 IEEE participation certificate is published under Certifications & Training");
