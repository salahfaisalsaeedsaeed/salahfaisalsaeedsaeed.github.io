const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const match = source.match(/function githubMediaPath\(category, fileName\) \{[\s\S]*?\n\}/);

if (!match) {
  throw new Error("githubMediaPath() was not found in script.js");
}

eval(match[0]);

const actual = githubMediaPath(
  "technical_maintenance_and_troubleshooting_work",
  "Desktop_PC_Workstation.jpg"
);
const expected = "/media/assets/technical-maintenance-and-troubleshooting-work/Desktop_PC_Workstation.jpg";

if (actual !== expected) {
  console.error("FAIL|Portfolio media must resolve to same-origin Vercel paths with hyphenated folder names");
  console.error("EXPECTED|" + expected);
  console.error("ACTUAL|" + actual);
  process.exit(1);
}

console.log("PASS|same-origin portfolio media path mapping is correct");
