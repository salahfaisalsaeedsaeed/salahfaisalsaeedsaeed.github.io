const SITE = {
  email: "salahfaisal589@gmail.com",
  scholar: "https://scholar.google.com/citations?hl=ar&user=kV3STigAAAAJ",
  orcid: "https://orcid.org/0009-0000-9485-7467",
  linkedin: "https://www.linkedin.com/in/eng-salah-faisal-saeed-saeed-naser-925a1b2a3"
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
    title: "Student Videos and Conference Presentations",
    description: "Student research communication, conference presentations, and selected videos documenting publication-oriented academic work."
  },
  student_teaching_and_practical_training_activities: {
    title: "Student Teaching and Practical Training Activities",
    description: "Selected evidence of practical instruction in electronics, circuits, simulation software, laboratory work, and student-led technical explanation."
  },
  teacher_training_and_professional_development_programs: {
    title: "Teacher Training and Professional Development Programs",
    description: "Selected evidence from professional-development activities delivered for physics teachers and other education-focused technical training."
  },
  "3d_printing_and_stem_laboratory_activities": {
    title: "3D Printing and STEM Laboratory Activities",
    description: "3D printing, prototyping, STEM laboratory practice, and selected engineering activities connected to robotics and applied technical education."
  },
  technical_maintenance_and_troubleshooting_work: {
    title: "Technical Maintenance and Troubleshooting Work",
    description: "Selected practical work in electronic maintenance, diagnostic testing, troubleshooting, repair, measurement, and technical inspection."
  },
  graduation_highlights: {
    title: "Graduation Highlights",
    description: "A restrained selection of graduation-related visual records included for academic context."
  }
};


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
  const url = new URL(`${APPWRITE.endpoint}/tablesdb/${APPWRITE.databaseId}/tables/${tableId}/rows`);
  url.searchParams.append("queries[]", queryString("limit", [limit]));
  url.searchParams.set("total", "false");
  const response = await fetch(url, {
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
  return `${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files/${encodeURIComponent(fileId)}/view?project=${encodeURIComponent(APPWRITE.projectId)}`;
}

let DATA_PROMISE;
function loadData() {
  if (DATA_PROMISE) return DATA_PROMISE;
  DATA_PROMISE = (async () => {
    const entries = Object.entries(APPWRITE.tables);
    const results = await Promise.allSettled(entries.map(([, tableId]) => fetchRows(tableId)));
    const data = { errors: [] };

    results.forEach((result, index) => {
      const [key] = entries[index];
      if (result.status === "fulfilled") {
        data[key] = sortRows((result.value || []).filter(publicRow));
      } else {
        data[key] = [];
        data.errors.push(`${key}: ${result.reason?.message || "unavailable"}`);
      }
    });

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
  return displayModelForAsset(data, publicAsset(data, id));
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

function recordAssets(data, row) {
  return uniqueRows(assetIdsFromRecord(row).map(id => {
    const model = modelForId(data, id);
    return model || { $id: `private:${id}`, _privateEvidence: true };
  }), item => item.$id);
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

function renderingPreviewMarkup(model, context = {}, pageIndex = 0) {
  const source = renderingFileUrl(model, pageIndex);
  const title = context.title || model?.title || "Supporting evidence";
  if (!source) return `<div class="asset-unavailable"><span>Preview</span><strong>${escapeHTML(title)}</strong><small>Public rendering unavailable</small></div>`;
  if (String(model.render_type || "").toLowerCase().includes("video") || String(model.media_type || "").toLowerCase() === "video") {
    return `<video controls preload="metadata" playsinline aria-label="${escapeAttr(title)}"><source src="${escapeAttr(source)}"></video>`;
  }
  return `<img src="${escapeAttr(source)}" alt="${escapeAttr(model.alt_text || title)}" loading="lazy" decoding="async">`;
}

function assetWindowCard(model, context = {}, options = {}) {
  if (!model?.display_file_ids?.length) return "";
  const title = context.title || model.title || "Supporting evidence";
  const description = context.description || context.caption || context.summary || model.description || "Verified supporting evidence linked to this academic or professional record.";
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
      ? `<div class="private-evidence-note" role="note">Supporting document retained privately for privacy.</div>`
      : "";
  }
  const max = options.max || models.length;
  return `<div class="record-asset-gallery${options.compact ? " record-asset-gallery--compact" : ""}">${models.slice(0, max).map(model => assetWindowCard(model, context, { compact: options.compact })).join("")}</div>`;
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
      const model = modelForId(data, button.dataset.displayAsset);
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
  const start = safeDate(row.start_date);
  const end = safeDate(row.end_date);
  const startLabel = start ? start.toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "";
  const endLabel = asBool(row.current) ? "Present" : end ? end.toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "";
  return [startLabel, endLabel].filter(Boolean).join(" – ");
}

function renderError(root, message = "Live academic data is temporarily unavailable. Please refresh shortly.") {
  if (!root) return;
  root.innerHTML = `<div class="empty-state"><h3>Data temporarily unavailable</h3><p>${escapeHTML(message)}</p></div>`;
}

function highlightSelf(authors = "") {
  const escaped = escapeHTML(authors);
  return escaped.replace(/Salah F\. S\. Saeed|Salah F\. S\. Nasser|Salah Faisal Saeed Saeed|S\. F\. S\. Saeed|S\. F\. S\. Nasser/g, '<strong class="author-self">$&</strong>');
}

async function renderPublications() {
  const root = $("#publicationsList");
  if (!root) return;
  const data = await loadData();
  let rows = uniqueRows((data.publications || []).filter(approvedRow), row => normalizedKey(row.doi_url || row.title));
  if (!rows.length) return renderError(root);
  rows = [...rows].sort((a, b) => {
    const ap = a.status === "published" ? 0 : 1;
    const bp = b.status === "published" ? 0 : 1;
    return ap - bp || (Number(b.year) || 0) - (Number(a.year) || 0) || (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0);
  });
  root.innerHTML = rows.map((publication, index) => {
    const category = publication.status === "published" ? "published" : "in_preparation";
    const assets = recordAssets(data, publication);
    const isAward = /trust-by-design/i.test(publication.title || "");
    return `<article class="publication-record filter-item" data-category="${category}"><div class="publication-index">${String(index + 1).padStart(2, "0")}</div><div class="publication-content"><div class="record-eyebrow"><span class="status-badge ${category === "published" ? "status-published" : "status-prep"}">${escapeHTML(publication.status === "published" ? "Published" : prettyCategory(publication.status || "In preparation"))}</span>${isAward ? '<span class="status-badge award-badge">Best Paper Award</span>' : ""}<span class="publication-year">${escapeHTML(publication.year || "")}</span></div><h3>${escapeHTML(publication.title)}</h3><p class="pub-authors">${highlightSelf(publication.authors || "")}</p><p class="pub-venue">${escapeHTML(publication.venue || "")}</p>${publication.summary ? `<p class="record-summary">${escapeHTML(publication.summary)}</p>` : ""}${publication.doi_url ? `<div class="record-actions"><a class="text-link" href="${escapeAttr(publication.doi_url)}" target="_blank" rel="noopener">DOI / Publisher ↗</a></div>` : ""}${inlineAssetStrip(data, assets, { description: publication.summary || "Publication file linked to this bibliographic record." }, { compact: true, max: 2 })}</div></article>`;
  }).join("");
  const published = rows.filter(row => row.status === "published").length;
  const summary = $("#publicationsSummary");
  if (summary) summary.innerHTML = `<span><strong>${published}</strong> published</span><span><strong>${rows.length - published}</strong> current works</span><span><strong>${rows.length}</strong> public records</span>`;
  bindAssetButtons(data);
  initFilters();
}

async function renderProjects() {
  const root = $("#projectsList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows((data.projects || []).filter(approvedRow), row => normalizedKey(row.slug || row.title));
  if (!rows.length) return renderError(root);
  root.innerHTML = rows.map((project, index) => {
    const assets = recordAssets(data, project);
    const technologies = asArray(project.technologies);
    const tags = technologies.length ? technologies : [prettyCategory(project.category || "Project")];
    return `<article class="project-record filter-item" id="${escapeAttr(project.slug || "")}" data-category="${escapeAttr(project.category || "other")}"><div class="project-index">${String(index + 1).padStart(2, "0")}</div><div class="project-main"><div class="project-top"><div><p class="record-type">${escapeHTML(prettyCategory(project.status || "Project"))}</p><h3>${escapeHTML(project.title)}</h3></div>${project.year ? `<time>${escapeHTML(project.year)}</time>` : ""}</div><p class="project-summary">${escapeHTML(project.short_description || project.overview || "")}</p><div class="project-tags">${tags.filter(Boolean).slice(0, 7).map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>${inlineAssetStrip(data, assets, { description: project.short_description || project.overview || "Supporting project evidence." }, { compact: true, max: 3 })}<details class="project-details"><summary>Project details</summary><dl>${project.role ? `<div><dt>Role</dt><dd>${escapeHTML(project.role)}</dd></div>` : ""}${project.objectives ? `<div><dt>Objectives</dt><dd>${escapeHTML(project.objectives)}</dd></div>` : ""}${project.methodology ? `<div><dt>Methodology</dt><dd>${escapeHTML(project.methodology)}</dd></div>` : ""}${project.results ? `<div><dt>Results / status</dt><dd>${escapeHTML(project.results)}</dd></div>` : ""}</dl></details></div></article>`;
  }).join("");
  bindAssetButtons(data);
  initFilters();
}

async function renderAwards() {
  const root = $("#awardsList");
  if (!root) return;
  const data = await loadData();
  let rows = uniqueRows((data.awards || []).filter(approvedRow), row => row.asset_id || normalizedKey(row.title));
  if (!rows.length) return renderError(root);
  rows = [...rows].sort((a, b) => Number(asBool(b.featured)) - Number(asBool(a.featured)) || (Number(b.year) || 0) - (Number(a.year) || 0));
  root.innerHTML = rows.map(award => {
    const assets = recordAssets(data, award);
    const major = /best paper|distinction|rank|national/i.test(award.title || "") || asBool(award.featured);
    return `<article class="achievement-record ${major ? "major-recognition" : ""}"><div class="achievement-date"><time>${escapeHTML(award.year || "")}</time><span>${escapeHTML(prettyCategory(award.category || "Recognition"))}</span></div><div class="achievement-main"><h3>${escapeHTML(award.title)}</h3><p class="institution">${escapeHTML(award.issuer || "")}</p>${award.description ? `<p>${escapeHTML(award.description)}</p>` : ""}${inlineAssetStrip(data, assets, { description: award.description || "Verified supporting evidence for this recognition." }, { compact: true, max: 2 })}</div></article>`;
  }).join("");
  const summary = $("#awardsSummary");
  if (summary) summary.innerHTML = `<span><strong>${rows.length}</strong> verified recognitions</span><span><strong>${rows.filter(row => asBool(row.featured)).length}</strong> featured distinctions</span>`;
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
  root.innerHTML = rows.map(credential => {
    const assets = recordAssets(data, credential);
    return `<article class="credential-card filter-item" data-category="${escapeAttr(credential.category || "other")}"><div class="credential-meta"><span>${escapeHTML(credential.year || "")}</span><span>${escapeHTML(prettyCategory(credential.category || "Credential"))}</span></div><h3>${escapeHTML(credential.title)}</h3><p class="institution">${escapeHTML(credential.issuer || "")}</p>${credential.description ? `<p>${escapeHTML(credential.description)}</p>` : ""}${inlineAssetStrip(data, assets, { description: credential.description || "Credential evidence." }, { compact: true, max: 3 })}</article>`;
  }).join("");
  bindAssetButtons(data);
  initFilters();
}

async function renderExperiences() {
  const root = $("#experienceList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows((data.experiences || []).filter(approvedRow), row => normalizedKey(row.slug || row.title));
  if (!rows.length) return renderError(root);
  root.innerHTML = rows.map(experience => {
    const responsibilities = asArray(experience.responsibilities);
    const tags = asArray(experience.tags);
    const assets = recordAssets(data, experience);
    return `<article class="timeline-record"><div class="record-date">${escapeHTML(formatExperienceRange(experience))}</div><div class="record-body"><p class="record-type">${escapeHTML(prettyCategory(experience.experience_type || "Experience"))}</p><h3>${escapeHTML(experience.title)}</h3><p class="institution">${escapeHTML(experience.organization || "")}${experience.location ? ` · ${escapeHTML(experience.location)}` : ""}</p>${experience.summary ? `<p class="record-summary">${escapeHTML(experience.summary)}</p>` : ""}${responsibilities.length ? `<ul class="record-bullets">${responsibilities.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : ""}${tags.length ? `<div class="project-tags">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>` : ""}${inlineAssetStrip(data, assets, { description: experience.summary || "Supporting evidence for this professional experience." }, { compact: true, max: 3 })}</div></article>`;
  }).join("");
  bindAssetButtons(data);
}

async function renderRecommendations() {
  const root = $("#recommendationsList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows((data.recommendations || []).filter(approvedRow), row => normalizedKey(row.slug || row.title));
  if (!rows.length) return renderError(root);
  const groups = new Map();
  rows.forEach(row => {
    const key = row.asset_id || row.$id;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  });
  root.innerHTML = [...groups.values()].map(group => {
    const first = group[0];
    const assets = uniqueRows(group.flatMap(row => recordAssets(data, row)), item => item.$id);
    const multi = group.length > 1;
    return `<article class="recommendation-card ${multi ? "recommendation-group" : ""}"><div class="recommendation-head"><div><p class="record-type">${multi ? `${group.length} recommendations` : "Recommendation"}</p><h3>${escapeHTML(multi ? "Academic & Technical Recommendations" : first.title)}</h3></div>${first.issued_date && first.issued_date !== "null" ? `<time>${escapeHTML(formatDate(first.issued_date, { year: "numeric", month: "short", day: "numeric" }))}</time>` : ""}</div><div class="recommendation-entries">${group.map(row => `<div class="recommendation-entry"><h4>${escapeHTML(row.recommender_name || row.title)}</h4><p class="institution">${escapeHTML(row.recommender_title || "")}${row.institution ? ` · ${escapeHTML(row.institution)}` : ""}</p>${row.relationship_context ? `<p class="relationship-context">${escapeHTML(row.relationship_context)}</p>` : ""}${row.summary ? `<p>${escapeHTML(row.summary)}</p>` : ""}${asArray(row.focus_areas).length ? `<div class="project-tags">${asArray(row.focus_areas).map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>` : ""}</div>`).join("")}</div>${inlineAssetStrip(data, assets, { description: first.summary || "Recommendation document retained according to privacy settings." }, { compact: true, max: 2 })}</article>`;
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
  if (!rows.length) return renderError(root, "No public institutional evidence records are currently available.");
  root.innerHTML = rows.map((row, index) => {
    const assets = recordAssets(data, row);
    const description = curatedInstitutionalDescription(row);
    const date = row.event_date && row.event_date !== "null" ? formatDate(row.event_date, { year: "numeric", month: "long", day: "numeric" }) : "";
    return `<article class="institutional-record"><div class="institutional-record-number">${String(index + 1).padStart(2, "0")}</div><div class="institutional-record-main"><div class="institutional-meta"><span>${escapeHTML(prettyCategory(row.evidence_type || "Institutional evidence"))}</span>${date ? `<time>${escapeHTML(date)}</time>` : ""}</div><h3>${escapeHTML(row.title)}</h3>${row.institution ? `<p class="institution">${escapeHTML(row.institution)}</p>` : ""}<p class="institutional-description">${escapeHTML(description)}</p>${inlineAssetStrip(data, assets, { title: row.title, description, date }, { compact: true, max: 2 })}${row.source_url ? `<div class="institutional-source"><span>Original institutional source</span><a href="${escapeAttr(row.source_url)}" target="_blank" rel="noopener">Open the original post ↗</a></div>` : ""}</div></article>`;
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
    root.innerHTML = `<div class="empty-state compact-empty"><h3>No duplicated document archive</h3><p>Public evidence is displayed inside the academic or professional record it supports. Private documents remain protected and are not exposed here.</p></div>`;
    return;
  }
  root.innerHTML = `<div class="asset-gallery-grid asset-gallery-grid--documents">${models.map(model => assetWindowCard(model, { description: model.description || "Public supporting document not duplicated elsewhere on the site." }, { compact: true })).join("")}</div>`;
  bindAssetButtons(data);
}


function githubMediaPath(category, fileName) {
  const folder = String(category || "").replaceAll("_", "-");
  return `https://raw.githubusercontent.com/salahfaisalsaeedsaeed/salahfaisalsaeedsaeed.github.io/main/media/assets/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`;
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
  body.innerHTML = `<div class="asset-preview-full github-pdf-preview"><iframe src="${escapeAttr(viewerSource)}" title="${escapeAttr(title || "PDF presentation")}" loading="lazy"></iframe></div><p class="modal-description">PDF presentation displayed within this website.</p>`;
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

async function renderMedia() {
  const root = $("#mediaLibrary");
  if (!root) return;

  const populatedCategories = MEDIA_ORDER.filter(key => (GITHUB_MEDIA[key] || []).length);
  const items = populatedCategories.flatMap(key => GITHUB_MEDIA[key] || []);
  const imageCount = items.filter(item => item.type === "image").length;
  const videoCount = items.filter(item => item.type === "video").length;
  const pdfCount = items.filter(item => item.type === "pdf").length;

  root.innerHTML = `
    <div class="media-library-intro">
      <div>
        <p class="section-label">Curated Media Library</p>
        <h3>Academic and professional media in context</h3>
        <p>Selected images, videos, and PDF presentations are displayed within this website. Images use lazy loading, videos load on demand, and PDFs open only when requested.</p>
      </div>
      <dl class="media-library-stats">
        <div><dt>${items.length}</dt><dd>items</dd></div>
        <div><dt>${imageCount}</dt><dd>images</dd></div>
        <div><dt>${videoCount}</dt><dd>videos</dd></div>
        <div><dt>${pdfCount}</dt><dd>PDFs</dd></div>
      </dl>
    </div>
    <div class="media-sections">
      ${populatedCategories.map((key, index) => {
        const meta = MEDIA_META[key];
        const group = GITHUB_MEDIA[key] || [];
        return `<section class="media-category-section" id="media-${escapeAttr(key.replaceAll("_", "-"))}">
          <div class="media-category-heading">
            <div>
              <span class="media-category-index">${String(index + 1).padStart(2, "0")}</span>
              <div><h3>${escapeHTML(meta.title)}</h3><p>${escapeHTML(meta.description)}</p></div>
            </div>
            <strong>${group.length} item${group.length === 1 ? "" : "s"}</strong>
          </div>
          <div class="asset-gallery-grid">${group.map(item => githubMediaCard(key, item)).join("")}</div>
        </section>`;
      }).join("")}
    </div>`;
  bindGithubPdfButtons();
}

async function renderHome() {
  if (!$("#homeFeaturedPublications") && !$("#metricPublications")) return;
  const data = await loadData();
  const publications = uniqueRows((data.publications || []).filter(row => approvedRow(row) && row.status === "published"), row => normalizedKey(row.doi_url || row.title));
  const projects = uniqueRows((data.projects || []).filter(approvedRow), row => normalizedKey(row.slug || row.title));
  const awards = uniqueRows((data.awards || []).filter(approvedRow), row => row.asset_id || normalizedKey(row.title));
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
    if (href === "/institutional-evidence/") link.textContent = "Institutional Evidence";
    if (href === "/media/") link.textContent = "Media & Activities";
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
  await Promise.allSettled(jobs);
  initFilters();
  absorbGraduationProjectDuplicate();
  normalizeSchoolNameInDOM();
}

document.addEventListener("DOMContentLoaded", () => {
  injectRenderingStyles();
  initNavigation();
  initTheme();
  initYear();
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
