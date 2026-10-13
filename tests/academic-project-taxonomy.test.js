const fs = require("fs");

const html = fs.readFileSync("projects/index.html", "utf8");
const js = fs.readFileSync("script.js", "utf8");
const css = fs.readFileSync("style.css", "utf8");
const failures = [];

const sectionIds = [
  "research-advanced-projects",
  "applied-experimental-projects",
  "educational-prototyping-projects"
];
const subsectionIds = [
  "advanced-engineering-implementation",
  "research-modeling-simulation",
  "embedded-iot-projects",
  "electronics-power-projects",
  "instrumentation-projects",
  "circuit-simulation-labs",
  "physics-stem-projects",
  "fabrication-prototyping"
];
const positions = sectionIds.map(id => html.indexOf('id="' + id + '"'));
if (positions.some(pos => pos < 0) || !(positions[0] < positions[1] && positions[1] < positions[2])) {
  failures.push("three academic project sections missing or out of order");
}
for (const id of subsectionIds) {
  if (!html.includes('id="' + id + '"')) failures.push("missing subsection: " + id);
}
for (const title of [
  "Research &amp; Advanced Engineering Projects",
  "Applied Engineering &amp; Experimental Projects",
  "Educational Engineering &amp; Prototyping Projects",
  "Advanced Engineering Design &amp; Implementation Projects",
  "Research-Based Modeling, Simulation &amp; Optimization Projects",
  "Robotics, Embedded Systems &amp; IoT Prototypes",
  "Electronic Circuits &amp; Power Engineering Projects",
  "Sensors, Measurement &amp; Instrumentation Projects",
  "Engineering Simulation &amp; Circuit Design Laboratories",
  "Physics, Electronics &amp; STEM Educational Projects",
  "3D Printing, Fabrication &amp; Engineering Prototyping"
]) {
  if (!html.includes(title)) failures.push("missing academic section label: " + title);
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicates.length) failures.push("duplicate HTML ids: " + [...new Set(duplicates)].join(", "));
if ((html.match(/class="project-portfolio-card"/g) || []).length !== 6) {
  failures.push("expected six concise category cards under sections 2 and 3");
}
for(const important of [
  'id="graduation-project"',
  "Full real-time physical error correction was not completed",
  'id="sumo-robot-development"',
  "Development in progress",
  'id="projectsList"',
  'id="projectHardwareGallery"',
  'id="graduationProjectActions"',
  "Engineering Components, Tools &amp; Prototyping",
  '<details class="project-resource-details">'
]){
  if(!html.includes(important)) failures.push("important portfolio element missing: " + important);
}
if (html.includes('id="projectResearchMedia"')) failures.push("standalone duplicated research media gallery returned");
for (const token of [
  "const evidenceStudyTitle =",
  "const modelRows =",
  "const evidenceRows =",
  "Related Research Reviews &amp; Evidence Synthesis",
  "System Modeling, Control &amp; Optimization",
  "projectInlineResearchMedia(project)"
]){
  if(!js.includes(token)) failures.push("missing research renderer separation: " + token);
}
for (const token of [".project-taxonomy-heading", ".project-portfolio-grid", ".project-portfolio-card", ".project-resource-details"]){
  if (!css.includes(token)) failures.push("missing responsive project styling: " + token);
}
if (!html.includes('/style.css?v=20261014-academic-project-portfolio-v1') ||
    !html.includes('/script.js?v=20261014-academic-project-portfolio-v1')) {
  failures.push("new project portfolio files are not cache-versioned");
}
if (failures.length) {
  console.error(failures.map(message => "FAIL|" + message).join("\n"));
  process.exit(1);
}
console.log("PASS|three academic sections and eight project subsections preserve research evidence and graduation case study");
