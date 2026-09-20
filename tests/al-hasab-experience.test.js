const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const fallback = JSON.parse(fs.readFileSync("data/public-fallback.json", "utf8"));
const failures = [];

for (const token of [
  "Industrial Training Assistant — Industrial Control Systems",
  "Technical Industrial Institute – Al-Hasab",
  'period_label: "2018–2019 · 6 months"',
  "Assisted in practical training activities related to industrial control systems and electronics.",
  "Supported hands-on instruction in control circuits, electronic components, panel-level practice, and troubleshooting."
]) {
  if (!source.includes(token)) failures.push("script.js missing: " + token);
}

const row = (fallback.experiences || []).find(item => item.slug === "technical-industrial-institute-al-hasab");
if (!row) {
  failures.push("static fallback is missing Al-Hasab experience");
} else {
  if (row.title !== "Industrial Training Assistant — Industrial Control Systems") failures.push("unexpected Al-Hasab title");
  if (row.period_label !== "2018–2019 · 6 months") failures.push("unexpected Al-Hasab period");
}

if (!source.includes("const hasAlHasab = appwriteRows.some")) {
  failures.push("Al-Hasab fallback deduplication is missing");
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log("PASS|Al-Hasab experience uses the evidence-supported title and 2018–2019 six-month period");
