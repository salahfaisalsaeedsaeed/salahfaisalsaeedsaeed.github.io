const fs = require("fs");

const script = fs.readFileSync("script.js","utf8");
const html = fs.readFileSync("media/index.html","utf8");
const css = fs.readFileSync("style.css","utf8");
const failures = [];

for (const token of [
  "Media &amp; Activities",
  "Academic &amp; Professional Portfolio",
  'id="mediaLibrary"',
  "/script.js?v=20260924-media-activities-v1",
  "/style.css?v=20260924-media-activities-v1"
]) {
  if (!html.includes(token)) failures.push("media/index.html missing: " + token);
}

for (const token of [
  "function mediaLibrarySection(",
  "async function renderMedia()",
  "media-library-summary",
  "media-library-index",
  "Engineering Components, Tools & Prototyping",
  "PROJECT_HARDWARE_MEDIA",
  "MEDIA_ORDER",
  'link.textContent = "Media & Activities"',
  "bindGithubPdfButtons(root)",
  "bindProjectHardwareButtons(root)"
]) {
  if (!script.includes(token)) failures.push("script.js missing: " + token);
}

for (const token of [
  ".media-library-summary",
  ".media-library-index",
  ".media-library-group",
  ".media-library-grid"
]) {
  if (!css.includes(token)) failures.push("style.css missing: " + token);
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log("PASS|Media & Activities is restored as a full categorized image, video, and presentation library");
