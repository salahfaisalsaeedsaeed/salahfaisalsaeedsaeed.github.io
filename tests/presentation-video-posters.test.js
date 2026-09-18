const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const mediaDir = "media/assets/student-videos-and-conference-presentations";

const expected = {
  "EV_Charging_Presentation.mp4": "EV_Charging_Presentation_poster.webp",
  "Federated_Learning_Presentation.mp4": "Federated_Learning_Presentation_poster.webp",
  "Metaheuristic_Tuning_Presentation.mp4": "Metaheuristic_Tuning_Presentation_poster.webp",
  "Scattering_Imaging_Presentation.mp4": "Scattering_Imaging_Presentation_poster.webp",
  "tDCS_Presentation.mp4": "tDCS_Presentation_poster.webp"
};

const missingPosterFields = [];
const missingPosterFiles = [];

for (const [video, poster] of Object.entries(expected)) {
  const pattern = new RegExp(
    `file:\\s*["']${video.replace(/[.*+?^\\$()|[\\]{}]/g, "\\$&")}["'][\\s\\S]{0,220}?poster:\\s*["']${poster.replace(/[.*+?^\\$()|[\\]{}]/g, "\\$&")}["']`
  );
  if (!pattern.test(source)) missingPosterFields.push(video);
  if (!fs.existsSync(`${mediaDir}/${poster}`)) missingPosterFiles.push(poster);
}

if (missingPosterFields.length || missingPosterFiles.length) {
  console.error("FAIL|Presentation video posters are incomplete");
  missingPosterFields.forEach(video => console.error("MISSING_POSTER_FIELD|" + video));
  missingPosterFiles.forEach(file => console.error("MISSING_POSTER_FILE|" + file));
  process.exit(1);
}

console.log("PASS|All 5 presentation videos have generated poster files and manifest links");
