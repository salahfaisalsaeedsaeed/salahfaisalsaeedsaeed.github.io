const ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const PROJECT_ID = "6a90545d002d8d1ed109";
const DATABASE_ID = "6a919743003b7658ee49";

const UPDATES = [
  {
    "tableId": "publications",
    "rowId": "6a92f7448e3a797694d4",
    "title": "Control-Oriented Design and Performance Evaluation of a Three-Terminal Storage-Assisted EV Fast-Charging System with an Interleaved Bidirectional Buck–Boost Converter",
    "data": {
      "asset_id": "6a933e7fc3b0372560d1"
    }
  },
  {
    "tableId": "publications",
    "rowId": "6a92f7448e4adba71de9",
    "title": "Toward Trust-by-Design in Federated Learning for Healthcare: A Taxonomic Review of Privacy, Explainability, and Accountability",
    "data": {
      "asset_id": "6a933e7fc3bd2b020bcb"
    }
  },
  {
    "tableId": "publications",
    "rowId": "6a92f7448e4d866f5b34",
    "title": "A Review of Electric Vehicle Charging Systems: Converter Architectures, Control Optimization, and PV-Integrated Energy Management",
    "data": {
      "asset_id": "6a933e7fc3bf6edffe91"
    }
  },
  {
    "tableId": "publications",
    "rowId": "6a92f7448e576c441092",
    "title": "Data-Driven Deep Learning for Imaging Through Scattering Media: Architectures, Learning Paradigms, and Methodological Frontiers",
    "data": {
      "asset_id": "6a933e7fc3c0aab5546f"
    }
  },
  {
    "tableId": "publications",
    "rowId": "6a92f7448e63dcfa2b39",
    "title": "Advances in Error Compensation for Robotic Manipulators: A Systematic Review from Geometric Calibration to AI-Driven Hybrid Control",
    "data": {
      "asset_id": "6a933e7fc3c1a9de582b"
    }
  },
  {
    "tableId": "publications",
    "rowId": "6a92f7448e65d21a37c3",
    "title": "A Survey on Camera-Based Measurement Systems: Techniques, Applications, and Challenges",
    "data": {
      "asset_id": "6a933e7fc3c2c39606f2"
    }
  },
  {
    "tableId": "publications",
    "rowId": "6a92f7448e66f846eca3",
    "title": "A Comprehensive Review of Transcranial Direct Current Stimulation (tDCS): Mechanisms, Cognitive Effects, Applications, and Future Directions",
    "data": {
      "asset_id": "6a933e7fc3c3b485787b"
    }
  },
  {
    "tableId": "publications",
    "rowId": "6a92f7448e67fdd7fed5",
    "title": "Advancements in Robotic Arm Technologies: Precision, Intelligence, and Cross-Sector Applications",
    "data": {
      "asset_id": "6a933e7fc3c645dcacce"
    }
  },
  {
    "tableId": "awards",
    "rowId": "6a93021d45555fe9640e",
    "title": "Best Paper Award — eSmarTA-2026",
    "data": {
      "asset_id": "6a9340d8c2f0adfb0d4e"
    }
  },
  {
    "tableId": "awards",
    "rowId": "6a93021d4567b0ef9d13",
    "title": "Academic Distinction — Ranked First in Cohort and Second Nationally",
    "data": {
      "asset_id": "6a9340d8c2efead62370"
    }
  },
  {
    "tableId": "awards",
    "rowId": "6a93021d456f21c7e24d",
    "title": "Academic Distinction — First Rank in Cohort",
    "data": {
      "asset_id": "6a9340d8c2f1f0c29183"
    }
  },
  {
    "tableId": "awards",
    "rowId": "6a93021d457063fc56a7",
    "title": "Certificate of Appreciation — Scientific Research and Academic Writing Program Leadership",
    "data": {
      "asset_id": "6a9340d8c2d1e0122abb"
    }
  },
  {
    "tableId": "awards",
    "rowId": "6a93021d4571103a79de",
    "title": "Certificate of Recognition — Professional Excellence and Dedicated Service",
    "data": {
      "asset_id": "6a9340d8c2d0f27c86ab"
    }
  },
  {
    "tableId": "awards",
    "rowId": "6a93021d4571cf1b6cac",
    "title": "Certificate of Achievement — Outstanding Contribution to Laboratory Development",
    "data": {
      "asset_id": "6a9340d8c2d2ad5919d7"
    }
  },
  {
    "tableId": "awards",
    "rowId": "6a93021d45727d956ad5",
    "title": "Certificate of Appreciation — Student Recognition for Teaching Excellence",
    "data": {
      "asset_id": "6a9340d8c2d38813dbfc"
    }
  },
  {
    "tableId": "awards",
    "rowId": "6a93021d457303a9d2a3",
    "title": "Certificate of Appreciation — Physics Laboratory Equipment and Experiment Development",
    "data": {
      "asset_id": "6a9340d8c2d4504c6ab4"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452c6d2f8dd4ed",
    "title": "IEEE Authorship and Open Access Symposium — Tips and Best Practices to Get Published from IEEE Editors",
    "data": {
      "asset_id": "6a9340d8c1dd22cc21a5"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452c8340b7a0ea",
    "title": "eSmarTA 2025 — Conference Participation",
    "data": {
      "asset_id": "6a9340d8c2cef2cc37eb",
      "supporting_asset_ids": [
        "6a9340d8c2995d22c1da",
        "6a9340d8c29a60d331f0",
        "6a9340d8c2be40a26394",
        "6a9340d8c2c11fa4e19e"
      ]
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452c865302afde",
    "title": "Train-the-Trainer Program: The Novice Trainer Level",
    "data": {
      "asset_id": "6a9340d8c178ad11d897"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452c87870b063c",
    "title": "Introduction in Artificial Intelligence",
    "data": {
      "asset_id": "6a9340d8c17ae5a54b99"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452c889cb3b53c",
    "title": "Internet of Things",
    "data": {
      "asset_id": "6a9340d8c179accc5762"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452c89a86b10b8",
    "title": "Computer Essentials",
    "data": {
      "asset_id": "6a9340d8c1dad69074fb"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452c8ae0c2b1f7",
    "title": "Influential Leadership & Effective Management",
    "data": {
      "asset_id": "6a9340d8c1c95e3b79ee"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452c94194ce6bb",
    "title": "Training Course in Translation",
    "data": {
      "asset_id": "6a9340d8c2d89489014b"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452c96b83d62a3",
    "title": "Cooperative Industrial Training — General Industries & Packages Co. (GenPack)",
    "data": {
      "asset_id": "6a9340d8c2d6ecfe0862"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452cc8da40f849",
    "title": "Industrial Training — National Dairy & Food Co. (Nadfood)",
    "data": {
      "asset_id": "6a9340d8c2d61f4bbc33"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452ccd9c50b289",
    "title": "Electronic Control Training — YCIC / HSA Group",
    "data": {
      "asset_id": "6a9340d8c2d5576dfc41"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452ccf487c4676",
    "title": "Founding Member — Sina’a Union",
    "data": {
      "asset_id": "6a9340d8c2db1272d64d"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452cd0ad4d8505",
    "title": "Community Initiative Participation — Taiz Youth Festival",
    "data": {
      "asset_id": "6a9340d8c2dbfe9398b8"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a930c452cd1ff28de04",
    "title": "Training in Union Activities and Initiative Planning",
    "data": {
      "asset_id": "6a9340d8c2dcd828fe8a"
    }
  },
  {
    "tableId": "credentials",
    "rowId": "6a93102444234505ff4a",
    "title": "eSmarTA 2026 — Conference Participation and Paper Presentations",
    "data": {
      "asset_id": "6a9340d8c29675cb5f99",
      "supporting_asset_ids": [
        "6a9340d8c2728fac8a36",
        "6a9340d8c2763ebccf06",
        "6a9340d8c2780d201e30",
        "6a9340d8c27915f7e1a6"
      ]
    }
  },
  {
    "tableId": "experiences",
    "rowId": "6a92fdf68b9b1c01cd82",
    "title": "STEM Technical Education Specialist, Laboratory Engineer & Scientific Research Mentor",
    "data": {
      "evidence_asset_ids": [
        "6a9340d8c16fff604065",
        "6a9340d8c13aa39faa6b"
      ]
    }
  },
  {
    "tableId": "experiences",
    "rowId": "6a92fdf68ba78ce8e186",
    "title": "Computer Maintenance Engineer & Physics Laboratory Technician",
    "data": {
      "evidence_asset_ids": [
        "6a9340d8c1777502369d"
      ]
    }
  },
  {
    "tableId": "experiences",
    "rowId": "6a92fdf68ba960421809",
    "title": "Physics Teacher & Laboratory Support Instructor",
    "data": {
      "evidence_asset_ids": [
        "6a9340d8c175deb230fe"
      ]
    }
  },
  {
    "tableId": "recommendations",
    "rowId": "6a930efe5c74957fda12",
    "title": "Academic & Research Recommendation — Robotics, Computer Vision and Control Systems",
    "data": {
      "asset_id": "6a9340d8c13681504a19"
    }
  },
  {
    "tableId": "recommendations",
    "rowId": "6a930efe5c842170c8f8",
    "title": "Research Recommendation — Power Electronics, EV Fast Charging and MATLAB/Simulink",
    "data": {
      "asset_id": "6a9340d8c1375593bf7a"
    }
  },
  {
    "tableId": "recommendations",
    "rowId": "6a930efe5c8642ffecdd",
    "title": "Research Recommendation — Cybersecurity, Federated Learning and Explainable AI",
    "data": {
      "asset_id": "6a9340d8c134823daa73"
    }
  },
  {
    "tableId": "recommendations",
    "rowId": "6a930efe5c89c34201ce",
    "title": "Academic Recommendation — Industrial Control, Electronics and Technical Learning",
    "data": {
      "asset_id": "6a9340d8c12472da2382"
    }
  },
  {
    "tableId": "recommendations",
    "rowId": "6a930efe5c8acc09a466",
    "title": "Academic Recommendation — Industrial Control, Motivation and Further Study",
    "data": {
      "asset_id": "6a9340d8c12472da2382"
    }
  },
  {
    "tableId": "recommendations",
    "rowId": "6a930efe5c8bb4f36254",
    "title": "Academic Recommendation — Vocational Technical Education and Bachelor’s Study Readiness",
    "data": {
      "asset_id": "6a9340d8c12472da2382"
    }
  },
  {
    "tableId": "recommendations",
    "rowId": "6a930efe5c8cae3acc0c",
    "title": "Academic Recommendation — Technical Education, Adaptability and Continued Study",
    "data": {
      "asset_id": "6a9340d8c12472da2382"
    }
  },
  {
    "tableId": "projects",
    "rowId": "6a920e1a000cd571ffba",
    "title": "Manipulator Robot Error Correction Using Computer Vision",
    "data": {
      "asset_ids": [
        "6a9340d8c1399087fe44"
      ]
    }
  }
];

function normalize(value) {
  if (value === null || value === undefined || value === "") return null;
  if (Array.isArray(value)) return [...value];
  return value;
}

function equalValues(a, b) {
  const na = normalize(a);
  const nb = normalize(b);
  if (Array.isArray(na) || Array.isArray(nb)) {
    return JSON.stringify(na || []) === JSON.stringify(nb || []);
  }
  return na === nb;
}

async function appwrite(path, apiKey, options = {}) {
  const response = await fetch(`${ENDPOINT}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Appwrite-Project": PROJECT_ID,
      "X-Appwrite-Key": apiKey,
      "X-Appwrite-Response-Format": "2.0.0",
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const error = new Error(data?.message || `Appwrite HTTP ${response.status}`);
    error.status = response.status;
    error.details = data;
    throw error;
  }
  return data;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Use POST." });
  }

  const apiKey = process.env.APPWRITE_API_KEY;
  const expectedSecret = process.env.LINK_SECRET;
  const suppliedSecret = req.headers["x-link-secret"];

  if (!apiKey || !expectedSecret) {
    return res.status(500).json({
      ok: false,
      error: "Server environment variables APPWRITE_API_KEY and LINK_SECRET must be configured."
    });
  }

  if (!suppliedSecret || suppliedSecret !== expectedSecret) {
    return res.status(401).json({ ok: false, error: "Invalid linker secret." });
  }

  const mode = req.body?.mode === "apply" ? "apply" : "dry-run";

  const report = [];
  const conflicts = [];

  // PRE-FLIGHT: read and validate every target before any write.
  for (const item of UPDATES) {
    const path = `/tablesdb/${DATABASE_ID}/tables/${item.tableId}/rows/${item.rowId}`;
    try {
      const row = await appwrite(path, apiKey, { method: "GET" });

      if (row.title !== item.title) {
        conflicts.push({
          table: item.tableId,
          rowId: item.rowId,
          expectedTitle: item.title,
          currentTitle: row.title,
          reason: "TITLE_MISMATCH"
        });
        continue;
      }

      const fields = [];
      let rowConflict = false;

      for (const [field, expected] of Object.entries(item.data)) {
        const current = row[field];

        // Empty is safe; identical is safe; different non-empty is a conflict.
        const isEmpty =
          current === null ||
          current === undefined ||
          current === "" ||
          (Array.isArray(current) && current.length === 0);

        if (!isEmpty && !equalValues(current, expected)) {
          rowConflict = true;
          conflicts.push({
            table: item.tableId,
            rowId: item.rowId,
            title: item.title,
            field,
            current,
            expected,
            reason: "FIELD_CONFLICT"
          });
        }

        fields.push({
          field,
          current,
          expected,
          status: equalValues(current, expected)
            ? "already_correct"
            : isEmpty
              ? "ready"
              : "conflict"
        });
      }

      report.push({
        table: item.tableId,
        rowId: item.rowId,
        title: item.title,
        fields,
        preflight: rowConflict ? "conflict" : "ok"
      });
    } catch (err) {
      conflicts.push({
        table: item.tableId,
        rowId: item.rowId,
        title: item.title,
        reason: "READ_ERROR",
        error: err.message,
        details: err.details || null
      });
    }
  }

  if (conflicts.length > 0) {
    return res.status(409).json({
      ok: false,
      mode,
      message: "Pre-flight found conflicts. Nothing was written.",
      totals: {
        plannedRows: UPDATES.length,
        conflicts: conflicts.length
      },
      conflicts,
      report
    });
  }

  if (mode === "dry-run") {
    const alreadyCorrect = report.filter(r =>
      r.fields.every(f => f.status === "already_correct")
    ).length;

    return res.status(200).json({
      ok: true,
      mode: "dry-run",
      message: "Pre-flight passed. No data was changed.",
      totals: {
        plannedRows: UPDATES.length,
        alreadyCorrect,
        rowsThatWouldBeUpdated: UPDATES.length - alreadyCorrect
      },
      report
    });
  }

  // APPLY only after every row passed pre-flight.
  const applied = [];
  for (const item of UPDATES) {
    const path = `/tablesdb/${DATABASE_ID}/tables/${item.tableId}/rows/${item.rowId}`;

    // Fetch once more so re-running the tool is idempotent.
    const current = await appwrite(path, apiKey, { method: "GET" });
    const needsWrite = Object.entries(item.data).some(
      ([field, expected]) => !equalValues(current[field], expected)
    );

    if (!needsWrite) {
      applied.push({
        table: item.tableId,
        rowId: item.rowId,
        title: item.title,
        status: "already_correct"
      });
      continue;
    }

    await appwrite(path, apiKey, {
      method: "PATCH",
      body: JSON.stringify({ data: item.data })
    });

    applied.push({
      table: item.tableId,
      rowId: item.rowId,
      title: item.title,
      status: "updated",
      data: item.data
    });
  }

  return res.status(200).json({
    ok: true,
    mode: "apply",
    message: "Linking completed.",
    totals: {
      plannedRows: UPDATES.length,
      updated: applied.filter(x => x.status === "updated").length,
      alreadyCorrect: applied.filter(x => x.status === "already_correct").length
    },
    applied
  });
};