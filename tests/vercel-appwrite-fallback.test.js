const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const proxy = fs.readFileSync("api/appwrite-table.js", "utf8");
const failures = [];

for (const token of [
  'location.hostname.endsWith(".vercel.app")',
  'new URL("/api/appwrite-table", location.origin)',
  'proxyUrl.searchParams.set("table", tableId)',
  'proxyUrl.searchParams.set("limit", String(limit))'
]) {
  if (!source.includes(token)) failures.push("script.js missing: " + token);
}

for (const token of [
  '"assets"',
  '"asset_renderings"',
  '"awards"',
  '"credentials"',
  '"recommendations"',
  '"X-Appwrite-Project"',
  'ALLOWED_TABLES.has(table)'
]) {
  if (!proxy.includes(token)) failures.push("api/appwrite-table.js missing: " + token);
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log("PASS|Vercel preview deployments have a same-origin Appwrite fallback");
