const SITE = {
  email: "salahfaisal589@gmail.com",
  scholar: "https://scholar.google.com/citations?hl=ar&user=kV3STigAAAAJ",
  orcid: "https://orcid.org/0009-0000-9485-7467",
  linkedin: "https://www.linkedin.com/in/salah-faisal-saeed-saeed-925a1b2a3"
};

const APPWRITE = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "6a90545d002d8d1ed109",
  databaseId: "6a919743003b7658ee49",
  bucketId: "academic_media",
  tables: {
    assets: "assets",
    assetRenderings: "asset_renderings",
    publications: "publications",
    projects: "projects",
    awards: "awards",
    credentials: "credentials",
    experiences: "experiences",
    recommendations: "recommendations",
    institutionalEvidence: "institutional_evidence"
  }
};

const PUBLIC_FALLBACK = {
  url: "/data/public-fallback.json?v=20260922-local-media",
  cacheKey: "salah-faisal-public-data-v2"
};

const LOCAL_EVIDENCE_MEDIA = {
  awards: [
    { id: "best-paper-2026", all: ["best paper"], files: ["/media/assets/awards/eSmarTA_2026_Best_Paper_Award.webp"] },
    { id: "taiz-research-excellence-2026", all: ["scientific research excellence"], files: ["/media/assets/awards/Taiz_University_Scientific_Research_Excellence_Appreciation_2026.jpeg"] },
    { id: "esmarta-2026", all: ["esmarta 2026"], none: ["best paper"], files: [
      "/media/assets/credentials/06_eSmarTA_2026_Attendance.webp",
      "/media/assets/credentials/07_eSmarTA_2026_P202.webp",
      "/media/assets/credentials/08_eSmarTA_2026_P203.webp",
      "/media/assets/credentials/09_eSmarTA_2026_P204.webp",
      "/media/assets/credentials/10_eSmarTA_2026_P277.webp"
    ] },
    { id: "esmarta-2025", all: ["esmarta 2025"], files: [
      "/media/assets/credentials/01_eSmarTA_2025_Attendance.webp",
      "/media/assets/credentials/02_eSmarTA_2025_P113.webp",
      "/media/assets/credentials/03_eSmarTA_2025_P132.webp",
      "/media/assets/credentials/04_eSmarTA_2025_P156.webp",
      "/media/assets/credentials/05_eSmarTA_2025_P181.webp"
    ] },
    { id: "national-ranking", any: ["second nationally", "national ranking", "final result"], files: ["/media/assets/awards/Vocational_Diploma_Final_Result_and_National_Ranking.webp"] },
    { id: "cohort-ranking", all: ["first rank", "cohort"], none: ["second nationally"], files: ["/media/assets/awards/Certificate_of_Academic_Distinction_and_Ranking.webp"] },
    { id: "academic-distinction-ranking", all: ["academic distinction", "ranking"], none: ["second nationally"], files: ["/media/assets/awards/Certificate_of_Academic_Distinction_and_Ranking.webp"] },
    { id: "vocational-transcript", all: ["vocational diploma", "academic transcript"], files: ["/media/assets/awards/Vocational_Diploma_Academic_Transcript_2014_2015.webp"] },
    { id: "english-instruction-taiz", all: ["english language instruction", "taiz university"], files: ["/media/assets/awards/English_Language_Instruction_Certificate_Taiz_University.webp"] },
    { id: "academic-achievement-taiz", all: ["academic achievement", "taiz university"], files: ["/media/assets/credentials/Certificate_of_Appreciation_Academic_Achievement_Taiz_University.webp"] },
    { id: "research-writing", all: ["research", "academic writing"], files: ["/media/assets/credentials/Certificate_of_Appreciation_Research_and_Academic_Writing.webp"] },
    { id: "professional-excellence", any: ["professional excellence", "dedicated service"], files: ["/media/assets/credentials/Certificate_of_Appreciation_Professional_Excellence_and_Service.webp"] },
    { id: "physics-laboratory", all: ["physics", "laboratory"], files: ["/media/assets/credentials/Physics_Laboratory_Development_Appreciation.webp"] },
    { id: "laboratory-development", all: ["laboratory development"], files: ["/media/assets/credentials/Certificate_of_Appreciation_Laboratory_Development.webp"] }
  ],
  credentials: [
    { id: "esmarta-2026", all: ["esmarta 2026"], files: [
      "/media/assets/credentials/06_eSmarTA_2026_Attendance.webp",
      "/media/assets/credentials/07_eSmarTA_2026_P202.webp",
      "/media/assets/credentials/08_eSmarTA_2026_P203.webp",
      "/media/assets/credentials/09_eSmarTA_2026_P204.webp",
      "/media/assets/credentials/10_eSmarTA_2026_P277.webp"
    ] },
    { id: "esmarta-2025", all: ["esmarta 2025"], files: [
      "/media/assets/credentials/01_eSmarTA_2025_Attendance.webp",
      "/media/assets/credentials/02_eSmarTA_2025_P113.webp",
      "/media/assets/credentials/03_eSmarTA_2025_P132.webp",
      "/media/assets/credentials/04_eSmarTA_2025_P156.webp",
      "/media/assets/credentials/05_eSmarTA_2025_P181.webp"
    ] },
    { id: "ieee-authorship", all: ["ieee", "authorship"], files: ["/media/assets/credentials/11_IEEE_Authorship_Symposium.webp"] },
    { id: "taiz-stars", all: ["taiz stars"], files: ["/media/assets/credentials/Community_Participation_Certificate_Taiz_Stars_Festival.webp"] },
    { id: "sinaa-founding", all: ["founding", "sinaa"], files: ["/media/assets/credentials/Founding_Member_Certificate_Sinaa_Union.webp"] },
    { id: "sinaa-training", all: ["training", "active participation", "sinaa"], files: ["/media/assets/credentials/Training_and_Active_Participation_Certificate_Sinaa_Union.webp"] },
    { id: "translation", all: ["translation"], files: ["/media/assets/credentials/Translation_Course_Certificate_Al_Kindi_Institute.webp"] },
    { id: "genpack", any: ["genpack", "general industries packages"], files: ["/media/assets/credentials/genpack_page_01.webp"] },
    { id: "nadfood", any: ["nadfood", "national dairy food"], files: ["/media/assets/credentials/nadfood_page_01.webp"] },
    { id: "ycic", any: ["ycic", "yemen company for industry commerce", "hsa group"], files: ["/media/assets/credentials/ycic_page_01.webp"] },
    { id: "computer-essentials", all: ["computer essentials"], files: ["/media/assets/credentials/Computer_Essentials_Edraak.webp"] },
    { id: "leadership", all: ["influential leadership"], files: ["/media/assets/credentials/Influential_Leadership_and_Effective_Management_Edraak.webp"] },
    { id: "iot", any: ["internet of things", "iot"], files: ["/media/assets/credentials/Internet_of_Things_Edraak.webp"] },
    { id: "ai", all: ["artificial intelligence"], files: ["/media/assets/credentials/Introduction_in_Artificial_Intelligence_Edraak.webp"] },
    { id: "trainer", any: ["train the trainer", "novice trainer"], files: ["/media/assets/credentials/Train_the_Trainer_Novice_Level_IBCT_Edraak.webp"] },
    { id: "english-subject", all: ["english subject", "achievement"], files: ["/media/assets/credentials/01_English_Subject_Achievement_Certificate_Enhanced.webp"] },
    { id: "academic-achievement-taiz", all: ["academic achievement", "taiz university"], files: ["/media/assets/credentials/Certificate_of_Appreciation_Academic_Achievement_Taiz_University.webp"] },
    { id: "al-haseb-appreciation", any: ["al haseb technical institute", "al hasab technical institute"], files: ["/media/assets/credentials/Certificate_of_Appreciation_Al_Haseb_Technical_Institute.webp"] },
    { id: "laboratory-development", all: ["laboratory development"], files: ["/media/assets/credentials/Certificate_of_Appreciation_Laboratory_Development.webp"] },
    { id: "professional-excellence", any: ["professional excellence", "dedicated service"], files: ["/media/assets/credentials/Certificate_of_Appreciation_Professional_Excellence_and_Service.webp"] },
    { id: "research-writing", all: ["research", "academic writing"], files: ["/media/assets/credentials/Certificate_of_Appreciation_Research_and_Academic_Writing.webp"] },
    { id: "physics-lab", all: ["physics", "laboratory"], files: ["/media/assets/credentials/Physics_Laboratory_Development_Appreciation.webp"] },
    { id: "student-teaching", all: ["student", "teaching excellence"], files: ["/media/assets/credentials/Student_Appreciation_for_Teaching_Excellence.webp"] },
    { id: "english-basic-3", all: ["english", "basic 3"], files: ["/media/assets/credentials/English_Basic_3_Certificate_Al_Kindi_Institute.webp"] },
    { id: "english-beginner-1a", all: ["english", "beginner 1a"], files: ["/media/assets/credentials/English_Beginner_1A_Certificate_Global_Language_Institute.webp"] },
  ],
  recommendations: [
    { id: "robotics-vision-control", assetIds: ["6a9340d8c13681504a19"], any: ["robotics", "computer vision"], files: [
      "/media/assets/recommendations/Recommendation_Letter_Kocaeli_University_page_01.webp",
      "/media/assets/recommendations/Recommendation_Letter_Kocaeli_University_page_02.webp"
    ] },
    { id: "energy-systems", assetIds: ["6a9340d8c1375593bf7a"], all: ["energy systems"], files: ["/media/assets/recommendations/Energy_Systems_page_01.webp"] },
    { id: "software-engineering", assetIds: ["6a9340d8c134823daa73"], any: ["software engineering", "cybersecurity", "trustworthy ai"], files: ["/media/assets/recommendations/Software_Engineering_page_01.webp"] },
    { id: "technical-vocational-referees", assetIds: ["6a9340d8c12472da2382"], all: ["technical", "vocational", "referees"], files: [
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_page_01.webp",
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_page_02.webp",
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_page_03.webp",
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_page_04.webp"
    ] },
    { id: "supporting-academic-referees", assetIds: ["6a9340d8c1328fe91c97"], all: ["supporting", "academic", "referees"], files: [
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_Letters_page_01.webp",
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_Letters_page_02.webp",
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_Letters_page_03.webp",
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_Letters_page_04.webp",
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_Letters_page_05.webp",
      "/media/assets/recommendations/Salah_Faisal_Academic_Recommendation_Letters_page_06.webp"
    ] },
    { id: "al-kindi", assetIds: ["6a9340d8c1359bf648ee"], all: ["al kindi"], files: ["/media/assets/recommendations/Al_Kindi_Recommendation_Letter_page_01.webp"] }
  ],
  experiences: [
    { id: "rassam-employment", any: ["rassam", "rassam school"], files: ["/media/assets/experience/Salah_Faisal_Employment_Certificate_Ne_page_01.webp"] },
    { id: "rassam-research-mentorship", any: ["rassam", "rassam school"], files: [
      "/media/assets/experience/Salah_Faisal_Research_Mentorship_Experience_Letters_page_01.webp",
      "/media/assets/experience/Salah_Faisal_Research_Mentorship_Experience_Letters_page_02.webp"
    ] },
    { id: "asbahi", all: ["asbahi"], files: ["/media/assets/experience/Salah_Faisal_Al_Asbahi_Employment_Certificate_page_01.webp"] },
    { id: "al-ghad-al-mushreq", any: ["al ghad al mushreq", "al mashreq"], files: [
      "/media/assets/experience/Salah_Faisal_Al_Mashreq_Certificates_page_01.webp",
      "/media/assets/experience/Salah_Faisal_Al_Mashreq_Certificates_page_02.webp"
    ] },
    { id: "al-hasab", any: ["al hasab", "technical industrial institute"], files: ["/media/assets/experience/Salah_Faisal_Industrial_Institute_Certificate_page_01.webp"] }
  ]
};

const MEDIA_ORDER = [
  "student_videos_and_conference_presentations",
  "student_teaching_and_practical_training_activities",
  "teacher_training_and_professional_development_programs",
  "3d_printing_and_stem_laboratory_activities",
  "technical_maintenance_and_troubleshooting_work",
  "graduation_highlights"
];

const MEDIA_META = {
  student_videos_and_conference_presentations: {
    title: "Student Research & Conference Presentations",
    description: "Selected student research communication, academic presentations, and conference-oriented work connected to research and publication activities."
  },
  student_teaching_and_practical_training_activities: {
    title: "Teaching & Practical Training Activities",
    description: "Practical instruction in electronics, circuits, measurement, simulation, embedded systems, laboratory work, and student technical activities."
  },
  teacher_training_and_professional_development_programs: {
    title: "Teacher Training & Professional Development",
    description: "Selected activities from technical and professional-development training delivered for teachers and education-focused participants."
  },
  "3d_printing_and_stem_laboratory_activities": {
    title: "3D Printing & STEM Laboratory Activities",
    description: "3D printing, prototyping, robotics, STEM laboratory practice, and applied engineering activities."
  },
  technical_maintenance_and_troubleshooting_work: {
    title: "Technical Maintenance & Troubleshooting",
    description: "Practical technical work involving equipment inspection, computer and electronics maintenance, diagnostic testing, troubleshooting, repair, and system verification."
  },
  graduation_highlights: {
    title: "Academic Milestones",
    description: "Selected records from graduation and related academic milestones."
  }
};


const PROJECT_HARDWARE_MEDIA = [
  {
    file: "3D_Printer.jpg",
    type: "image",
    category: "Digital Fabrication",
    title: "Original Prusa MK4S 3D Printer",
    description: "Original Prusa MK4S used for digital fabrication of prototype parts, mounts, enclosures, and mechanical components during engineering development."
  },
  {
    file: "Arduino_Mega_2560_Board.jpg",
    type: "image",
    category: "Embedded Control",
    title: "Arduino Mega 2560 Development Board",
    description: "Microcontroller platform for embedded-control prototyping, sensor interfacing, actuator control, and hardware integration."
  },
  {
    file: "Dual_Joystick_Shield.jpg",
    type: "image",
    category: "Human–Machine Interface",
    title: "Dual Joystick Control Shield",
    description: "Dual-axis manual input hardware for robotics, motion-control interfaces, and interactive embedded-system experiments."
  },
  {
    file: "ESP32_CAM_MB_Programmer.jpg",
    type: "image",
    category: "Embedded Vision",
    title: "ESP32-CAM-MB Programmer",
    description: "USB programming and interface board for ESP32-CAM modules used in embedded-vision and connected-device development."
  },
  {
    file: "ESP8266_OLED_Board.jpg",
    type: "image",
    category: "IoT & Monitoring",
    title: "ESP8266 Development Board with OLED",
    description: "Wi-Fi-enabled embedded-development board with an onboard OLED display for IoT, monitoring, and compact interface prototypes."
  },
  {
    file: "Electronic_Components_Organizer.jpg",
    type: "image",
    category: "Sensors & Modules",
    title: "Electronic Sensor & Module Collection",
    description: "Organized assortment of sensor, interface, indicator, and control modules used for rapid prototyping and circuit experiments."
  },
  {
    file: "Electronics_Lab_Storage_Cabinet.jpg",
    type: "image",
    category: "Test & Measurement",
    title: "Electronics Laboratory Equipment",
    description: "Laboratory storage and work area containing test instruments, a bench power supply, multimeter, electronic boards, wiring, and supporting equipment."
  },
  {
    file: "Micro_Servo_Motors.jpg",
    type: "image",
    category: "Actuation",
    title: "SG90 Micro Servo Motors",
    description: "Compact servo actuators with control horns for positioning, small robotic mechanisms, and motion-oriented prototypes."
  },
  {
    file: "Relay_Module.jpg",
    type: "image",
    category: "Switching & Control",
    title: "Single-Channel Relay Module",
    description: "Relay-based switching interface for electronically controlled loads and embedded-control experiments."
  },
  {
    file: "Stepper_Motor.jpg",
    type: "image",
    category: "Motion Control",
    title: "Compact Motion-Control Motor Assembly",
    description: "Compact motor assembly used for positioning and motion-control prototyping in electromechanical experiments."
  },
  {
    file: "Prusa_Printer_Components_01.jpg",
    type: "image",
    category: "Digital Fabrication",
    title: "Prusa MK4S Kit Components",
    description: "Preparation stage documenting the Original Prusa MK4S kit, packaged components, assembly materials, and supporting parts before final setup."
  },
  {
    file: "Prusa_Printer_Components_02.jpg",
    type: "image",
    category: "Digital Fabrication",
    title: "Prusa MK4S Assembly Preparation",
    description: "Additional view of the printer kit and components during preparation for hands-on assembly."
  },
  {
    file: "Prusa_Printer_Tools_and_Parts.jpg",
    type: "image",
    category: "Digital Fabrication",
    title: "Prusa MK4S Assembly Tools & Parts",
    description: "Hand tools, driver bits, pliers, small parts, and supporting hardware used during printer assembly and setup."
  },
  {
    file: "Prusa_Printer_Assembled_01.jpg",
    type: "image",
    category: "Digital Fabrication",
    title: "Original Prusa MK4S — Completed Assembly",
    description: "Completed printer setup showing the assembled frame, print bed, toolhead, control interface, and filament handling hardware."
  },
  {
    file: "Prusa_Printer_Assembled_02.jpg",
    type: "image",
    category: "Digital Fabrication",
    title: "Original Prusa MK4S — Completed Assembly",
    description: "Additional documentation of the fully assembled printer within the engineering prototyping workspace."
  },
  {
    file: "Prusa_Printer_Assembled_03.jpg",
    type: "image",
    category: "Digital Fabrication",
    title: "Original Prusa MK4S — Completed Assembly",
    description: "Detailed view of the assembled digital-fabrication platform used for engineering prototyping."
  },
  {
    file: "Prusa_Printer_Assembled_04.jpg",
    type: "image",
    category: "Digital Fabrication",
    title: "Original Prusa MK4S — Completed Assembly",
    description: "Completed MK4S configuration with filament spool and operating hardware in place."
  },
  {
    file: "Prusa_Printer_Components_Overview.mp4",
    type: "video",
    category: "Digital Fabrication",
    title: "Prusa MK4S Components & Engineering Workspace Overview",
    description: "Video overview of the MK4S components, assembly preparation, and surrounding electronics and prototyping workspace."
  },
  {
    file: "Electronics_Lab_Inventory_Overview.mp4",
    type: "video",
    category: "Lab Overview",
    title: "Electronics Lab Inventory Overview",
    description: "Video overview of the laboratory inventory and engineering hardware collection used for practical electronics and prototyping work."
  }
];

const GITHUB_MEDIA = {
  student_videos_and_conference_presentations: [
    {
      file: "EV_Charging_Presentation.mp4",
      type: "video",
      poster: "EV_Charging_Presentation_poster.webp",
      title: "EV Charging Presentation"
    },
    {
      file: "Federated_Learning_Presentation.mp4",
      type: "video",
      poster: "Federated_Learning_Presentation_poster.webp",
      title: "Federated Learning Presentation"
    },
    {
      file: "Metaheuristic_Tuning_Presentation.mp4",
      type: "video",
      poster: "Metaheuristic_Tuning_Presentation_poster.webp",
      title: "Metaheuristic Tuning Presentation"
    },
    {
      file: "Scattering_Imaging_Presentation.mp4",
      type: "video",
      poster: "Scattering_Imaging_Presentation_poster.webp",
      title: "Scattering Imaging Presentation"
    },
    {
      file: "tDCS_Presentation.mp4",
      type: "video",
      poster: "tDCS_Presentation_poster.webp",
      title: "tDCS Presentation"
    },
    {
      file: "Camera_Based_Measurement_Systems.pdf",
      preview: "Camera_Based_Measurement_Systems_preview.webp",
      type: "pdf",
      title: "Camera-Based Measurement Systems",
      description: "PDF presentation associated with student research and conference-oriented academic work."
    },
    {
      file: "Deep_Learning_Scattering_Imaging.pdf",
      preview: "Deep_Learning_Scattering_Imaging_preview.webp",
      type: "pdf",
      title: "Deep Learning Scattering Imaging",
      description: "PDF presentation associated with student research and conference-oriented academic work."
    },
    {
      file: "EV_Charging_Systems.pdf",
      preview: "EV_Charging_Systems_preview.webp",
      type: "pdf",
      title: "EV Charging Systems",
      description: "PDF presentation associated with student research and conference-oriented academic work."
    },
    {
      file: "Federated_Learning_Trust.pdf",
      preview: "Federated_Learning_Trust_preview.webp",
      type: "pdf",
      title: "Federated Learning Trust",
      description: "PDF presentation associated with student research and conference-oriented academic work."
    },
    {
      file: "Metaheuristic_Controller_Tuning.pdf",
      preview: "Metaheuristic_Controller_Tuning_preview.webp",
      type: "pdf",
      title: "Metaheuristic Controller Tuning",
      description: "PDF presentation associated with student research and conference-oriented academic work."
    },
    {
      file: "tDCS_Review.pdf",
      preview: "tDCS_Review_preview.webp",
      type: "pdf",
      title: "tDCS Review",
      description: "PDF presentation associated with student research and conference-oriented academic work."
    }
  ],
  student_teaching_and_practical_training_activities: [
    {
      file: "Circuit_Assembly_Practical_Training.mp4",
      type: "video",
      poster: "Circuit_Assembly_Practical_Training_poster.webp",
      title: "Circuit Assembly Practical Training"
    },
    {
      file: "Circuit_Diagram_Instruction.mp4",
      type: "video",
      poster: "Circuit_Diagram_Instruction_poster.webp",
      title: "Circuit Diagram Instruction"
    },
    {
      file: "DC_Motor_Demonstration.mp4",
      type: "video",
      poster: "DC_Motor_Demonstration_poster.webp",
      title: "DC Motor Demonstration"
    },
    {
      file: "Electronic_Components_Practical_Demo.mp4",
      type: "video",
      poster: "Electronic_Components_Practical_Demo_poster.webp",
      title: "Electronic Components Practical Demo"
    },
    {
      file: "Motor_and_Component_Demonstration.mp4",
      type: "video",
      poster: "Motor_and_Component_Demonstration_poster.webp",
      title: "Motor and Component Demonstration"
    },
    {
      file: "Multimeter_Oscilloscope_Training.mp4",
      type: "video",
      poster: "Multimeter_Oscilloscope_Training_poster.webp",
      title: "Multimeter and Oscilloscope Training"
    },
    {
      file: "Oscilloscope_Waveform_Training_01.mp4",
      type: "video",
      poster: "Oscilloscope_Waveform_Training_01_poster.webp",
      title: "Oscilloscope Waveform Training 01"
    },
    {
      file: "Oscilloscope_Waveform_Training_02.mp4",
      type: "video",
      poster: "Oscilloscope_Waveform_Training_02_poster.webp",
      title: "Oscilloscope Waveform Training 02"
    },
    {
      file: "Perfboard_Preparation_Demo.mp4",
      type: "video",
      poster: "Perfboard_Preparation_Demo_poster.webp",
      title: "Perfboard Preparation Demo"
    },
    {
      file: "Proteus_Circuit_Simulation.mp4",
      type: "video",
      poster: "Proteus_Circuit_Simulation_poster.webp",
      title: "Proteus Circuit Simulation"
    },
    {
      file: "3D_Printer_Lab_01.jpg",
      type: "image",
      title: "3D Printer Lab 01"
    },
    {
      file: "3D_Printer_Lab_02.jpg",
      type: "image",
      title: "3D Printer Lab 02"
    },
    {
      file: "Circuit_Practical_Training_01.jpg",
      type: "image",
      title: "Circuit Practical Training 01"
    },
    {
      file: "Circuit_Practical_Training_02.jpg",
      type: "image",
      title: "Circuit Practical Training 02"
    },
    {
      file: "Circuit_Worksheet_Activity_01.jpg",
      type: "image",
      title: "Circuit Worksheet Activity 01"
    },
    {
      file: "Circuit_Worksheet_Activity_02.jpg",
      type: "image",
      title: "Circuit Worksheet Activity 02"
    },
    {
      file: "Classroom_Practical_Session_01.jpg",
      type: "image",
      title: "Classroom Practical Session 01"
    },
    {
      file: "Classroom_Practical_Session_02.jpg",
      type: "image",
      title: "Classroom Practical Session 02"
    },
    {
      file: "Electronics_Lab_Group_01.jpg",
      type: "image",
      title: "Electronics Lab Group 01"
    },
    {
      file: "Electronics_Lab_Group_02.jpg",
      type: "image",
      title: "Electronics Lab Group 02"
    },
    {
      file: "Electronics_Lab_Guidance_01.jpg",
      type: "image",
      title: "Electronics Lab Guidance 01"
    },
    {
      file: "Electronics_Lab_Guidance_02.jpg",
      type: "image",
      title: "Electronics Lab Guidance 02"
    },
    {
      file: "Electronics_Prototype_Demo_01.jpg",
      type: "image",
      title: "Electronics Prototype Demo 01"
    },
    {
      file: "Electronics_Prototype_Demo_02.jpg",
      type: "image",
      title: "Electronics Prototype Demo 02"
    },
    {
      file: "Electronics_Workbench_Demo_01.jpg",
      type: "image",
      title: "Electronics Workbench Demo 01"
    },
    {
      file: "Electronics_Workbench_Demo_02.jpg",
      type: "image",
      title: "Electronics Workbench Demo 02"
    },
    {
      file: "Embedded_System_Prototype_Demo_01.jpg",
      type: "image",
      title: "Embedded System Prototype Demo 01"
    },
    {
      file: "Embedded_System_Prototype_Demo_02.jpg",
      type: "image",
      title: "Embedded System Prototype Demo 02"
    },
    {
      file: "Embedded_System_Prototype_Demo_03.jpg",
      type: "image",
      title: "Embedded System Prototype Demo 03"
    },
    {
      file: "Measurement_Lab_Instruction_01.jpg",
      type: "image",
      title: "Measurement Lab Instruction 01"
    },
    {
      file: "Measurement_Lab_Instruction_02.jpg",
      type: "image",
      title: "Measurement Lab Instruction 02"
    },
    {
      file: "Measurement_Lab_Instruction_03.jpg",
      type: "image",
      title: "Measurement Lab Instruction 03"
    },
    {
      file: "Measurement_Lab_Instruction_04.jpg",
      type: "image",
      title: "Measurement Lab Instruction 04"
    },
    {
      file: "Oscilloscope_Practical_01.jpg",
      type: "image",
      title: "Oscilloscope Practical 01"
    },
    {
      file: "Oscilloscope_Practical_02.jpg",
      type: "image",
      title: "Oscilloscope Practical 02"
    },
    {
      file: "Oscilloscope_Practical_03.jpg",
      type: "image",
      title: "Oscilloscope Practical 03"
    },
    {
      file: "Oscilloscope_Training_01.jpg",
      type: "image",
      title: "Oscilloscope Training 01"
    },
    {
      file: "Oscilloscope_Training_02.jpg",
      type: "image",
      title: "Oscilloscope Training 02"
    },
    {
      file: "Power_Supply_Training_01.jpg",
      type: "image",
      title: "Power Supply Training 01"
    },
    {
      file: "Power_Supply_Training_02.jpg",
      type: "image",
      title: "Power Supply Training 02"
    },
    {
      file: "Practical_Teaching_Session.jpg",
      type: "image",
      title: "Practical Teaching Session"
    },
    {
      file: "Student_Electronics_Practice_01.jpg",
      type: "image",
      title: "Student Electronics Practice 01"
    },
    {
      file: "Student_Electronics_Practice_02.jpg",
      type: "image",
      title: "Student Electronics Practice 02"
    },
    {
      file: "Student_Lab_Instruction_01.jpg",
      type: "image",
      title: "Student Lab Instruction 01"
    },
    {
      file: "Student_Lab_Instruction_02.jpg",
      type: "image",
      title: "Student Lab Instruction 02"
    },
    {
      file: "Wiring_Practical_Training_01.jpg",
      type: "image",
      title: "Wiring Practical Training 01"
    },
    {
      file: "Wiring_Practical_Training_02.jpg",
      type: "image",
      title: "Wiring Practical Training 02"
    },
    {
      file: "Wiring_Practical_Training_03.jpg",
      type: "image",
      title: "Wiring Practical Training 03"
    }
  ],
  teacher_training_and_professional_development_programs: [
    {
      file: "Electrical_Waveforms_Training.jpg",
      type: "image",
      title: "Electrical Waveforms Training"
    },
    {
      file: "Electronics_Training_Demonstration.jpg",
      type: "image",
      title: "Electronics Training Demonstration"
    },
    {
      file: "Professional_Development_Presentation.jpg",
      type: "image",
      title: "Professional Development Presentation"
    },
    {
      file: "Teacher_Professional_Development_Workshop.mp4",
      type: "video",
      title: "Teacher Professional Development Workshop",
      poster: "Teacher_Workshop_Group.jpg"
    },
    {
      file: "Teacher_Training_Classroom.jpg",
      type: "image",
      title: "Teacher Training Classroom"
    },
    {
      file: "Teacher_Workshop_Group.jpg",
      type: "image",
      title: "Teacher Workshop Group"
    },
    {
      file: "Teacher_Workshop_Participants_01.jpg",
      type: "image",
      title: "Teacher Workshop Participants 01"
    },
    {
      file: "Teacher_Workshop_Participants_02.jpg",
      type: "image",
      title: "Teacher Workshop Participants 02"
    },
    {
      file: "Workshop_Instructor_Session.jpg",
      type: "image",
      title: "Workshop Instructor Session"
    }
  ],
  "3d_printing_and_stem_laboratory_activities": [
    {
      file: "3D_Printer_Hands_On_Demo.jpg",
      type: "image",
      title: "3D Printer Hands On Demo"
    },
    {
      file: "3D_Printer_Setup_Demo.mp4",
      type: "video",
      title: "3D Printer Setup Demo",
      poster: "3D_Printer_Workshop_Setup.jpg"
    },
    {
      file: "3D_Printer_STEM_Activity.mp4",
      type: "video",
      title: "3D Printer STEM Activity",
      poster: "3D_Printer_Hands_On_Demo.jpg"
    },
    {
      file: "3D_Printer_Training_Discussion.jpg",
      type: "image",
      title: "3D Printer Training Discussion"
    },
    {
      file: "3D_Printer_Workshop_Discussion.jpg",
      type: "image",
      title: "3D Printer Workshop Discussion"
    },
    {
      file: "3D_Printer_Workshop_Group.jpg",
      type: "image",
      title: "3D Printer Workshop Group"
    },
    {
      file: "3D_Printer_Workshop_Session.jpg",
      type: "image",
      title: "3D Printer Workshop Session"
    },
    {
      file: "3D_Printer_Workshop_Setup.jpg",
      type: "image",
      title: "3D Printer Workshop Setup"
    },
    {
      file: "3D_Printing_Closeup.mp4",
      type: "video",
      title: "3D Printing Closeup",
      poster: "3D_Printer_Hands_On_Demo.jpg"
    },
    {
      file: "3D_Printing_Process.mp4",
      type: "video",
      title: "3D Printing Process",
      poster: "3D_Printer_Workshop_Session.jpg"
    }
  ],
  technical_maintenance_and_troubleshooting_work: [
    {
      file: "Desktop_PC_Workstation.jpg",
      type: "image",
      title: "Desktop PC Workstation",
      description: "Desktop workstation documented during computer maintenance and technical support activities."
    },
    {
      file: "Desktop_PC_Internal_Hardware.jpg",
      type: "image",
      title: "Desktop PC Internal Hardware",
      description: "Internal desktop hardware documented during technical inspection and maintenance."
    },
    {
      file: "Desktop_PC_Internal_Inspection.mp4",
      type: "video",
      poster: "Desktop_PC_Internal_Hardware.jpg",
      title: "Desktop PC Internal Inspection",
      description: "Internal inspection of a desktop computer during hardware diagnosis and maintenance."
    },
    {
      file: "Desktop_RAM_Module.jpg",
      type: "image",
      title: "Desktop RAM Module",
      description: "RAM module documented during desktop hardware inspection and component-level troubleshooting."
    },
    {
      file: "Canon_MF4350d_Printer.jpg",
      type: "image",
      title: "Canon MF4350d Printer",
      description: "Laser multifunction printer documented as part of technical maintenance and inspection work."
    },
    {
      file: "Laser_Printer_Internal_Repair.mp4",
      type: "video",
      poster: "Canon_MF4350d_Printer.jpg",
      title: "Laser Printer Internal Repair",
      description: "Internal inspection and repair work on a laser printer."
    },
    {
      file: "Power_Board_Inspection.jpg",
      type: "image",
      title: "Power Board Inspection",
      description: "Power-board inspection documented during electronic troubleshooting and maintenance."
    },
    {
      file: "Control_Board_Inspection.mp4",
      type: "video",
      poster: "Power_Board_Inspection.jpg",
      title: "Control Board Inspection",
      description: "Inspection of an electronic control board during troubleshooting and maintenance."
    },
    {
      file: "Banknote_Sorter_BPS_C1.jpg",
      type: "image",
      title: "Banknote Sorter BPS C1",
      description: "Banknote sorting equipment documented during technical maintenance and troubleshooting work."
    },
    {
      file: "Computer_Lab_System_Test.mp4",
      type: "video",
      poster: "Desktop_PC_Workstation.jpg",
      title: "Computer Lab System Test",
      description: "Functional testing of a computer-laboratory system following technical inspection or maintenance."
    }
  ]
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const asBool = value => value === true || value === "true" || value === 1 || value === "1";
const escapeHTML = (value = "") => {
  const node = document.createElement("div");
  node.textContent = String(value ?? "");
  return node.innerHTML;
};
const escapeAttr = escapeHTML;
const asArray = value => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value === null || value === undefined || value === "" || value === "null") return [];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {}
    return value.split(",").map(item => item.trim()).filter(Boolean);
  }
  return [];
};
const safeDate = value => {
  if (!value || value === "null") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};
const formatDate = (value, options = { year: "numeric", month: "short" }) => {
  const date = safeDate(value);
  return date ? date.toLocaleDateString("en-US", options) : "";
};
const prettyCategory = (value = "") => String(value)
  .replaceAll("-", " ")
  .replaceAll("_", " ")
  .replace(/\b\w/g, character => character.toUpperCase());
const normalizedKey = value => String(value ?? "")
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, " ")
  .trim();
const sortRows = rows => [...rows].sort((a, b) => (Number(a.sort_order) || 9999) - (Number(b.sort_order) || 9999));

function uniqueRows(rows, selector) {
  const seen = new Set();
  return rows.filter(row => {
    const key = selector(row);
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function queryString(method, values, column) {
  const query = { method, values };
  if (column) query.column = column;
  return JSON.stringify(query);
}

async function fetchRows(tableId, { limit = 250 } = {}) {
  const canUseVercelProxy = typeof location !== "undefined"
    && location.hostname.endsWith(".vercel.app");

  if (canUseVercelProxy) {
    const proxyUrl = new URL("/api/appwrite-table", location.origin);
    proxyUrl.searchParams.set("table", tableId);
    proxyUrl.searchParams.set("limit", String(limit));
    const response = await fetch(proxyUrl, {
      headers: { "Accept": "application/json" },
      cache: "default"
    });
    if (!response.ok) throw new Error(`${tableId}: proxy HTTP ${response.status}`);
    const data = await response.json();
    return data.rows || data.documents || [];
  }

  const directUrl = new URL(`${APPWRITE.endpoint}/tablesdb/${APPWRITE.databaseId}/tables/${tableId}/rows`);
  directUrl.searchParams.append("queries[]", queryString("limit", [limit]));
  directUrl.searchParams.set("total", "false");
  const response = await fetch(directUrl, {
    headers: { "X-Appwrite-Project": APPWRITE.projectId, "Accept": "application/json" },
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`${tableId}: HTTP ${response.status}`);
  const data = await response.json();
  return data.rows || data.documents || [];
}

function publicRow(row) {
  return row && (!row.visibility || String(row.visibility).toLowerCase() === "public");
}

function approvedRow(row) {
  if (!publicRow(row)) return false;
  const reviewValues = [row.status, row.classification, row.review_status, row.publication_status]
    .filter(Boolean)
    .map(value => String(value).toLowerCase());
  return !reviewValues.includes("needs_review");
}

function normalizeRendering(row) {
  if (!row || !publicRow(row)) return null;
  const ids = asArray(row.display_file_ids);
  if (!ids.length) return null;
  return { ...row, display_file_ids: ids, page_count: Number(row.page_count) || ids.length };
}

function storageFileView(fileId) {
  if (!fileId) return "";
  if (String(fileId).startsWith("/")) return String(fileId);
  return `${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files/${encodeURIComponent(fileId)}/view?project=${encodeURIComponent(APPWRITE.projectId)}`;
}

function requiredDataKeys() {
  const keys = new Set();
  const add = (...items) => items.forEach(item => keys.add(item));
  if ($("#homeFeaturedPublications") || $("#metricPublications")) add("publications", "projects", "awards");
  if ($("#publicationsList")) add("publications", "assets", "assetRenderings");
  if ($("#projectsList") || $("#graduationProjectActions")) add("projects", "assets", "assetRenderings");
  if ($("#awardsList")) add("awards", "assets", "assetRenderings");
  if ($("#credentialsList")) add("credentials", "awards", "assets", "assetRenderings");
  if ($("#experienceList")) add("experiences", "assets", "assetRenderings");
  if ($("#recommendationsList")) add("recommendations", "assets", "assetRenderings");
  if ($("#institutionalEvidenceList")) add("institutionalEvidence", "assets", "assetRenderings");
  if ($("#documentsList")) Object.keys(APPWRITE.tables).forEach(key => keys.add(key));
  return keys;
}

async function fetchStaticFallback() {
  const response = await fetch(PUBLIC_FALLBACK.url, {
    headers: { "Accept": "application/json" },
    cache: "force-cache"
  });
  if (!response.ok) throw new Error(`fallback HTTP ${response.status}`);
  return response.json();
}

function readCachedPublicData() {
  try {
    const raw = localStorage.getItem(PUBLIC_FALLBACK.cacheKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeCachedPublicData(partial) {
  try {
    const existing = readCachedPublicData();
    const merged = { ...existing, ...partial, cached_at: new Date().toISOString() };
    localStorage.setItem(PUBLIC_FALLBACK.cacheKey, JSON.stringify(merged));
  } catch {}
}

let DATA_PROMISE;
function loadData() {
  if (DATA_PROMISE) return DATA_PROMISE;
  DATA_PROMISE = (async () => {
    const required = requiredDataKeys();
    const entries = Object.entries(APPWRITE.tables).filter(([key]) => required.has(key));
    const fallbackPromise = fetchStaticFallback().catch(() => ({}));
    const cached = readCachedPublicData();
    const results = await Promise.allSettled(entries.map(([, tableId]) => fetchRows(tableId)));
    const fallback = await fallbackPromise;
    const data = { errors: [], fallbackKeys: [], liveKeys: [] };
    const liveForCache = {};

    Object.keys(APPWRITE.tables).forEach(key => { data[key] = []; });

    results.forEach((result, index) => {
      const [key] = entries[index];
      if (result.status === "fulfilled") {
        const rows = sortRows((result.value || []).filter(publicRow));
        data[key] = rows;
        data.liveKeys.push(key);
        liveForCache[key] = rows;
        return;
      }

      const cachedRows = Array.isArray(cached[key]) ? cached[key].filter(publicRow) : [];
      const staticRows = Array.isArray(fallback[key]) ? fallback[key].filter(publicRow) : [];
      const rows = cachedRows.length ? cachedRows : staticRows;
      data[key] = sortRows(rows);
      data.fallbackKeys.push(key);
      data.errors.push(`${key}: ${result.reason?.message || "unavailable"}`);
    });

    if (Object.keys(liveForCache).length) writeCachedPublicData(liveForCache);

    data.usingFallback = data.fallbackKeys.length > 0;
    data.assets = sortRows(data.assets || []);
    data.assetMap = new Map(data.assets.map(asset => [asset.$id, asset]));
    data.assetRenderings = (data.assetRenderings || []).map(normalizeRendering).filter(Boolean);
    data.renderingMap = new Map(data.assetRenderings.map(row => [row.asset_id, row]));
    data.referencedAssetIds = referencedAssetIds(data);
    return data;
  })();
  return DATA_PROMISE;
}

function assetFor(data, id) {
  return id ? data.assetMap?.get(id) || null : null;
}

function publicAsset(data, id) {
  const asset = assetFor(data, id);
  return asset && publicRow(asset) ? asset : null;
}

function displayModelForAsset(data, asset) {
  if (!asset || !publicRow(asset)) return null;
  const rendering = normalizeRendering(data.renderingMap?.get(asset.$id));
  if (!rendering) return null;
  return {
    $id: asset.$id,
    title: asset.title || "Supporting evidence",
    description: asset.description || "",
    alt_text: asset.alt_text || "",
    asset_type: asset.asset_type || "",
    media_type: asset.media_type || "",
    asset,
    rendering,
    display_file_ids: rendering.display_file_ids,
    render_type: rendering.render_type || "image",
    page_count: rendering.page_count || rendering.display_file_ids.length
  };
}

function modelForId(data, id) {
  return data.localModelMap?.get(id) || displayModelForAsset(data, publicAsset(data, id));
}

function assetIdsFromRecord(row) {
  return uniqueRows([
    row.asset_id,
    row.cover_asset_id,
    ...asArray(row.asset_ids),
    ...asArray(row.supporting_asset_ids),
    ...asArray(row.evidence_asset_ids)
  ].filter(Boolean).map(id => ({ id })), item => item.id).map(item => item.id);
}

function referencedAssetIds(data) {
  const ids = new Set();
  const add = id => { if (id) ids.add(id); };
  ["publications", "projects", "awards", "credentials", "experiences", "recommendations", "institutionalEvidence"]
    .forEach(key => (data[key] || []).forEach(row => assetIdsFromRecord(row).forEach(add)));
  return ids;
}

function localEvidenceText(row) {
  return normalizedKey([
    row?.$id, row?.slug, row?.title, row?.issuer, row?.institution, row?.organization,
    row?.location, row?.recommender_name, row?.recommender_title, row?.description,
    row?.summary, row?.relationship_context, row?.category, row?.experience_type
  ].filter(Boolean).join(" "));
}

function localEvidenceSpecMatches(spec, row) {
  const ids = new Set(assetIdsFromRecord(row));
  if ((spec.assetIds || []).some(id => ids.has(id))) return true;
  const text = localEvidenceText(row);
  const hasAll = (spec.all || []).every(token => text.includes(normalizedKey(token)));
  const hasAny = !(spec.any || []).length || spec.any.some(token => text.includes(normalizedKey(token)));
  const hasNone = !(spec.none || []).some(token => text.includes(normalizedKey(token)));
  return hasAll && hasAny && hasNone;
}

function localEvidenceModels(data, row, collection, appwriteModels = []) {
  const specs = (LOCAL_EVIDENCE_MEDIA[collection] || []).filter(spec => localEvidenceSpecMatches(spec, row));
  const selected = collection === "experiences" ? specs : specs.slice(0, 1);
  if (!selected.length) return [];

  data.localModelMap ||= new Map();
  return selected.map(spec => {
    const fallbackModel = (spec.assetIds || []).length
      ? appwriteModels.find(model => spec.assetIds.includes(model.$id)) || appwriteModels[0] || null
      : appwriteModels[0] || null;
    const model = {
      $id: `local:${collection}:${spec.id}`,
      title: row.title || fallbackModel?.title || "Supporting evidence",
      description: row.description || row.summary || fallbackModel?.description || "",
      alt_text: row.title || fallbackModel?.alt_text || "Supporting evidence",
      asset_type: fallbackModel?.asset_type || collection,
      media_type: "image",
      render_type: "pdf_pages",
      display_file_ids: spec.files,
      page_count: spec.files.length,
      fallback_display_file_ids: fallbackModel?.display_file_ids || [],
      _localEvidence: true
    };
    data.localModelMap.set(model.$id, model);
    return model;
  });
}

function recordAssets(data, row, collection = "") {
  const sourceItems = uniqueRows(assetIdsFromRecord(row).map(id => {
    const model = modelForId(data, id);
    return model || { $id: `private:${id}`, _privateEvidence: true };
  }), item => item.$id);
  const appwriteModels = sourceItems.filter(item => item?.display_file_ids?.length && !item._localEvidence);
  const localModels = collection ? localEvidenceModels(data, row, collection, appwriteModels) : [];
  return localModels.length ? localModels : sourceItems;
}

function injectRenderingStyles() {
  if ($("#renderingIntegrationStyles")) return;
  const style = document.createElement("style");
  style.id = "renderingIntegrationStyles";
  style.textContent = `
    .rendering-page-count{display:inline-flex;align-items:center;color:var(--muted);font-size:.68rem;font-weight:760}
    .private-evidence-note{margin-top:13px;padding:10px 12px;border-left:3px solid var(--border-strong);background:var(--surface-soft);color:var(--muted);font-size:.75rem;border-radius:0 6px 6px 0}
    .asset-window img,.asset-preview-full img{width:100%;height:100%;object-fit:contain;background:var(--surface-soft)}
    .asset-preview-full{display:flex;align-items:center;justify-content:center;min-height:58vh;max-height:72vh;background:var(--surface-soft);border:1px solid var(--border);border-radius:8px;overflow:hidden}
    .asset-preview-full img{max-height:72vh}
    .document-page-nav,.modal-item-nav{display:flex;align-items:center;justify-content:center;gap:10px;margin:12px 0 0}
    .document-page-nav button,.modal-item-nav button{border:1px solid var(--border);background:var(--surface);color:var(--text);border-radius:6px;padding:6px 10px;cursor:pointer;font-size:.72rem;font-weight:760}
    .document-page-nav button:disabled{opacity:.45;cursor:not-allowed}
    .document-page-nav span,.modal-item-nav span{min-width:86px;text-align:center;color:var(--muted);font-size:.72rem;font-weight:760}
    .github-media-empty{padding:18px 0;color:var(--muted);font-size:.82rem;border-top:1px solid var(--border)}
    @media(max-width:700px){.asset-preview-full{min-height:46vh;max-height:62vh}.asset-preview-full img{max-height:62vh}.document-page-nav{gap:6px}.document-page-nav button{padding:6px 8px}}
  `;
  document.head.appendChild(style);
}

function displayKind(model) {
  const type = String(model?.render_type || "").toLowerCase();
  if (type === "pdf_pages") return "Document";
  if (type.includes("video")) return "Video";
  return "Image";
}

function renderingFileUrl(model, pageIndex = 0) {
  const fileId = model?.display_file_ids?.[pageIndex];
  return fileId ? storageFileView(fileId) : "";
}

function renderingFallbackUrl(model, pageIndex = 0) {
  const ids = asArray(model?.fallback_display_file_ids);
  const fileId = ids[pageIndex] || ids[0] || "";
  return fileId ? storageFileView(fileId) : "";
}

function renderingPreviewMarkup(model, context = {}, pageIndex = 0) {
  const source = renderingFileUrl(model, pageIndex);
  const fallbackSource = renderingFallbackUrl(model, pageIndex);
  const title = context.title || model?.title || "Supporting evidence";
  if (!source) return `<div class="asset-unavailable"><span>Preview</span><strong>${escapeHTML(title)}</strong><small>Content temporarily unavailable.</small></div>`;
  if (String(model.render_type || "").toLowerCase().includes("video") || String(model.media_type || "").toLowerCase() === "video") {
    return `<video controls preload="metadata" playsinline aria-label="${escapeAttr(title)}"><source src="${escapeAttr(source)}"></video>`;
  }
  const fallbackAttr = fallbackSource && fallbackSource !== source
    ? ` data-fallback-src="${escapeAttr(fallbackSource)}"`
    : "";
  return `<img src="${escapeAttr(source)}" alt="${escapeAttr(model.alt_text || title)}" loading="lazy" decoding="async" data-rendering-preview${fallbackAttr}>`;
}

function initRenderingImageFallbacks() {
  document.addEventListener("error", event => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || !image.matches("[data-rendering-preview]")) return;
    const fallbackSource = image.dataset.fallbackSrc || "";
    if (fallbackSource && image.dataset.fallbackTried !== "1") {
      image.dataset.fallbackTried = "1";
      image.src = fallbackSource;
      return;
    }
    const fallback = document.createElement("div");
    fallback.className = "asset-unavailable";
    fallback.innerHTML = `<span>FILE</span><strong>Document preview temporarily unavailable</strong><small>The verified record remains available while the display file is being prepared.</small>`;
    image.replaceWith(fallback);
  }, true);
}

function assetWindowCard(model, context = {}, options = {}) {
  if (!model?.display_file_ids?.length) return "";
  const title = context.title || model.title || "Supporting evidence";
  const description = context.description || context.caption || context.summary || model.description || "";
  const className = options.compact ? " asset-evidence-card--compact" : "";
  const pages = model.display_file_ids.length;
  return `<figure class="asset-evidence-card${className}" data-asset-card="${escapeAttr(model.$id)}">
    <div class="asset-window asset-window--image">${renderingPreviewMarkup(model, context, 0)}</div>
    <figcaption class="asset-caption">
      <div class="asset-caption-head"><span>${escapeHTML(displayKind(model))}</span>${pages > 1 ? `<span class="rendering-page-count">${pages} pages</span>` : ""}${context.date ? `<time>${escapeHTML(context.date)}</time>` : ""}</div>
      <h4>${escapeHTML(title)}</h4>
      ${description ? `<p>${escapeHTML(description)}</p>` : ""}
      <div class="asset-caption-actions"><button class="text-button asset-open" type="button" data-display-asset="${escapeAttr(model.$id)}">${pages > 1 ? "View document" : "Open full view"}</button></div>
    </figcaption>
  </figure>`;
}

function inlineAssetStrip(data, items, context = {}, options = {}) {
  const models = uniqueRows((items || []).filter(item => item?.display_file_ids?.length), item => item.$id);
  if (!models.length) {
    return (items || []).some(item => item?._privateEvidence)
      ? `<div class="private-evidence-note" role="note">Supporting document retained privately. Public display is available only for approved evidence.</div>`
      : "";
  }
  const max = options.max || models.length;
  return `<div class="record-asset-gallery${options.compact ? " record-asset-gallery--compact" : ""}">${models.slice(0, max).map(model => assetWindowCard(model, context, { compact: options.compact })).join("")}</div>`;
}

function portfolioMediaCard(data, row, options = {}) {
  const assets = recordAssets(data, row, options.collection || "");
  const models = uniqueRows(assets.filter(item => item?.display_file_ids?.length), item => item.$id);
  const model = models[0] || null;
  const title = options.title || row.title || model?.title || "Portfolio record";
  const institution = options.institution || row.issuer || row.institution || "";
  const description = options.description || row.description || row.summary || "";
  const year = options.year || row.year || "";
  const category = options.categoryLabel || prettyCategory(row.category || options.fallbackCategory || "Record");
  const dataCategory = options.dataCategory || row.category || "other";
  const filterClass = options.filterable ? " filter-item" : "";
  const extraClass = options.extraClass ? ` ${options.extraClass}` : "";
  const visual = model
    ? `<button class="github-pdf-preview-button portfolio-preview-button" type="button" data-display-asset="${escapeAttr(model.$id)}" aria-label="Open ${escapeAttr(title)}">
        ${renderingPreviewMarkup(model, { title }, 0)}
        <span class="github-pdf-preview-overlay"><span class="file-kind">${model.display_file_ids.length > 1 ? "DOC" : "VIEW"}</span><strong>${model.display_file_ids.length > 1 ? "View document →" : "Open full view →"}</strong></span>
      </button>`
    : `<div class="asset-file-panel portfolio-private-panel"><span class="file-kind">${options.placeholderKind || "FILE"}</span><strong>${escapeHTML(options.placeholderTitle || (data.usingFallback ? "Document preview temporarily unavailable" : "Supporting document"))}</strong><small>${escapeHTML(options.placeholderText || (data.usingFallback ? "The verified record remains available while the document preview service is temporarily unavailable." : "Document not published"))}</small></div>`;

  return `<figure class="asset-evidence-card github-media-card portfolio-media-card${filterClass}${extraClass}" data-category="${escapeAttr(dataCategory)}">
    <div class="asset-window asset-window--image">${visual}</div>
    <figcaption class="asset-caption">
      <div class="asset-caption-head"><span>${escapeHTML(category)}</span>${year ? `<time>${escapeHTML(year)}</time>` : ""}</div>
      <h4>${escapeHTML(title)}</h4>
      ${institution ? `<p class="portfolio-card-institution">${escapeHTML(institution)}</p>` : ""}
      ${description ? `<p>${escapeHTML(description)}</p>` : ""}
    </figcaption>
  </figure>`;
}

let modalState = { models: [], itemIndex: 0, pageIndex: 0, trigger: null };

function ensureModal() {
  let modal = $("#mediaModal");
  if (!modal) {
    document.body.insertAdjacentHTML("beforeend", `<div class="media-modal" id="mediaModal" aria-hidden="true"><div class="media-modal-backdrop" data-close-modal></div><div class="media-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="mediaModalTitle"><button class="modal-close" type="button" data-close-modal aria-label="Close preview">×</button><h2 id="mediaModalTitle">Document preview</h2><div id="mediaModalBody"></div></div></div>`);
    modal = $("#mediaModal");
  }
  if (modal.dataset.bound !== "1") {
    modal.dataset.bound = "1";
    $$("[data-close-modal]", modal).forEach(button => button.addEventListener("click", closeModal));
  }
  return modal;
}

function currentModalModel() {
  return modalState.models[modalState.itemIndex] || null;
}

function renderModalAsset() {
  const modal = ensureModal();
  const body = $("#mediaModalBody", modal);
  const heading = $("#mediaModalTitle", modal);
  const model = currentModalModel();
  if (!model) {
    body.innerHTML = "<p>Preview unavailable.</p>";
    return;
  }

  const pageMax = Math.max(0, model.display_file_ids.length - 1);
  modalState.pageIndex = Math.max(0, Math.min(modalState.pageIndex, pageMax));
  heading.textContent = model.title || "Document preview";

  const itemNav = modalState.models.length > 1 ? `<div class="modal-item-nav"><button type="button" data-item-prev>← Previous item</button><span>${modalState.itemIndex + 1} / ${modalState.models.length}</span><button type="button" data-item-next>Next item →</button></div>` : "";
  const pageNav = model.display_file_ids.length > 1 ? `<div class="document-page-nav"><button type="button" data-page-prev ${modalState.pageIndex === 0 ? "disabled" : ""}>← Previous</button><span>Page ${modalState.pageIndex + 1} / ${model.display_file_ids.length}</span><button type="button" data-page-next ${modalState.pageIndex === pageMax ? "disabled" : ""}>Next →</button></div>` : "";
  body.innerHTML = `${itemNav}<div class="asset-preview-full">${renderingPreviewMarkup(model, {}, modalState.pageIndex)}</div>${pageNav}${model.description ? `<p class="modal-description">${escapeHTML(model.description)}</p>` : ""}`;

  $("[data-page-prev]", body)?.addEventListener("click", () => { modalState.pageIndex -= 1; renderModalAsset(); });
  $("[data-page-next]", body)?.addEventListener("click", () => { modalState.pageIndex += 1; renderModalAsset(); });
  $("[data-item-prev]", body)?.addEventListener("click", () => { modalState.itemIndex = (modalState.itemIndex - 1 + modalState.models.length) % modalState.models.length; modalState.pageIndex = 0; renderModalAsset(); });
  $("[data-item-next]", body)?.addEventListener("click", () => { modalState.itemIndex = (modalState.itemIndex + 1) % modalState.models.length; modalState.pageIndex = 0; renderModalAsset(); });
}

function openAssetSet(models, trigger = null) {
  const clean = uniqueRows((models || []).filter(model => model?.display_file_ids?.length), model => model.$id);
  if (!clean.length) return;
  modalState = { models: clean, itemIndex: 0, pageIndex: 0, trigger };
  const modal = ensureModal();
  renderModalAsset();
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => $(".modal-close", modal)?.focus(), 0);
}

function closeModal() {
  const modal = $("#mediaModal");
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  const body = $("#mediaModalBody", modal);
  if (body) body.innerHTML = "";
  document.body.classList.remove("modal-open");
  modalState.trigger?.focus?.();
  modalState = { models: [], itemIndex: 0, pageIndex: 0, trigger: null };
}

function bindAssetButtons(data) {
  $$("[data-display-asset]").forEach(button => {
    if (button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    button.addEventListener("click", () => {
      const model = data.localModelMap?.get(button.dataset.displayAsset) || modelForId(data, button.dataset.displayAsset);
      if (model) openAssetSet([model], button);
    });
  });
}

function initModalKeyboard() {
  window.addEventListener("keydown", event => {
    const modal = $("#mediaModal");
    if (!modal?.classList.contains("show")) return;
    if (event.key === "Escape") return closeModal();
    const model = currentModalModel();
    if (!model) return;
    if (event.key === "ArrowLeft" && modalState.pageIndex > 0) {
      modalState.pageIndex -= 1;
      renderModalAsset();
    }
    if (event.key === "ArrowRight" && modalState.pageIndex < model.display_file_ids.length - 1) {
      modalState.pageIndex += 1;
      renderModalAsset();
    }
  });
}

function formatExperienceRange(row) {
  if (row?.period_label) return String(row.period_label);
  const start = safeDate(row.start_date);
  const end = safeDate(row.end_date);
  const startLabel = start ? start.toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "";
  const endLabel = asBool(row.current) ? "Present" : end ? end.toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "";
  return [startLabel, endLabel].filter(Boolean).join(" – ");
}

function renderError(root, message = "Content temporarily unavailable. Please refresh shortly.") {
  if (!root) return;
  root.innerHTML = `<div class="empty-state"><h3>Content temporarily unavailable</h3><p>${escapeHTML(message)}</p></div>`;
}

function highlightSelf(authors = "") {
  const escaped = escapeHTML(authors);
  return escaped.replace(/Salah F\. S\. Saeed|Salah F\. S\. Nasser|Salah Faisal Saeed Saeed|S\. F\. S\. Saeed|S\. F\. S\. Nasser/g, '<strong class="author-self">$&</strong>');
}

async function renderPublications() {
  const root = $("#publicationsList");
  if (!root) return;
  const data = await loadData();
  let rows = uniqueRows((data.publications || []).filter(row => approvedRow(row) && row.status === "published"), row => normalizedKey(row.doi_url || row.title));
  if (!rows.length) return renderError(root);
  rows = [...rows].sort((a, b) => {
    const ap = a.status === "published" ? 0 : 1;
    const bp = b.status === "published" ? 0 : 1;
    return ap - bp || (Number(b.year) || 0) - (Number(a.year) || 0) || (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0);
  });
  root.innerHTML = rows.map((publication, index) => {
    const category = publication.status === "published" ? "published" : "in_preparation";
    const assets = recordAssets(data, publication, "publications");
    const isAward = /trust-by-design/i.test(publication.title || "");
    return `<article class="publication-record filter-item" data-category="${category}"><div class="publication-index">${String(index + 1).padStart(2, "0")}</div><div class="publication-content"><div class="record-eyebrow"><span class="status-badge ${category === "published" ? "status-published" : "status-prep"}">${escapeHTML(publication.status === "published" ? "Published" : prettyCategory(publication.status || "In preparation"))}</span>${isAward ? '<span class="status-badge award-badge">Best Paper Award</span>' : ""}<span class="publication-year">${escapeHTML(publication.year || "")}</span></div><h3>${escapeHTML(publication.title)}</h3><p class="pub-authors">${highlightSelf(publication.authors || "")}</p><p class="pub-venue">${escapeHTML(publication.venue || "")}</p>${publication.summary ? `<p class="record-summary">${escapeHTML(publication.summary)}</p>` : ""}${publication.doi_url ? `<div class="record-actions"><a class="text-link" href="${escapeAttr(publication.doi_url)}" target="_blank" rel="noopener">DOI / Publisher ↗</a></div>` : ""}${inlineAssetStrip(data, assets, { description: publication.summary || "" }, { compact: true, max: 2 })}</div></article>`;
  }).join("");
  const summary = $("#publicationsSummary");
  if (summary) summary.innerHTML = `<span><strong>${rows.length}</strong> published IEEE conference papers</span>`;
  bindAssetButtons(data);
  initFilters();
}

function projectHardwarePath(fileName) {
  return `/media/assets/projects/engineering-components-and-tools/${encodeURIComponent(fileName)}`;
}

function projectHardwareModel(item, index) {
  return {
    $id: `project-hardware:${index}`,
    title: item.title,
    description: item.description,
    alt_text: item.title,
    media_type: item.type === "video" ? "video" : "image",
    render_type: item.type === "video" ? "video" : "image",
    display_file_ids: [projectHardwarePath(item.file)]
  };
}

function projectHardwareCard(item, index) {
  const source = projectHardwarePath(item.file);
  const isVideo = item.type === "video";
  const visual = isVideo
    ? `<video controls preload="metadata" playsinline aria-label="${escapeAttr(item.title)}"><source src="${escapeAttr(source)}" type="video/mp4">Your browser does not support embedded video.</video>`
    : `<button class="github-pdf-preview-button portfolio-preview-button project-hardware-preview" type="button" data-project-hardware-index="${index}" aria-label="Open ${escapeAttr(item.title)}">
        <img src="${escapeAttr(source)}" alt="${escapeAttr(item.title)}" loading="lazy" decoding="async">
        <span class="github-pdf-preview-overlay"><span class="file-kind">VIEW</span><strong>Open full view →</strong></span>
      </button>`;

  return `<figure class="asset-evidence-card github-media-card project-hardware-card">
    <div class="asset-window asset-window--${isVideo ? "video" : "image"}">${visual}</div>
    <figcaption class="asset-caption">
      <div class="asset-caption-head"><span>${escapeHTML(item.category || (isVideo ? "Video" : "Image"))}</span></div>
      <h4>${escapeHTML(item.title)}</h4>
      <p>${escapeHTML(item.description)}</p>
    </figcaption>
  </figure>`;
}

function renderProjectHardware() {
  const root = $("#projectHardwareGallery");
  if (!root) return;

  const imageCount = PROJECT_HARDWARE_MEDIA.filter(item => item.type === "image").length;
  const videoCount = PROJECT_HARDWARE_MEDIA.filter(item => item.type === "video").length;
  const stats = $("#projectHardwareStats");
  if (stats) {
    stats.innerHTML = `<div><dt>${PROJECT_HARDWARE_MEDIA.length}</dt><dd>media items</dd></div><div><dt>${imageCount}</dt><dd>images</dd></div><div><dt>${videoCount}</dt><dd>video</dd></div>`;
  }

  root.innerHTML = PROJECT_HARDWARE_MEDIA.map(projectHardwareCard).join("");
  const models = PROJECT_HARDWARE_MEDIA.map(projectHardwareModel);
  $("[data-project-hardware-index]", root);
  $("[data-project-hardware-index]", root).forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.projectHardwareIndex);
      const model = models[index];
      if (model) openAssetSet([model], button);
    });
  });
}

async function renderProjects() {
  const root = $("#projectsList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows((data.projects || []).filter(approvedRow), row => normalizedKey(row.slug || row.title));
  if (!rows.length) return renderError(root);
  root.innerHTML = rows.map((project, index) => {
    const assets = recordAssets(data, project, "projects");
    const technologies = asArray(project.technologies);
    const tags = technologies.length ? technologies : [prettyCategory(project.category || "Project")];
    return `<article class="project-record filter-item" id="${escapeAttr(project.slug || "")}" data-category="${escapeAttr(project.category || "other")}"><div class="project-index">${String(index + 1).padStart(2, "0")}</div><div class="project-main"><div class="project-top"><div><p class="record-type">${escapeHTML(prettyCategory(project.status || "Project"))}</p><h3>${escapeHTML(project.title)}</h3></div>${project.year ? `<time>${escapeHTML(project.year)}</time>` : ""}</div><p class="project-summary">${escapeHTML(project.short_description || project.overview || "")}</p><div class="project-tags">${tags.filter(Boolean).slice(0, 7).map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>${inlineAssetStrip(data, assets, { description: project.short_description || project.overview || "" }, { compact: true, max: 3 })}<details class="project-details"><summary>Project details</summary><dl>${project.role ? `<div><dt>Role</dt><dd>${escapeHTML(project.role)}</dd></div>` : ""}${project.objectives ? `<div><dt>Objectives</dt><dd>${escapeHTML(project.objectives)}</dd></div>` : ""}${project.methodology ? `<div><dt>Methodology</dt><dd>${escapeHTML(project.methodology)}</dd></div>` : ""}${project.results ? `<div><dt>Results / status</dt><dd>${escapeHTML(project.results)}</dd></div>` : ""}</dl></details></div></article>`;
  }).join("");
  bindAssetButtons(data);
  initFilters();
}

function taizResearchExcellenceAward() {
  return {
    $id: "site:taiz-university-scientific-research-excellence-2026",
    slug: "taiz-university-scientific-research-excellence-2026",
    title: "Certificate of Appreciation — Scientific Research Excellence",
    issuer: "Taiz University",
    year: 2026,
    category: "academic_distinction",
    description: "Recognition from Taiz University for outstanding excellence in scientific research and distinguished scholarly contributions that enhanced the University's academic presence and reputation in the international research community.",
    visibility: "public",
    featured: true
  };
}

function mergeTaizResearchExcellenceAward(rows = []) {
  const award = taizResearchExcellenceAward();
  const exists = rows.some(row => {
    const key = normalizedKey([row.title, row.issuer, row.description].filter(Boolean).join(" "));
    return key.includes("scientific research excellence") && key.includes("taiz university");
  });
  return exists ? rows : [...rows, award];
}

function isHonorRecord(row) {
  const key = normalizedKey([row?.title, row?.category, row?.description].filter(Boolean).join(" "));
  if (key.includes("conference participation") || key.includes("certificate of attendance")) return false;
  if (key.includes("academic transcript") || key.includes("language instruction") || key.includes("medium of instruction")) return false;
  return true;
}

async function renderAwards() {
  const root = $("#awardsList");
  if (!root) return;
  const data = await loadData();
  let rows = uniqueRows(
    mergeTaizResearchExcellenceAward((data.awards || []).filter(approvedRow).filter(isHonorRecord)),
    row => row.asset_id || normalizedKey(row.title)
  );
  if (!rows.length) return renderError(root);
  rows = [...rows].sort((a, b) => Number(asBool(b.featured)) - Number(asBool(a.featured)) || (Number(b.year) || 0) - (Number(a.year) || 0));
  root.className = "asset-gallery-grid portfolio-gallery-grid";
  root.innerHTML = rows.map(award => portfolioMediaCard(data, award, {
    collection: "awards", title: award.title, institution: award.issuer || "",
    description: award.description || "", year: award.year || "",
    categoryLabel: prettyCategory(award.category || "Honor"), fallbackCategory: "Honor",
    extraClass: asBool(award.featured) ? "portfolio-media-card--featured" : ""
  })).join("");
  const summary = $("#awardsSummary");
  if (summary) summary.innerHTML = `<span><strong>${rows.length}</strong> honors & awards</span><span><strong>${rows.filter(row => asBool(row.featured)).length}</strong> featured distinctions</span>`;
  bindAssetButtons(data);
}

async function renderCredentials() {
  const root = $("#credentialsList");
  if (!root) return;
  const data = await loadData();
  const awardAssetIds = new Set((data.awards || []).map(row => row.asset_id).filter(Boolean));
  const awardTitles = new Set((data.awards || []).map(row => normalizedKey(row.title)).filter(Boolean));
  let rows = (data.credentials || []).filter(approvedRow).filter(row => !awardAssetIds.has(row.asset_id) && !awardTitles.has(normalizedKey(row.title)));
  rows = uniqueRows(rows, row => row.asset_id || normalizedKey(row.title));
  if (!rows.length) return renderError(root);

  root.className = "asset-gallery-grid portfolio-gallery-grid";
  root.innerHTML = rows.map(credential => portfolioMediaCard(data, credential, {
    collection: "credentials",
    title: credential.title,
    institution: credential.issuer || "",
    description: credential.description || "",
    year: credential.year || "",
    categoryLabel: prettyCategory(credential.category || "Credential"),
    dataCategory: credential.category || "other",
    fallbackCategory: "Credential",
    filterable: true
  })).join("");

  bindAssetButtons(data);
  initFilters();
}

async function renderRecommendations() {
  const root = $("#recommendationsList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows((data.recommendations || []).filter(approvedRow), row => row.$id || normalizedKey(row.slug || row.title));
  if (!rows.length) return renderError(root);

  const groups = new Map();
  rows.forEach(row => {
    const publicModel = recordAssets(data, row, "recommendations").find(item => item?.display_file_ids?.length) || null;
    const key = publicModel ? `asset:${publicModel.$id}` : `row:${row.$id || normalizedKey(row.title)}`;
    if (!groups.has(key)) groups.set(key, { rows: [], model: publicModel });
    groups.get(key).rows.push(row);
  });

  const cardForGroup = group => {
    const first = group.rows[0];
    const recommenders = [...new Set(group.rows.map(row => row.recommender_name || row.title).filter(Boolean))];
    const institutions = [...new Set(group.rows.map(row => row.institution).filter(Boolean))];
    const titles = [...new Set(group.rows.map(row => row.recommender_title).filter(Boolean))];
    const focus = [...new Set(group.rows.flatMap(row => asArray(row.focus_areas)).filter(Boolean))];
    const summaries = [...new Set(group.rows.map(row => row.summary || row.relationship_context).filter(Boolean))];
    const multi = group.rows.length > 1;
    const title = multi ? "Academic & Technical Recommendations" : (recommenders[0] || first.title || "Recommendation");
    const institution = multi ? [`${group.rows.length} recommendation letters`, ...institutions].filter(Boolean).join(" · ") : [titles[0], institutions[0]].filter(Boolean).join(" · ");
    const details = [];
    if (multi && recommenders.length) details.push(`Recommenders: ${recommenders.join(", ")}.`);
    if (summaries.length) details.push(summaries.join(" "));
    if (focus.length) details.push(`Focus: ${focus.join(", ")}`);
    return portfolioMediaCard(data, first, {
      collection: "recommendations", title, institution, description: details.join(" "),
      categoryLabel: "Recommendation", fallbackCategory: "Recommendation",
      placeholderKind: "LETTER", placeholderTitle: "Recommendation letter",
      placeholderText: "Supporting file not currently available"
    });
  };

  const allGroups = [...groups.values()];
  const research = allGroups.filter(group => {
    const key = normalizedKey(group.rows.map(r => [r.title, r.summary, ...(asArray(r.focus_areas))].join(" ")).join(" "));
    return key.includes("research") || key.includes("energy systems") || key.includes("robotics") || key.includes("cybersecurity") || key.includes("trustworthy ai");
  });
  const researchKeys = new Set(research);
  const academic = allGroups.filter(group => !researchKeys.has(group));

  root.className = "recommendation-sections";
  root.innerHTML = [
    research.length ? `<section class="recommendation-group"><div class="section-title-row"><div><p class="section-label">Research References</p><h3>Research Recommendations</h3></div></div><div class="asset-gallery-grid portfolio-gallery-grid">${research.map(cardForGroup).join("")}</div></section>` : "",
    academic.length ? `<section class="recommendation-group"><div class="section-title-row"><div><p class="section-label">Academic References</p><h3>Academic & Technical Recommendations</h3></div></div><div class="asset-gallery-grid portfolio-gallery-grid">${academic.map(cardForGroup).join("")}</div></section>` : ""
  ].join("");
  bindAssetButtons(data);
}
async function renderExperiences() {
  const root = $("#experienceList");
  if (!root) return;
  const data = await loadData();
  const appwriteRows = uniqueRows((data.experiences || []).filter(approvedRow), row => normalizedKey(row.slug || row.title));

  const alHasabExperience = {
    $id: "site:technical-industrial-institute-al-hasab",
    slug: "technical-industrial-institute-al-hasab",
    title: "Industrial Training Assistant — Industrial Control Systems",
    organization: "Technical Industrial Institute – Al-Hasab",
    location: "Taiz, Yemen",
    period_label: "2018–2019 · 6 months",
    current: false,
    experience_type: "Part-time",
    summary: "Practical training support in industrial control systems and electronics.",
    responsibilities: [
      "Assisted in practical training activities related to industrial control systems and electronics.",
      "Supported hands-on instruction in control circuits, electronic components, panel-level practice, and troubleshooting.",
      "Contributed to vocational laboratory sessions and applied industrial-control training."
    ],
    tags: ["Industrial Control", "Electronics", "Technical Training"],
    visibility: "public",
    sort_order: 99,
    _collection: "experiences"
  };

  const hasAlHasab = appwriteRows.some(row => {
    const key = normalizedKey([row.title, row.organization, row.location].filter(Boolean).join(" "));
    return key.includes("al hasab") || key.includes("technical industrial institute");
  });
  const rows = hasAlHasab ? appwriteRows : [...appwriteRows, alHasabExperience];

  if (!rows.length) return renderError(root);
  root.innerHTML = rows.map(experience => {
    const responsibilities = asArray(experience.responsibilities);
    const tags = asArray(experience.tags);
    const assets = recordAssets(data, experience, "experiences");
    return `<article class="timeline-record"><div class="record-date">${escapeHTML(formatExperienceRange(experience))}</div><div class="record-body"><p class="record-type">${escapeHTML(prettyCategory(experience.experience_type || "Experience"))}</p><h3>${escapeHTML(experience.title)}</h3><p class="institution">${escapeHTML(experience.organization || "")}${experience.location ? ` · ${escapeHTML(experience.location)}` : ""}</p>${experience.summary ? `<p class="record-summary">${escapeHTML(experience.summary)}</p>` : ""}${responsibilities.length ? `<ul class="record-bullets">${responsibilities.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : ""}${tags.length ? `<div class="project-tags">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>` : ""}${inlineAssetStrip(data, assets, { description: experience.summary || "" }, { compact: true, max: 3 })}</div></article>`;
  }).join("");
  bindAssetButtons(data);
}

function curatedInstitutionalDescription(row) {
  if (row.description) return row.description;
  const key = normalizedKey(row.title || "");
  if (key.includes("scientific research") && key.includes("academic writing")) return "Institutional documentation of a structured scientific-research and academic-writing training program covering research fundamentals, topic selection, literature work, citation practice, research questions, and conference-oriented academic preparation.";
  if (key.includes("accepted") && key.includes("esmart")) return "Institutional documentation of student research mentorship connected to conference-oriented academic work and accepted student-involved research papers.";
  if (key.includes("ieee xplore") || (key.includes("publication") && key.includes("esmart"))) return "Institutional documentation of student-involved research progressing to peer-reviewed conference publication and IEEE Xplore indexing.";
  if (key.includes("al amal") || key.includes("cancer center")) return "Institutional documentation of a student research-exposure activity focused on scientific data, information collection, applied research tools, and AI-oriented early-detection research themes.";
  if (key.includes("optimization") && key.includes("electronics")) return "Institutional documentation of applied electronics and optimization-oriented technical training, linking electronics fundamentals with practical STEM and computational problem solving.";
  if (key.includes("physics teachers") || (key.includes("teacher") && key.includes("electronics"))) return "Institutional documentation of professional-development training for physics teachers covering applied electronics, measurement, components, rectification, and practical circuit construction.";
  return `This institutional record independently documents ${row.title || "the listed academic or professional activity"}${row.institution ? ` through ${row.institution}` : ""}.`;
}

async function renderInstitutionalEvidence() {
  const root = $("#institutionalEvidenceList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows((data.institutionalEvidence || []).filter(approvedRow), row => row.source_url || normalizedKey(row.title));
  if (!rows.length) return renderError(root, "No institutional source records are currently available.");
  root.innerHTML = rows.map((row, index) => {
    const assets = recordAssets(data, row, "institutionalEvidence");
    const description = curatedInstitutionalDescription(row);
    const date = row.event_date && row.event_date !== "null" ? formatDate(row.event_date, { year: "numeric", month: "long", day: "numeric" }) : "";
    return `<article class="institutional-record"><div class="institutional-record-number">${String(index + 1).padStart(2, "0")}</div><div class="institutional-record-main"><div class="institutional-meta"><span>${escapeHTML(prettyCategory(row.evidence_type || "Institutional evidence"))}</span>${date ? `<time>${escapeHTML(date)}</time>` : ""}</div><h3>${escapeHTML(row.title)}</h3>${row.institution ? `<p class="institution">${escapeHTML(row.institution)}</p>` : ""}<p class="institutional-description">${escapeHTML(description)}</p>${inlineAssetStrip(data, assets, { title: row.title, description, date }, { compact: true, max: 2 })}${row.source_url ? `<div class="institutional-source"><a href="${escapeAttr(row.source_url)}" target="_blank" rel="noopener">Institutional Source ↗</a></div>` : ""}</div></article>`;
  }).join("");
  bindAssetButtons(data);
}

async function renderDocuments() {
  const root = $("#documentsList");
  if (!root) return;
  const data = await loadData();
  const used = data.referencedAssetIds || referencedAssetIds(data);
  const models = (data.assets || []).map(asset => displayModelForAsset(data, asset)).filter(Boolean).filter(model => !used.has(model.$id));
  if (!models.length) {
    root.innerHTML = "";
    return;
  }
  root.innerHTML = `<div class="asset-gallery-grid asset-gallery-grid--documents">${models.map(model => assetWindowCard(model, { description: model.description || "" }, { compact: true })).join("")}</div>`;
  bindAssetButtons(data);
}


function githubMediaPath(category, fileName) {
  const folder = String(category || "").replaceAll("_", "-");
  return `/media/assets/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`;
}

function githubMediaVisual(category, item) {
  const source = githubMediaPath(category, item.file);
  const title = item.title || item.file;
  return item.type === "video"
    ? `<video controls preload="none" playsinline${item.poster ? ` poster="${escapeAttr(githubMediaPath(category, item.poster))}"` : ""} aria-label="${escapeAttr(title)}"><source src="${escapeAttr(source)}" type="video/mp4">Your browser does not support embedded video.</video>`
    : item.type === "pdf"
      ? item.preview
        ? `<button type="button" class="github-pdf-preview-button" data-github-pdf="${escapeAttr(item.file)}" data-github-pdf-category="${escapeAttr(category)}" data-github-pdf-title="${escapeAttr(title)}" aria-label="Open ${escapeAttr(title)} presentation"><img src="${escapeAttr(githubMediaPath(category, item.preview))}" alt="First page preview of ${escapeAttr(title)}" loading="lazy" decoding="async"><span class="github-pdf-preview-overlay"><span class="file-kind">PDF</span><strong>View full presentation →</strong></span></button>`
        : `<div class="asset-file-panel presentation-panel"><span class="file-kind">PDF</span><strong>Presentation PDF</strong><button type="button" class="text-button" data-github-pdf="${escapeAttr(item.file)}" data-github-pdf-category="${escapeAttr(category)}" data-github-pdf-title="${escapeAttr(title)}">View presentation →</button></div>`
      : `<img src="${escapeAttr(source)}" alt="${escapeAttr(title)}" loading="lazy" decoding="async">`;
}

function githubMediaCard(category, item) {
  const title = item.title || item.file;
  const description = item.description || "";
  const type = item.type === "video" ? "Video" : item.type === "pdf" ? "Presentation / PDF" : "Image";
  const visual = githubMediaVisual(category, item);

  return `<figure class="asset-evidence-card github-media-card">
    <div class="asset-window asset-window--${escapeAttr(item.type || "image")}">${visual}</div>
    <figcaption class="asset-caption">
      <div class="asset-caption-head"><span>${type}</span></div>
      <h4>${escapeHTML(title)}</h4>
      ${description ? `<p>${escapeHTML(description)}</p>` : ""}
    </figcaption>
  </figure>`;
}

function openGithubPdf(category, fileName, title, trigger = null) {
  const modal = ensureModal();
  const body = $("#mediaModalBody", modal);
  const heading = $("#mediaModalTitle", modal);
  const source = githubMediaPath(category, fileName);
  const viewerSource = `${source}#toolbar=0&navpanes=0&view=FitH`;

  modalState = { models: [], itemIndex: 0, pageIndex: 0, trigger };
  heading.textContent = title || "Presentation PDF";
  body.innerHTML = `<div class="asset-preview-full github-pdf-preview"><iframe src="${escapeAttr(viewerSource)}" title="${escapeAttr(title || "PDF presentation")}" loading="lazy"></iframe></div>`;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => $(".modal-close", modal)?.focus(), 0);
}

function bindGithubPdfButtons() {
  $("[data-github-pdf]").forEach(button => {
    if (button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    button.addEventListener("click", () => openGithubPdf(
      button.dataset.githubPdfCategory,
      button.dataset.githubPdf,
      button.dataset.githubPdfTitle,
      button
    ));
  });
}

function contextualMediaSection(key, heading = "") {
  const items = GITHUB_MEDIA[key] || [];
  if (!items.length) return "";
  const meta = MEDIA_META[key] || { title: heading || prettyCategory(key), description: "" };
  return `<details class="context-media-group"><summary><span><strong>${escapeHTML(heading || meta.title)}</strong><small>${escapeHTML(meta.description)}</small></span><b>${items.length} items</b></summary><div class="asset-gallery-grid context-media-grid">${items.map(item => githubMediaCard(key, item)).join("")}</div></details>`;
}

function renderContextMedia() {
  const teachingRoot = $("#teachingMediaPortfolio");
  if (teachingRoot) {
    teachingRoot.innerHTML = [
      contextualMediaSection("student_videos_and_conference_presentations", "Research Mentorship Presentations"),
      contextualMediaSection("student_teaching_and_practical_training_activities", "Teaching & Practical Laboratory Activities"),
      contextualMediaSection("teacher_training_and_professional_development_programs", "Teacher Professional Development"),
      contextualMediaSection("3d_printing_and_stem_laboratory_activities", "3D Printing & STEM Learning Activities")
    ].join("");
  }
  const experienceRoot = $("#experienceMediaPortfolio");
  if (experienceRoot) experienceRoot.innerHTML = contextualMediaSection("technical_maintenance_and_troubleshooting_work", "Technical Maintenance & Troubleshooting Evidence");
  bindGithubPdfButtons();
}

async function renderMedia() {
  const root = $("#mediaLibrary");
  if (!root) return;
  const researchCount = (GITHUB_MEDIA.student_videos_and_conference_presentations || []).length;
  const teachingCount = (GITHUB_MEDIA.student_teaching_and_practical_training_activities || []).length + (GITHUB_MEDIA.teacher_training_and_professional_development_programs || []).length + (GITHUB_MEDIA["3d_printing_and_stem_laboratory_activities"] || []).length;
  const technicalCount = (GITHUB_MEDIA.technical_maintenance_and_troubleshooting_work || []).length;
  const engineeringCount = PROJECT_HARDWARE_MEDIA.length;
  const cards = [
    {label:"Engineering & Prototyping",count:engineeringCount,title:"Research & Engineering Projects",text:"Embedded hardware, electronics, prototyping, Original Prusa MK4S assembly, digital fabrication, and engineering project evidence.",href:"/projects/"},
    {label:"Teaching Portfolio",count:teachingCount,title:"Teaching & Mentorship",text:"Physics/STEM instruction, practical electronics, laboratory work, teacher development, 3D-printing activities, and student technical training.",href:"/teaching/"},
    {label:"Research Communication",count:researchCount,title:"Publications & Research Mentorship",text:"Conference presentations and research-oriented student work connected to publication and mentorship activities.",href:"/teaching/#teaching-media"},
    {label:"Technical Practice",count:technicalCount,title:"Professional Experience",text:"Documented maintenance, diagnostics, troubleshooting, computer hardware, printers, electronic boards, and system verification.",href:"/experience/#experience-media"}
  ];
  root.innerHTML = `<div class="portfolio-highlight-grid">${cards.map(card => `<article class="portfolio-highlight-card"><div class="portfolio-highlight-meta"><span>${escapeHTML(card.label)}</span><strong>${card.count}</strong></div><h3>${escapeHTML(card.title)}</h3><p>${escapeHTML(card.text)}</p><a class="text-link" href="${escapeAttr(card.href)}">Explore evidence in context →</a></article>`).join("")}</div><p class="portfolio-highlight-note">Media are presented in the section where they provide the strongest academic or professional context, avoiding duplicate galleries across the site.</p>`;
}

async function renderHome() {
  if (!$("#homeFeaturedPublications") && !$("#metricPublications")) return;
  const data = await loadData();
  const publications = uniqueRows((data.publications || []).filter(row => approvedRow(row) && row.status === "published"), row => normalizedKey(row.doi_url || row.title));
  const projects = uniqueRows((data.projects || []).filter(approvedRow), row => normalizedKey(row.slug || row.title));
  const awards = uniqueRows(mergeTaizResearchExcellenceAward((data.awards || []).filter(approvedRow)), row => row.asset_id || normalizedKey(row.title));
  const metricPublications = $("#metricPublications");
  if (metricPublications) metricPublications.textContent = publications.length || 8;
  const publicationRoot = $("#homeFeaturedPublications");
  if (publicationRoot) {
    const featured = (publications.filter(row => asBool(row.featured)).length ? publications.filter(row => asBool(row.featured)) : publications).slice(0, 3);
    publicationRoot.innerHTML = featured.map(row => `<article class="featured-card"><p class="record-type">${escapeHTML(row.year || "Published")}</p><h4>${escapeHTML(row.title)}</h4><p>${escapeHTML(row.summary || row.venue || "")}</p><a class="text-link" href="/publications/">View publication →</a></article>`).join("");
  }
  const projectRoot = $("#homeFeaturedProjects");
  if (projectRoot) {
    const featured = (projects.filter(row => asBool(row.featured)).length ? projects.filter(row => asBool(row.featured)) : projects).slice(0, 3);
    projectRoot.innerHTML = featured.map(row => `<article class="featured-card"><p class="record-type">${escapeHTML(prettyCategory(row.category || "Project"))}</p><h4>${escapeHTML(row.title)}</h4><p>${escapeHTML(row.short_description || row.overview || "")}</p><a class="text-link" href="/projects/">View project →</a></article>`).join("");
  }
  const awardRoot = $("#homeFeaturedAwards");
  if (awardRoot) {
    const featured = (awards.filter(row => asBool(row.featured)).length ? awards.filter(row => asBool(row.featured)) : awards).slice(0, 3);
    awardRoot.innerHTML = featured.map(row => `<article class="featured-card recognition-card"><p class="record-type">${escapeHTML(row.year || "")}</p><h4>${escapeHTML(row.title)}</h4><p>${escapeHTML(row.issuer || "")}</p><a class="text-link" href="/awards/">View recognition →</a></article>`).join("");
  }
}

function initNavigation() {
  const currentPath = location.pathname.replace(/\/+$/, "/") || "/";
  $$(".side-nav a").forEach(link => {
    const href = new URL(link.href, location.origin).pathname.replace(/\/+$/, "/") || "/";
    const active = href === "/" ? currentPath === "/" : currentPath.startsWith(href);
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
    if (href === "/institutional-evidence/") link.textContent = "Verification & Documents";
    if (href === "/media/") link.textContent = "Portfolio Highlights";
    if (href === "/awards/") link.textContent = "Honors & Awards";
    if (href === "/credentials/") link.textContent = "Certifications & Training";
    if (href === "/recommendations/") link.textContent = "Recommendations & References";
  });
  const menuToggle = $("#menuToggle");
  const sidebar = $("#sidebar");
  const backdrop = $("#sidebarBackdrop");
  if (!menuToggle || !sidebar) return;
  const close = () => { document.body.classList.remove("sidebar-open"); menuToggle.setAttribute("aria-expanded", "false"); if (backdrop) backdrop.hidden = true; };
  const open = () => { document.body.classList.add("sidebar-open"); menuToggle.setAttribute("aria-expanded", "true"); if (backdrop) backdrop.hidden = false; };
  menuToggle.addEventListener("click", () => document.body.classList.contains("sidebar-open") ? close() : open());
  backdrop?.addEventListener("click", close);
  $$(".side-nav a", sidebar).forEach(link => link.addEventListener("click", close));
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  $$("[data-theme-toggle],#themeToggle").forEach(button => {
    const icon = button.querySelector("span:first-child");
    if (icon) icon.textContent = theme === "dark" ? "☀" : "◐"; else button.textContent = theme === "dark" ? "☀" : "◐";
  });
}

function initTheme() {
  const stored = localStorage.getItem("theme");
  const preferred = window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  setTheme(stored || preferred);
  $$("[data-theme-toggle],#themeToggle").forEach(button => {
    if (button.dataset.themeBound === "1") return;
    button.dataset.themeBound = "1";
    button.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
  });
}

function initYear() { $$("#year").forEach(node => { node.textContent = new Date().getFullYear(); }); }
function initReveal() {
  const elements = $$(".reveal");
  if (!("IntersectionObserver" in window)) return elements.forEach(element => element.classList.add("visible"));
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: 0 });
  elements.forEach(element => observer.observe(element));
}
function initScrollUI() {
  const bar = $("#scrollProgress");
  const backToTop = $("#backToTop");
  const update = () => {
    const y = window.scrollY || 0;
    const height = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = `${height > 0 ? (y / height) * 100 : 0}%`;
    if (backToTop) backToTop.classList.toggle("show", y > 600);
  };
  addEventListener("scroll", update, { passive: true });
  update();
  backToTop?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}
function initCopyEmail() {
  const button = $("#copyEmail");
  if (!button) return;
  button.addEventListener("click", async () => {
    const email = button.dataset.email || SITE.email;
    try { await navigator.clipboard.writeText(email); } catch {}
  });
}
function initCvAvailability() {
  $$(".cv-link").forEach(async link => {
    try { const response = await fetch(link.getAttribute("href"), { method: "HEAD" }); if (!response.ok) link.classList.add("unavailable"); } catch {}
  });
}
function initFilters() {
  $$(".filter-toolbar").forEach(toolbar => {
    if (toolbar.dataset.bound === "1") return;
    toolbar.dataset.bound = "1";
    const target = document.getElementById(toolbar.dataset.filterTarget);
    if (!target) return;
    toolbar.addEventListener("click", event => {
      const button = event.target.closest(".filter-btn");
      if (!button) return;
      $$(".filter-btn", toolbar).forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      $$(".filter-item", target).forEach(item => {
        const categories = (item.dataset.category || "").split(/\s+/);
        item.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
      });
    });
  });
}
function improvePageHeader() {
  const header = $(".page-header");
  if (!header || header.dataset.enhanced === "1") return;
  header.dataset.enhanced = "1";
  const title = $("h2", header);
  if (!title) return;
  const rule = document.createElement("div");
  rule.className = "page-header-rule";
  title.insertAdjacentElement("afterend", rule);
}
function updateEducationLinks() { $$("a[href^='/achievements/']").forEach(link => link.setAttribute("href", "/awards/")); }
function normalizeSchoolNameInDOM() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => { node.nodeValue = node.nodeValue.replace(/Al-Shaheeda\s+(?:Na['’]mah|Ne’mah)\s+Rassam\s+School/g, "Al-Shaheeda Ne'mah Rassam School"); });
}

function absorbGraduationProjectDuplicate() {
  const list = $("#projectsList");
  const target = $("#graduationProjectActions");
  if (!list || !target) return;
  const absorb = () => {
    const match = $$(".project-record", list).find(record => (record.querySelector("h3")?.textContent || "").toLowerCase().includes("manipulator robot error correction using computer vision"));
    if (!match) return false;
    $$(".record-asset-gallery,.private-evidence-note", match).forEach(gallery => target.appendChild(gallery));
    match.remove();
    $$(".project-index", list).forEach((element, index) => { element.textContent = String(index + 1).padStart(2, "0"); });
    return true;
  };
  if (!absorb()) {
    const observer = new MutationObserver(() => { if (absorb()) observer.disconnect(); });
    observer.observe(list, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  }
}

async function runDynamicRenderers() {
  const jobs = [renderHome(), renderPublications(), renderProjects(), renderAwards(), renderCredentials(), renderExperiences(), renderRecommendations(), renderInstitutionalEvidence(), renderDocuments(), renderMedia()];
  renderProjectHardware();
  renderContextMedia();
  await Promise.allSettled(jobs);
  bindRenderingImageFallbacks();
  initFilters();
  absorbGraduationProjectDuplicate();
  normalizeSchoolNameInDOM();
}

document.addEventListener("DOMContentLoaded", () => {
  injectRenderingStyles();
  initNavigation();
  initTheme();
  initRenderingImageFallbacks();initYear();
  initReveal();
  initScrollUI();
  initCopyEmail();
  initCvAvailability();
  initModalKeyboard();
  improvePageHeader();
  updateEducationLinks();
  normalizeSchoolNameInDOM();
  runDynamicRenderers();
});
