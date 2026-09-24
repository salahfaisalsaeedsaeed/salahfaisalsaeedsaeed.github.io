const fs = require("fs");

const files = [
  "index.html",
  "about/index.html",
  "education/index.html",
  "research/index.html",
  "publications/index.html",
  "projects/index.html",
  "experience/index.html",
  "teaching/index.html",
  "awards/index.html",
  "credentials/index.html",
  "recommendations/index.html",
  "institutional-evidence/index.html",
  "documents/index.html",
  "media/index.html",
  "contact/index.html",
  "script.js"
];

const text = files.map(file => fs.readFileSync(file, "utf8")).join("\n");

const bannedPhrases = [
  "Approved images and videos are displayed directly within the site in fixed viewing windows with concise academic context.",
  "Loading publications from Appwrite",
  "Reviewed GitHub media are being prepared for display within the site.",
  "Images use lazy loading, videos load on demand, and PDFs open only when requested.",
  "Original letters are displayed only when approved for public release.",
  "Privacy policy: personal contact details",
  "Approved documents stored in the academic asset library.",
  "Public-document policy",
  "No duplicated document archive",
  "Public evidence is displayed inside the academic or professional record it supports.",
  "maintained in the website code",
  "Supporting document retained privately for privacy.",
  "Public rendering unavailable",
  "Verified supporting evidence linked to this academic or professional record.",
  "Publication file linked to this bibliographic record.",
  "Recommendation document retained according to privacy settings.",
  "PDF presentation displayed within this website.",
  "synchronized with the academic database.",
  "rather than repeated portfolio cards",
  "Python · C · C++ · MATLAB",
  "ROS 2 · Gazebo · Arduino",
  "SOC engineering",
  "C++ and Python fundamentals"
];

const requiredPhrases = [
  "Professional &amp; Academic Profile",
  "Mechatronics &amp; Robotics Engineer · Physics/STEM Educator · Researcher",
  "A structured overview of selected engineering, teaching, research, and technical evidence, with media presented in the section where it is most meaningful.",
  "Independent institutional sources and selected academic documents supporting key claims across teaching, research mentorship, technical training, academic achievement, and professional applications.",
  "Verification & Documents",
  "Peer-reviewed IEEE conference publications spanning robotics, computer vision, energy systems, artificial intelligence, and related engineering research.",
  "Professional Experience",
  "Portfolio Highlights",
  "Honors & Awards",
  "Certifications & Training",
  "Recommendations & References",
  "Cybersecurity &amp; AI-Assisted Security",
  "Python · C++ · MATLAB"
];

const bannedFound = bannedPhrases.filter(phrase => text.includes(phrase));
const requiredMissing = requiredPhrases.filter(phrase => !text.includes(phrase));

if (bannedFound.length || requiredMissing.length) {
  console.error("FAIL|Professional editorial copy is incomplete");
  bannedFound.forEach(phrase => console.error("BANNED|" + phrase));
  requiredMissing.forEach(phrase => console.error("MISSING|" + phrase));
  process.exit(1);
}

console.log("PASS|Professional editorial copy is clean and recruiter-facing");
