const fs = require("fs");
const path = require("path");

const script = fs.readFileSync("script.js", "utf8");
const html = fs.readFileSync("projects/index.html", "utf8");
const css = fs.readFileSync("style.css", "utf8");
const failures = [];

const files = [
  "3D_Printer.jpg",
  "Arduino_Mega_2560_Board.jpg",
  "Dual_Joystick_Shield.jpg",
  "ESP32_CAM_MB_Programmer.jpg",
  "ESP8266_OLED_Board.jpg",
  "Electronic_Components_Organizer.jpg",
  "Electronics_Lab_Inventory_Overview.mp4",
  "Electronics_Lab_Storage_Cabinet.jpg",
  "Micro_Servo_Motors.jpg",
  "Relay_Module.jpg",
  "Stepper_Motor.jpg",
  "Prusa_Printer_Components_01.jpg",
  "Prusa_Printer_Components_02.jpg",
  "Prusa_Printer_Tools_and_Parts.jpg",
  "Prusa_Printer_Assembled_01.jpg",
  "Prusa_Printer_Assembled_02.jpg",
  "Prusa_Printer_Assembled_03.jpg",
  "Prusa_Printer_Assembled_04.jpg",
  "Prusa_Printer_Components_Overview.mp4"
];

for (const file of files) {
  const full = path.join("media", "assets", "projects", "engineering-components-and-tools", file);
  if (!fs.existsSync(full)) failures.push("missing media file: " + full);
  if (!script.includes(file)) failures.push("script.js missing media reference: " + file);
}

for (const token of [
  "const PROJECT_HARDWARE_MEDIA = [",
  "function renderProjectHardware()",
  "function projectHardwareCard(",
  "function projectHardwarePath(",
  "renderProjectHardware();",
  "Original Prusa MK4S"
]) {
  if (!script.includes(token)) failures.push("script.js missing: " + token);
}

for (const token of [
  'id="engineering-components-and-tools"',
  'id="projectHardwareGallery"',
  "Engineering Components, Tools &amp; Prototyping"
]) {
  if (!html.includes(token)) failures.push("projects/index.html missing: " + token);
}

for (const token of [
  ".project-hardware-showcase",
  ".project-hardware-grid",
  ".project-hardware-card"
]) {
  if (!css.includes(token)) failures.push("style.css missing: " + token);
}

if (failures.length) {
  console.error(failures.map(item => "FAIL|" + item).join("\n"));
  process.exit(1);
}

console.log("PASS|Projects engineering components, tools, images, and video gallery are wired and present");
