const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const page = fs.readFileSync("experience/index.html", "utf8");
const failures = [];

for (const token of [
  "Industrial Control Systems Trainer",
  "Technical Industrial Institute – Al-Hasab",
  'start_date: "2018-09-01"',
  'end_date: "2019-02-28"',
  "Delivered practical instruction in industrial control systems and electronics.",
  "Guided students through control circuits, electronic components, and hands-on technical activities."
]) {
  if (!source.includes(token)) failures.push("script.js missing: " + token);
}

if (!source.includes("const hasAlHasab = appwriteRows.some")) {
  failures.push("Al-Hasab fallback deduplication is missing");
}

if (!page.includes('/script.js?v=20260919-al-hasab')) {
  failures.push("experience page does not force the current renderer");
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log("PASS|Al-Hasab teaching experience is included without duplicating a future Appwrite record");
