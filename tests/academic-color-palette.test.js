const fs = require("fs");

const css = fs.readFileSync("style.css", "utf8");

const required = [
  "--bg:#f5f7fa",
  "--surface:#ffffff",
  "--surface-blue:#e8f1f7",
  "--page-wash:#f7f5ef",
  "background:linear-gradient(180deg,var(--page-wash),transparent)",
  "--text:#1f2933",
  "--muted:#5f6f7e",
  "--navy:#12304a",
  "--navy-2:#184a70",
  "--blue:#1f5e8c",
  "--cyan:#2f789e",
  "--gold:#b9923e",
  "--border:#d8e0e7",
  "--border-strong:#c5d0da",
  "--sidebar-bg:#12304a",
  "--sidebar-text:#eaf0f4",
  "--sidebar-muted:#b8c6d1",
  "background:var(--sidebar-bg)",
  ".profile-link h1{margin:0 0 6px;color:var(--sidebar-text)",
  ".nav-group a{display:block;padding:6px 9px;border-radius:6px;color:var(--sidebar-muted)",
  ".sidebar-actions .button-primary{background:var(--gold);color:#10283b}"
];

const missing = required.filter(token => !css.includes(token));
if (missing.length) {
  console.error("FAIL|Academic color palette is incomplete");
  missing.forEach(token => console.error("MISSING|" + token));
  process.exit(1);
}

console.log("PASS|Academic color palette and dark navy sidebar are applied");
