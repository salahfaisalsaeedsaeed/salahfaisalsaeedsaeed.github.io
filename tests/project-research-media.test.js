const fs = require("fs");
const path = require("path");

const script = fs.readFileSync("script.js", "utf8");
const projects = fs.readFileSync("projects/index.html", "utf8");
const failures = [];

const files = [
  ["EV1", "EVFastCharging_Presentation_20261008_013537.mp4"],
  ["DRONE", "01_3d_tracking_view.png"],
  ["DRONE", "02_performance_overview.png"],
  ["DRONE", "03_state_tracking.png"],
  ["DRONE", "04_disturbance_profile.png"],
  ["DRONE", "05_smc_contribution.png"],
  ["DRONE", "06_overview_animation_final_frame.png"],
  ["DRONE", "06_quadrotor_overview_animation.mp4"],
  ["DRONE", "07_tracking_animation_final_frame.png"],
  ["DRONE", "07_quadrotor_tracking_animation.mp4"],
  ["DRONE", "08_quadrotor_showcase_animation.mp4"]
];

for (const [folder, file] of files) {
  const full = path.join("media", "assets", "projects", folder, file);
  if (!fs.existsSync(full)) failures.push("missing project media file: " + full);
  if (!script.includes(file)) failures.push("script.js missing project media reference: " + file);
}

for (const token of [
  "const PROJECT_RESEARCH_MEDIA = {",
  "function projectResearchMediaPath(",
  "function projectResearchMediaCard(",
  "function projectResearchMediaSection(",
  "function renderProjectResearchMedia()",
  "EV Fast-Charging System",
  "Quadrotor UAV Control & Disturbance Rejection"
]) {
  if (!script.includes(token)) failures.push("script.js missing: " + token);
}

if (projects.includes('id="projectResearchMedia"')) {
  failures.push("projects/index.html should not keep a duplicate standalone projectResearchMedia gallery");
}

for (const token of [
  "function currentResearchProjectRecords()",
  "function mergeCurrentResearchProjects(",
  "function projectResearchMediaForProject(",
  "function projectInlineResearchMedia(",
  'slug: "ev-fast-charging-system"',
  'status: "research in progress"'
]) {
  if (!script.includes(token)) failures.push("script.js missing integrated research-project token: " + token);
}

const fallback = JSON.parse(fs.readFileSync("data/public-fallback.json", "utf8"));
if (!(fallback.projects || []).some(project => project.slug === "ev-fast-charging-system" && project.status === "research in progress")) {
  failures.push("public fallback missing ongoing EV fast-charging research project");
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log("PASS|EV1 and DRONE media are integrated into ongoing Research & Engineering Projects");
