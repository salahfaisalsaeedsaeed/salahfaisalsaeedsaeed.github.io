const fs = require("fs");
const path = require("path");

const root = path.join("media", "assets");
const script = fs.readFileSync("script.js", "utf8");
const supported = new Set([".jpg", ".jpeg", ".png", ".webp", ".mp4"]);
const missing = [];

for (const category of fs.readdirSync(root)) {
  const dir = path.join(root, category);
  if (!fs.statSync(dir).isDirectory()) continue;

  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file);
    if (!fs.statSync(full).isFile()) continue;
    if (!supported.has(path.extname(file).toLowerCase())) continue;

    if (!script.includes(JSON.stringify(file))) {
      missing.push(path.posix.join("media/assets", category, file));
    }
  }
}

if (missing.length) {
  console.error("FAIL|GitHub image/video files missing from the site media manifest");
  missing.forEach(file => console.error("MISSING|" + file));
  process.exit(1);
}

console.log("PASS|Every GitHub image/video file is referenced by the site media manifest");
