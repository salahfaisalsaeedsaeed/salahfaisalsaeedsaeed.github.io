const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const proxy = fs.readFileSync("api/appwrite-table.js", "utf8");
const fallback = JSON.parse(fs.readFileSync("data/public-fallback.json", "utf8"));
const failures = [];

for (const token of [
  'url: "/data/public-fallback.json?v=20260922-local-media"',
  'cacheKey: "salah-faisal-public-data-v2"',
  "function requiredDataKeys()",
  "function readCachedPublicData()",
  "function writeCachedPublicData(partial)",
  "data.fallbackKeys.push(key)",
  "data.usingFallback = data.fallbackKeys.length > 0"
]) {
  if (!source.includes(token)) failures.push("script.js missing: " + token);
}

const expected = {
  publications: 8,
  projects: 7,
  awards: 11,
  credentials: 15,
  experiences: 5,
  recommendations: 6,
  institutionalEvidence: 6
};
for (const [key, count] of Object.entries(expected)) {
  if (!Array.isArray(fallback[key]) || fallback[key].length !== count) {
    failures.push(`fallback ${key} expected ${count}, found ${fallback[key]?.length ?? "missing"}`);
  }
}

if (!proxy.includes("s-maxage=3600") || !proxy.includes("stale-while-revalidate=604800")) {
  failures.push("Vercel proxy cache policy is missing");
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}
console.log("PASS|static fallback, browser cache, page-specific loading, and Vercel edge caching are configured");
