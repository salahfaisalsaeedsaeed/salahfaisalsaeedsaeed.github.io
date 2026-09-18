const fs = require("fs");

const source = fs.readFileSync("script.js", "utf8");
const mediaDir = "media/assets/student-teaching-and-practical-training-activities";

const expected = {
  "Circuit_Assembly_Practical_Training.mp4": "Circuit_Assembly_Practical_Training_poster.webp",
  "Circuit_Diagram_Instruction.mp4": "Circuit_Diagram_Instruction_poster.webp",
  "DC_Motor_Demonstration.mp4": "DC_Motor_Demonstration_poster.webp",
  "Electronic_Components_Practical_Demo.mp4": "Electronic_Components_Practical_Demo_poster.webp",
  "Motor_and_Component_Demonstration.mp4": "Motor_and_Component_Demonstration_poster.webp",
  "Multimeter_Oscilloscope_Training.mp4": "Multimeter_Oscilloscope_Training_poster.webp",
  "Oscilloscope_Waveform_Training_01.mp4": "Oscilloscope_Waveform_Training_01_poster.webp",
  "Oscilloscope_Waveform_Training_02.mp4": "Oscilloscope_Waveform_Training_02_poster.webp",
  "Perfboard_Preparation_Demo.mp4": "Perfboard_Preparation_Demo_poster.webp",
  "Proteus_Circuit_Simulation.mp4": "Proteus_Circuit_Simulation_poster.webp"
};

const missingEntries = [];
const missingPosters = [];

for (const [video, poster] of Object.entries(expected)) {
  const escapedVideo = video.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedPoster = poster.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp("file:\\s*[\"\']" + escapedVideo + "[\"\'][\\s\\S]{0,240}?poster:\\s*[\"\']" + escapedPoster + "[\"\']");
  if (!pattern.test(source)) missingEntries.push(video);

  const posterPath = mediaDir + "/" + poster;
  if (!fs.existsSync(posterPath)) {
    missingPosters.push(poster);
  } else {
    const size = fs.statSync(posterPath).size;
    if (size < 2048 || size > 500000) {
      console.error("FAIL|Unexpected poster size|" + poster + "|" + size);
      process.exit(1);
    }
    const header = fs.readFileSync(posterPath).subarray(0, 12);
    if (header.subarray(0, 4).toString("ascii") !== "RIFF" || header.subarray(8, 12).toString("ascii") !== "WEBP") {
      console.error("FAIL|Poster is not a valid WebP container|" + poster);
      process.exit(1);
    }
  }
}

if (missingEntries.length || missingPosters.length) {
  console.error("FAIL|Student practical-training videos are not fully integrated");
  missingEntries.forEach(file => console.error("MISSING_MANIFEST_ENTRY|" + file));
  missingPosters.forEach(file => console.error("MISSING_POSTER_FILE|" + file));
  process.exit(1);
}

console.log("PASS|All 10 student practical-training videos have posters and media manifest entries");
