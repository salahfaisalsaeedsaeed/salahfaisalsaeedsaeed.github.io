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
    publications: "publications",
    projects: "projects",
    awards: "awards",
    credentials: "credentials",
    experiences: "experiences",
    recommendations: "recommendations",
    institutionalEvidence: "institutional_evidence",
    media: "media"
  }
};

const MEDIA_ORDER = [
  "student_videos_and_conference_presentations",
  "student_teaching_and_practical_training_activities",
  "teacher_training_and_professional_development_programs",
  "3d_printing_and_stem_laboratory_activities",
  "technical_maintenance_and_troubleshooting_work",
  "graduation_highlights",
  "other"
];

const MEDIA_META = {
  student_videos_and_conference_presentations: {
    title: "Student Videos and Conference Presentations",
    description: "Student research communication, conference presentations, presentation files, and selected videos documenting publication-oriented academic work."
  },
  student_teaching_and_practical_training_activities: {
    title: "Student Teaching and Practical Training Activities",
    description: "Selected evidence of practical instruction in electronics, electronic circuits, simulation software, laboratory work, and student-led technical explanation."
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
    description: "A restrained selection of graduation-related visual records included for academic context without turning the profile into a personal photo album."
  },
  other: {
    title: "Other Selected Activities",
    description: "Additional reviewed media that does not yet belong to a more specific academic or professional collection."
  }
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
const safeDate = value => {
  if (!value || value === "null") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};
const formatDate = (value, options = { year: "numeric", month: "short" }) => {
  const date = safeDate(value);
  return date ? date.toLocaleDateString("en-US", options) : "";
};
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
const slugKey = value => normalizedKey(value).replace(/\s+/g, "_");
const sortRows = rows => [...rows].sort((a, b) =>
  (Number(a.sort_order) || 9999) - (Number(b.sort_order) || 9999)
);

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
    headers: {
      "X-Appwrite-Project": APPWRITE.projectId,
      "Accept": "application/json"
    },
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`${tableId}: HTTP ${response.status}`);
  const data = await response.json();
  return data.rows || data.documents || [];
}

async function fetchPublicStorageFiles({ pageSize = 100, maxPages = 10 } = {}) {
  const files = [];
  for (let page = 0; page < maxPages; page += 1) {
    const url = new URL(`${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files`);
    url.searchParams.append("queries[]", queryString("limit", [pageSize]));
    if (page > 0) url.searchParams.append("queries[]", queryString("offset", [page * pageSize]));
    url.searchParams.set("total", "false");
    const response = await fetch(url, {
      headers: {
        "X-Appwrite-Project": APPWRITE.projectId,
        "Accept": "application/json"
      },
      cache: "no-store"
    });
    if (!response.ok) throw new Error(`storage: HTTP ${response.status}`);
    const data = await response.json();
    const batch = data.files || [];
    files.push(...batch);
    if (batch.length < pageSize) break;
  }
  return files;
}

function mediaTypeFromName(name = "") {
  const value = String(name).toLowerCase();
  if (/\.pdf(?:$|\?)/.test(value)) return "pdf";
  if (/\.(png|jpe?g|webp|gif|avif|bmp|svg)(?:$|\?)/.test(value)) return "image";
  if (/\.(mp4|webm|mov|m4v|avi|mkv)(?:$|\?)/.test(value)) return "video";
  if (/\.(ppt|pptx|pps|ppsx)(?:$|\?)/.test(value)) return "presentation";
  return "";
}

function mediaTypeFromFile(file, fallback = "") {
  const mime = String(file?.mimeType || "").toLowerCase();
  const name = String(file?.name || "").toLowerCase();
  if (mime === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (/\.(ppt|pptx|pps|ppsx)$/i.test(name)) return "presentation";
  return mediaTypeFromName(name) || fallback;
}

function effectiveMediaType(asset = {}) {
  const declared = String(asset.media_type || "").toLowerCase();
  if (["image", "video", "pdf", "presentation"].includes(declared)) return declared;
  if (String(asset.asset_type || "").toLowerCase() === "presentation") return "presentation";
  return mediaTypeFromName(asset.file_name || asset.filename || asset.name || asset.title || "") || declared || "file";
}

function storageFileView(fileId) {
  if (!fileId) return "";
  return `${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files/${encodeURIComponent(fileId)}/view?project=${encodeURIComponent(APPWRITE.projectId)}`;
}

function storageFilePreview(fileId, width = 1400, height = 1000) {
  if (!fileId) return "";
  return `${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files/${encodeURIComponent(fileId)}/preview?width=${width}&height=${height}&quality=86&project=${encodeURIComponent(APPWRITE.projectId)}`;
}

function storageViewUrl(asset) {
  return storageFileView(asset?.file_id);
}

function storagePreviewUrl(asset, width = 1400, height = 1000) {
  const previewId = asset?.thumbnail_file_id || asset?.thumbnailFileId || asset?._preview_file_id || asset?.file_id;
  if (!previewId) return "";
  return String(previewId).startsWith("d_")
    ? storageFileView(previewId)
    : storageFilePreview(previewId, width, height);
}

function fileBaseName(name = "") {
  return String(name).replace(/\.[^.]+$/, "");
}

function resolveStorageFile(asset, files) {
  if (!asset || !Array.isArray(files) || !files.length) return null;

  const explicitId = asset.file_id || asset.storage_file_id || asset.fileId;
  if (explicitId) {
    const direct = files.find(file => file.$id === explicitId);
    if (direct) return direct;
  }

  const assetId = String(asset.$id || "");
  if (assetId) {
    const exact = files.find(file => file.$id === assetId);
    if (exact) return exact;

    const marker = assetId.slice(0, 17);
    if (marker.length >= 8) {
      const candidates = files.filter(file => String(file?.$id || "").includes(marker));
      if (candidates.length) return bestStorageCandidate(asset, candidates);
    }
  }

  const wantedNames = [asset.file_name, asset.filename, asset.name]
    .map(normalizedKey)
    .filter(Boolean);
  if (wantedNames.length) {
    const exactByName = files.find(file => wantedNames.includes(normalizedKey(file?.name || "")));
    if (exactByName) return exactByName;
  }

  const titleKey = normalizedKey(asset.title || "");
  if (titleKey.length >= 8) {
    const titleMatches = files.filter(file => {
      const candidate = normalizedKey(fileBaseName(file?.name || ""));
      return candidate === titleKey || candidate.includes(titleKey) || titleKey.includes(candidate);
    });
    if (titleMatches.length) return bestStorageCandidate(asset, titleMatches);
  }

  return null;
}

function bestStorageCandidate(asset, candidates) {
  const wanted = effectiveMediaType(asset);
  const score = file => {
    const type = mediaTypeFromFile(file, "file");
    const nameKey = normalizedKey(file?.name || "");
    const titleKey = normalizedKey(asset.title || "");
    let value = 0;
    if (type === wanted) value += 100;
    if (asset.file_id && file.$id === asset.file_id) value += 500;
    if (titleKey && nameKey.includes(titleKey)) value += 40;
    if (/page\s*1|page-?1|_001\b/.test(nameKey)) value += 4;
    return value;
  };
  return [...candidates].sort((a, b) => score(b) - score(a))[0] || null;
}

function humanizeFileName(name = "") {
  const base = fileBaseName(name)
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return base ? base.replace(/\b\w/g, char => char.toUpperCase()) : "Public media file";
}

function enrichAssets(assetRows, storageFiles) {
  const claimedFileIds = new Set();
  const enriched = (assetRows || []).map(asset => {
    const explicitId = asset.file_id || asset.storage_file_id || asset.fileId || "";
    const file = resolveStorageFile(asset, storageFiles);
    const primaryId = explicitId || file?.$id || "";
    const declaredType = effectiveMediaType(asset);
    if (primaryId) claimedFileIds.add(primaryId);
    if (file?.$id) claimedFileIds.add(file.$id);
    return {
      ...asset,
      file_id: primaryId,
      file_name: asset.file_name || asset.filename || file?.name || "",
      media_type: declaredType !== "file" ? declaredType : mediaTypeFromFile(file, declaredType),
      _preview_file_id: file?.$id && file.$id !== primaryId ? file.$id : "",
      _storage_resolved: Boolean(primaryId),
      _storage_meta: file || null
    };
  });

  (storageFiles || []).forEach(file => {
    if (claimedFileIds.has(file.$id)) return;
    enriched.push({
      $id: `storage:${file.$id}`,
      title: humanizeFileName(file.name),
      description: "",
      alt_text: humanizeFileName(file.name),
      asset_type: ["image", "video"].includes(mediaTypeFromFile(file, "file")) ? "media" : (mediaTypeFromFile(file, "file") === "presentation" ? "presentation" : "unclassified"),
      visibility: "public",
      file_id: file.$id,
      file_name: file.name || "",
      media_type: mediaTypeFromFile(file, "file"),
      _storage_resolved: true,
      _storage_meta: file,
      _synthetic: true
    });
  });

  return sortRows(enriched);
}

let DATA_PROMISE;
function loadData() {
  if (DATA_PROMISE) return DATA_PROMISE;
  DATA_PROMISE = (async () => {
    const entries = Object.entries(APPWRITE.tables);
    const [tableResults, storageResult] = await Promise.all([
      Promise.allSettled(entries.map(([, tableId]) => fetchRows(tableId))),
      fetchPublicStorageFiles().then(files => ({ ok: true, files })).catch(error => ({ ok: false, error, files: [] }))
    ]);

    const data = { errors: [], storageFiles: storageResult.files || [] };
    tableResults.forEach((result, index) => {
      const [key] = entries[index];
      if (result.status === "fulfilled") {
        data[key] = sortRows(result.value.filter(row => !row.visibility || row.visibility === "public"));
      } else {
        data[key] = [];
        data.errors.push(`${key}: ${result.reason?.message || "unavailable"}`);
      }
    });

    if (!storageResult.ok) data.errors.push(`storage: ${storageResult.error?.message || "unavailable"}`);
    data.assets = enrichAssets(data.assets || [], data.storageFiles);
    data.assetMap = new Map(data.assets.map(asset => [asset.$id, asset]));
    data.fileAssetMap = new Map(data.assets.filter(asset => asset.file_id).map(asset => [asset.file_id, asset]));
    data.referencedAssetIds = referencedAssetIds(data);
    return data;
  })();
  return DATA_PROMISE;
}

function assetFor(data, id) {
  if (!id) return null;
  return data.assetMap.get(id) || data.fileAssetMap.get(id) || null;
}

function publicAsset(data, id) {
  const asset = assetFor(data, id);
  return asset && (!asset.visibility || asset.visibility === "public") ? asset : null;
}

function formatExperienceRange(row) {
  const start = safeDate(row.start_date);
  const end = safeDate(row.end_date);
  const startLabel = start ? start.toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "";
  const endLabel = asBool(row.current)
    ? "Present"
    : end ? end.toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "";
  return [startLabel, endLabel].filter(Boolean).join(" – ");
}

function pathActive(prefix) {
  const path = location.pathname.replace(/\/+$/, "/") || "/";
  if (prefix === "/") return path === "/";
  return path.startsWith(prefix);
}

function initNavigation() {
  const currentPath = location.pathname.replace(/\/+$/, "/") || "/";
  $$(".side-nav a").forEach(link => {
    const href = new URL(link.href, location.origin).pathname.replace(/\/+$/, "/") || "/";
    const active = href === "/" ? currentPath === "/" : currentPath.startsWith(href);
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
    if (href === "/institutional-evidence/") link.textContent = "Institutional Evidence";
    if (href === "/media/") link.textContent = "Media & Activities";
  });

  const menuToggle = $("#menuToggle");
  const sidebar = $("#sidebar");
  const backdrop = $("#sidebarBackdrop");
  if (!menuToggle || !sidebar) return;

  const close = () => {
    document.body.classList.remove("sidebar-open");
    menuToggle.setAttribute("aria-expanded", "false");
    if (backdrop) backdrop.hidden = true;
  };
  const open = () => {
    document.body.classList.add("sidebar-open");
    menuToggle.setAttribute("aria-expanded", "true");
    if (backdrop) backdrop.hidden = false;
  };

  menuToggle.addEventListener("click", () => {
    document.body.classList.contains("sidebar-open") ? close() : open();
  });
  backdrop?.addEventListener("click", close);
  $$(".side-nav a", sidebar).forEach(link => link.addEventListener("click", close));
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
}

function initYear() {
  $$("#year").forEach(node => { node.textContent = new Date().getFullYear(); });
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  $$("[data-theme-toggle],#themeToggle").forEach(button => {
    const icon = button.querySelector("span:first-child");
    if (icon) icon.textContent = theme === "dark" ? "☀" : "◐";
    else button.textContent = theme === "dark" ? "☀" : "◐";
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

function initReveal() {
  const elements = $$(".reveal");
  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
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

function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
}

function initCopyEmail() {
  const button = $("#copyEmail");
  if (!button) return;
  button.addEventListener("click", async () => {
    const email = button.dataset.email || SITE.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied to clipboard");
    } catch {
      showToast(email);
    }
  });
}

function initCvAvailability() {
  $$(".cv-link").forEach(async link => {
    try {
      const response = await fetch(link.getAttribute("href"), { method: "HEAD" });
      if (!response.ok) {
        link.classList.add("unavailable");
        link.title = "CV file unavailable";
      }
    } catch {}
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

function highlightSelf(authors = "") {
  const escaped = escapeHTML(authors);
  return escaped.replace(
    /Salah F\. S\. Saeed|Salah F\. S\. Nasser|Salah Faisal Saeed Saeed|S\. F\. S\. Saeed|S\. F\. S\. Nasser/g,
    '<strong class="author-self">$&</strong>'
  );
}

let modalState = { assets: [], index: 0, trigger: null };

function ensureModal() {
  let modal = $("#mediaModal");
  if (!modal) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="media-modal" id="mediaModal" aria-hidden="true">
        <div class="media-modal-backdrop" data-close-modal></div>
        <div class="media-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="mediaModalTitle">
          <button class="modal-close" type="button" data-close-modal aria-label="Close preview">×</button>
          <h2 id="mediaModalTitle">Media preview</h2>
          <div id="mediaModalBody"></div>
        </div>
      </div>`);
    modal = $("#mediaModal");
  }
  if (modal.dataset.bound !== "1") {
    modal.dataset.bound = "1";
    $$("[data-close-modal]", modal).forEach(button => button.addEventListener("click", closeModal));
  }
  return modal;
}

function assetNarrative(asset, context = {}) {
  const explicit = context.description || context.caption || context.summary || asset.description;
  if (explicit) return explicit;
  const type = effectiveMediaType(asset);
  if (type === "video") return "Selected video evidence documenting the academic, teaching, technical, or professional activity represented by this record.";
  if (type === "image") return "Selected visual evidence documenting the academic, teaching, technical, or professional activity represented by this record.";
  if (type === "presentation") return "Presentation material retained as supporting evidence for the academic or conference activity represented by this record.";
  if (type === "pdf") return "Public supporting document linked directly to the academic or professional record in which it appears.";
  return "Public supporting evidence linked to the academic or professional record in which it appears.";
}

function assetTitle(asset, context = {}) {
  return context.title || asset.title || humanizeFileName(asset.file_name || "");
}

function assetAlt(asset, context = {}) {
  return asset.alt_text || context.alt_text || assetTitle(asset, context) || "Academic and professional evidence";
}

function assetPreviewMarkup(asset, context = {}, mode = "card") {
  const type = effectiveMediaType(asset);
  const title = assetTitle(asset, context);
  const view = storageViewUrl(asset);
  const preview = storagePreviewUrl(asset, mode === "modal" ? 1800 : 1100, mode === "modal" ? 1300 : 760);
  const poster = asset.thumbnail_file_id ? storageFilePreview(asset.thumbnail_file_id, 1200, 760) : "";
  const titleAttr = escapeAttr(title);

  if (!asset.file_id) {
    return `<div class="asset-unavailable"><span>File</span><strong>${escapeHTML(title)}</strong><small>Storage reference unavailable</small></div>`;
  }
  if (type === "image") {
    return `<img src="${escapeAttr(preview || view)}" alt="${escapeAttr(assetAlt(asset, context))}" loading="lazy" decoding="async">`;
  }
  if (type === "video") {
    return `<video controls preload="metadata" playsinline${poster ? ` poster="${escapeAttr(poster)}"` : ""} aria-label="${titleAttr}"><source src="${escapeAttr(view)}"></video>`;
  }
  if (type === "pdf") {
    return `<iframe src="${escapeAttr(view)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH" title="${titleAttr}" loading="lazy"></iframe>`;
  }
  if (type === "presentation") {
    return `<div class="asset-file-panel presentation-panel"><span class="file-kind">PPT</span><strong>${escapeHTML(title)}</strong><small>Presentation file</small></div>`;
  }
  return `<div class="asset-file-panel"><span class="file-kind">FILE</span><strong>${escapeHTML(title)}</strong><small>Public supporting file</small></div>`;
}

function assetWindowCard(asset, context = {}, options = {}) {
  if (!asset || (!asset.visibility || asset.visibility === "public") === false) return "";
  const title = assetTitle(asset, context);
  const description = assetNarrative(asset, context);
  const type = effectiveMediaType(asset);
  const className = options.compact ? " asset-evidence-card--compact" : "";
  const source = storageViewUrl(asset);
  return `<figure class="asset-evidence-card${className}" data-asset-card="${escapeAttr(asset.$id || asset.file_id || title)}">
    <div class="asset-window asset-window--${escapeAttr(type)}">${assetPreviewMarkup(asset, context, "card")}</div>
    <figcaption class="asset-caption">
      <div class="asset-caption-head"><span>${escapeHTML(prettyCategory(type))}</span>${context.date ? `<time>${escapeHTML(context.date)}</time>` : ""}</div>
      <h4>${escapeHTML(title)}</h4>
      ${description ? `<p>${escapeHTML(description)}</p>` : ""}
      <div class="asset-caption-actions">
        <button class="text-button asset-open" type="button" data-single-asset="${escapeAttr(asset.$id)}">Open full view</button>
        ${source ? `<a class="text-link" href="${escapeAttr(source)}" target="_blank" rel="noopener">Open original ↗</a>` : ""}
      </div>
    </figcaption>
  </figure>`;
}

function renderModalAsset() {
  const modal = ensureModal();
  const body = $("#mediaModalBody", modal);
  const heading = $("#mediaModalTitle", modal);
  const asset = modalState.assets[modalState.index];
  if (!asset) {
    body.innerHTML = "<p>Preview unavailable.</p>";
    return;
  }
  heading.textContent = asset.title || "Media preview";
  const nav = modalState.assets.length > 1 ? `
    <div class="modal-gallery-nav">
      <button type="button" data-modal-prev aria-label="Previous item">← Previous</button>
      <span>${modalState.index + 1} / ${modalState.assets.length}</span>
      <button type="button" data-modal-next aria-label="Next item">Next →</button>
    </div>` : "";
  const original = storageViewUrl(asset);
  body.innerHTML = `${nav}<div class="asset-preview-full">${assetPreviewMarkup(asset, {}, "modal")}</div>
    ${asset.description ? `<p class="modal-description">${escapeHTML(asset.description)}</p>` : ""}
    ${original ? `<div class="modal-file-actions"><a class="button button-secondary compact-button" href="${escapeAttr(original)}" target="_blank" rel="noopener">Open original ↗</a></div>` : ""}`;
  $("[data-modal-prev]", body)?.addEventListener("click", () => {
    modalState.index = (modalState.index - 1 + modalState.assets.length) % modalState.assets.length;
    renderModalAsset();
  });
  $("[data-modal-next]", body)?.addEventListener("click", () => {
    modalState.index = (modalState.index + 1) % modalState.assets.length;
    renderModalAsset();
  });
}

function openAssetSet(assets, trigger = null) {
  const clean = uniqueRows(
    assets.filter(asset => asset && (!asset.visibility || asset.visibility === "public") && asset.file_id),
    asset => asset.file_id || asset.$id
  );
  if (!clean.length) return;
  modalState = { assets: clean, index: 0, trigger };
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
  modalState = { assets: [], index: 0, trigger: null };
}

function bindAssetButtons(data) {
  $$("[data-single-asset]").forEach(button => {
    if (button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    button.addEventListener("click", () => {
      const asset = assetFor(data, button.dataset.singleAsset);
      if (asset) openAssetSet([asset], button);
    });
  });

  $$("[data-asset-ids]").forEach(button => {
    if (button.dataset.bound === "1") return;
    button.dataset.bound = "1";
    button.addEventListener("click", () => {
      const assets = (button.dataset.assetIds || "")
        .split("|")
        .map(id => assetFor(data, id))
        .filter(Boolean);
      openAssetSet(assets, button);
    });
  });
}

function initModalKeyboard() {
  window.addEventListener("keydown", event => {
    const modal = $("#mediaModal");
    if (!modal?.classList.contains("show")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft" && modalState.assets.length > 1) {
      modalState.index = (modalState.index - 1 + modalState.assets.length) % modalState.assets.length;
      renderModalAsset();
    }
    if (event.key === "ArrowRight" && modalState.assets.length > 1) {
      modalState.index = (modalState.index + 1) % modalState.assets.length;
      renderModalAsset();
    }
  });
}

function renderError(root, message = "Live academic data is temporarily unavailable. Please refresh shortly.") {
  if (!root) return;
  root.innerHTML = `<div class="empty-state"><h3>Data temporarily unavailable</h3><p>${escapeHTML(message)}</p></div>`;
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
  (data.publications || []).forEach(row => assetIdsFromRecord(row).forEach(add));
  (data.projects || []).forEach(row => assetIdsFromRecord(row).forEach(add));
  (data.awards || []).forEach(row => assetIdsFromRecord(row).forEach(add));
  (data.credentials || []).forEach(row => assetIdsFromRecord(row).forEach(add));
  (data.experiences || []).forEach(row => assetIdsFromRecord(row).forEach(add));
  (data.recommendations || []).forEach(row => assetIdsFromRecord(row).forEach(add));
  (data.institutionalEvidence || []).forEach(row => assetIdsFromRecord(row).forEach(add));
  (data.media || []).forEach(row => assetIdsFromRecord(row).forEach(add));
  return ids;
}

function recordAssets(data, row) {
  return uniqueRows(assetIdsFromRecord(row).map(id => publicAsset(data, id)).filter(Boolean), asset => asset.file_id || asset.$id);
}

function inlineAssetStrip(data, assets, context = {}, options = {}) {
  const clean = uniqueRows(assets.filter(Boolean), asset => asset.file_id || asset.$id);
  if (!clean.length) return "";
  const max = options.max || clean.length;
  const visible = clean.slice(0, max);
  return `<div class="record-asset-gallery${options.compact ? " record-asset-gallery--compact" : ""}">
    ${visible.map(asset => assetWindowCard(asset, context, { compact: options.compact })).join("")}
  </div>`;
}

async function renderPublications() {
  const root = $("#publicationsList");
  if (!root) return;
  const data = await loadData();
  let rows = uniqueRows(data.publications || [], row => normalizedKey(row.doi_url || row.title));
  if (!rows.length) {
    renderError(root);
    return;
  }
  rows = [...rows].sort((a, b) => {
    const ap = a.status === "published" ? 0 : 1;
    const bp = b.status === "published" ? 0 : 1;
    return ap - bp || (Number(b.year) || 0) - (Number(a.year) || 0) || (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0);
  });

  root.innerHTML = rows.map((publication, index) => {
    const category = publication.status === "published" ? "published" : "in_preparation";
    const assets = recordAssets(data, publication);
    const isAward = /trust-by-design/i.test(publication.title || "");
    return `<article class="publication-record filter-item" data-category="${category}">
      <div class="publication-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="publication-content">
        <div class="record-eyebrow">
          <span class="status-badge ${category === "published" ? "status-published" : "status-prep"}">${escapeHTML(publication.status === "published" ? "Published" : prettyCategory(publication.status || "In preparation"))}</span>
          ${isAward ? '<span class="status-badge award-badge">Best Paper Award</span>' : ""}
          <span class="publication-year">${escapeHTML(publication.year || "")}</span>
        </div>
        <h3>${escapeHTML(publication.title)}</h3>
        <p class="pub-authors">${highlightSelf(publication.authors || "")}</p>
        <p class="pub-venue">${escapeHTML(publication.venue || "")}</p>
        ${publication.summary ? `<p class="record-summary">${escapeHTML(publication.summary)}</p>` : ""}
        ${publication.doi_url ? `<div class="record-actions"><a class="text-link" href="${escapeAttr(publication.doi_url)}" target="_blank" rel="noopener">DOI / Publisher ↗</a></div>` : ""}
        ${inlineAssetStrip(data, assets, { description: publication.summary || "Publication file linked to this bibliographic record." }, { compact: true, max: 2 })}
      </div>
    </article>`;
  }).join("");

  const published = rows.filter(row => row.status === "published").length;
  const summary = $("#publicationsSummary");
  if (summary) summary.innerHTML = `<span><strong>${published}</strong> published</span><span><strong>${rows.length - published}</strong> current works</span><span><strong>${rows.length}</strong> total records</span>`;
  bindAssetButtons(data);
  initFilters();
}

async function renderProjects() {
  const root = $("#projectsList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows(data.projects || [], row => normalizedKey(row.slug || row.title));
  if (!rows.length) {
    renderError(root);
    return;
  }

  root.innerHTML = rows.map((project, index) => {
    const assets = recordAssets(data, project);
    const technologies = asArray(project.technologies);
    const tags = technologies.length ? technologies : [prettyCategory(project.category || "Project")];
    return `<article class="project-record filter-item" id="${escapeAttr(project.slug || "")}" data-category="${escapeAttr(project.category || "other")}">
      <div class="project-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="project-main">
        <div class="project-top">
          <div><p class="record-type">${escapeHTML(prettyCategory(project.status || "Project"))}</p><h3>${escapeHTML(project.title)}</h3></div>
          ${project.year ? `<time>${escapeHTML(project.year)}</time>` : ""}
        </div>
        <p class="project-summary">${escapeHTML(project.short_description || project.overview || "")}</p>
        <div class="project-tags">${tags.filter(Boolean).slice(0, 7).map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
        ${inlineAssetStrip(data, assets, { description: project.short_description || project.overview || "Supporting project evidence." }, { compact: true, max: 3 })}
        <details class="project-details"><summary>Project details</summary><dl>
          ${project.role ? `<div><dt>Role</dt><dd>${escapeHTML(project.role)}</dd></div>` : ""}
          ${project.objectives ? `<div><dt>Objectives</dt><dd>${escapeHTML(project.objectives)}</dd></div>` : ""}
          ${project.methodology ? `<div><dt>Methodology</dt><dd>${escapeHTML(project.methodology)}</dd></div>` : ""}
          ${project.results ? `<div><dt>Results / status</dt><dd>${escapeHTML(project.results)}</dd></div>` : ""}
          ${project.series ? `<div><dt>Research series</dt><dd>${escapeHTML(project.series)}</dd></div>` : ""}
        </dl></details>
      </div>
    </article>`;
  }).join("");
  bindAssetButtons(data);
  initFilters();
}

async function renderAwards() {
  const root = $("#awardsList");
  if (!root) return;
  const data = await loadData();
  let rows = uniqueRows(data.awards || [], row => row.asset_id || normalizedKey(row.title));
  if (!rows.length) {
    renderError(root);
    return;
  }
  rows = [...rows].sort((a, b) => Number(asBool(b.featured)) - Number(asBool(a.featured)) || (Number(b.year) || 0) - (Number(a.year) || 0));
  root.innerHTML = rows.map(award => {
    const assets = recordAssets(data, award);
    const major = /best paper|distinction|rank|national/i.test(award.title || "") || asBool(award.featured);
    return `<article class="achievement-record ${major ? "major-recognition" : ""}">
      <div class="achievement-date"><time>${escapeHTML(award.year || "")}</time><span>${escapeHTML(prettyCategory(award.category || "Recognition"))}</span></div>
      <div class="achievement-main">
        <h3>${escapeHTML(award.title)}</h3>
        <p class="institution">${escapeHTML(award.issuer || "")}</p>
        ${award.description ? `<p>${escapeHTML(award.description)}</p>` : ""}
        ${inlineAssetStrip(data, assets, { description: award.description || "Verified supporting evidence for this recognition." }, { compact: true, max: 2 })}
      </div>
    </article>`;
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
  let rows = (data.credentials || []).filter(row => !awardAssetIds.has(row.asset_id) && !awardTitles.has(normalizedKey(row.title)));
  rows = uniqueRows(rows, row => row.asset_id || normalizedKey(row.title));
  if (!rows.length) {
    renderError(root);
    return;
  }
  root.innerHTML = rows.map(credential => {
    const assets = recordAssets(data, credential);
    return `<article class="credential-card filter-item" data-category="${escapeAttr(credential.category || "other")}">
      <div class="credential-meta"><span>${escapeHTML(credential.year || "")}</span><span>${escapeHTML(prettyCategory(credential.category || "Credential"))}</span></div>
      <h3>${escapeHTML(credential.title)}</h3>
      <p class="institution">${escapeHTML(credential.issuer || "")}</p>
      ${credential.description ? `<p>${escapeHTML(credential.description)}</p>` : ""}
      ${inlineAssetStrip(data, assets, { description: credential.description || "Public credential evidence." }, { compact: true, max: 3 })}
    </article>`;
  }).join("");
  bindAssetButtons(data);
  initFilters();
}

async function renderExperiences() {
  const root = $("#experienceList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows(data.experiences || [], row => normalizedKey(row.slug || row.title));
  if (!rows.length) {
    renderError(root);
    return;
  }
  root.innerHTML = rows.map(experience => {
    const responsibilities = asArray(experience.responsibilities);
    const tags = asArray(experience.tags);
    const assets = recordAssets(data, experience);
    return `<article class="timeline-record">
      <div class="record-date">${escapeHTML(formatExperienceRange(experience))}</div>
      <div class="record-body">
        <p class="record-type">${escapeHTML(prettyCategory(experience.experience_type || "Experience"))}</p>
        <h3>${escapeHTML(experience.title)}</h3>
        <p class="institution">${escapeHTML(experience.organization || "")}${experience.location ? ` · ${escapeHTML(experience.location)}` : ""}</p>
        ${experience.summary ? `<p class="record-summary">${escapeHTML(experience.summary)}</p>` : ""}
        ${responsibilities.length ? `<ul class="record-bullets">${responsibilities.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : ""}
        ${tags.length ? `<div class="project-tags">${tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>` : ""}
        ${inlineAssetStrip(data, assets, { description: experience.summary || "Supporting evidence for this professional experience." }, { compact: true, max: 3 })}
      </div>
    </article>`;
  }).join("");
  bindAssetButtons(data);
}

async function renderRecommendations() {
  const root = $("#recommendationsList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows(data.recommendations || [], row => normalizedKey(row.slug || row.title));
  if (!rows.length) {
    renderError(root);
    return;
  }
  const groups = new Map();
  rows.forEach(row => {
    const key = row.asset_id || row.$id;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  });

  root.innerHTML = [...groups.values()].map(group => {
    const first = group[0];
    const assets = uniqueRows(group.flatMap(row => recordAssets(data, row)), asset => asset.file_id || asset.$id);
    const multi = group.length > 1;
    return `<article class="recommendation-card ${multi ? "recommendation-group" : ""}">
      <div class="recommendation-head"><div><p class="record-type">${multi ? `${group.length} recommendations · one verified file` : "Recommendation"}</p><h3>${escapeHTML(multi ? "Academic & Technical Recommendations" : first.title)}</h3></div>${first.issued_date && first.issued_date !== "null" ? `<time>${escapeHTML(formatDate(first.issued_date, { year: "numeric", month: "short", day: "numeric" }))}</time>` : ""}</div>
      <div class="recommendation-entries">${group.map(row => `<div class="recommendation-entry"><h4>${escapeHTML(row.recommender_name || row.title)}</h4><p class="institution">${escapeHTML(row.recommender_title || "")}${row.institution ? ` · ${escapeHTML(row.institution)}` : ""}</p>${row.relationship_context ? `<p class="relationship-context">${escapeHTML(row.relationship_context)}</p>` : ""}${row.summary ? `<p>${escapeHTML(row.summary)}</p>` : ""}${asArray(row.focus_areas).length ? `<div class="project-tags">${asArray(row.focus_areas).map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div>` : ""}</div>`).join("")}</div>
      ${inlineAssetStrip(data, assets, { description: first.summary || "Public recommendation file approved for display." }, { compact: true, max: 2 })}
    </article>`;
  }).join("");
  bindAssetButtons(data);
}

function curatedInstitutionalDescription(row) {
  if (row.description) return row.description;
  const key = normalizedKey(row.title || "");
  if (key.includes("scientific research") && key.includes("academic writing")) {
    return "Institutional documentation of a structured scientific-research and academic-writing training program covering research fundamentals, topic selection, literature work, citation practice, research questions, and conference-oriented academic preparation.";
  }
  if (key.includes("accepted") && key.includes("esmart")) {
    return "Institutional documentation of student research mentorship connected to conference-oriented academic work and accepted student-involved research papers, providing independent evidence of the research-training outcome.";
  }
  if (key.includes("ieee xplore") || (key.includes("publication") && key.includes("esmart"))) {
    return "Institutional documentation of student-involved research progressing to peer-reviewed conference publication and IEEE Xplore indexing, supporting the research-mentorship and academic-writing record.";
  }
  if (key.includes("al amal") || key.includes("cancer center")) {
    return "Institutional documentation of a student research-exposure activity focused on scientific data, information collection, applied research tools, and AI-oriented early-detection research themes.";
  }
  if (key.includes("optimization") && key.includes("electronics")) {
    return "Institutional documentation of applied electronics and optimization-oriented technical training, linking electronics fundamentals with practical STEM and computational problem solving.";
  }
  if (key.includes("physics teachers") || (key.includes("teacher") && key.includes("electronics"))) {
    return "Institutional documentation of professional-development training for physics teachers covering applied electronics, measurement, components, rectification, and practical circuit construction.";
  }
  return `This institutional record independently documents ${row.title || "the listed academic or professional activity"}${row.institution ? ` through ${row.institution}` : ""}. It is included as a verification source rather than as self-reported portfolio content.`;
}

async function renderInstitutionalEvidence() {
  const root = $("#institutionalEvidenceList");
  if (!root) return;
  const data = await loadData();
  const rows = uniqueRows(data.institutionalEvidence || [], row => row.source_url || row.asset_id || normalizedKey(row.title));
  if (!rows.length) {
    renderError(root, "No public institutional evidence records are currently available.");
    return;
  }

  root.innerHTML = rows.map((row, index) => {
    const assets = recordAssets(data, row);
    const description = curatedInstitutionalDescription(row);
    const date = row.event_date && row.event_date !== "null"
      ? formatDate(row.event_date, { year: "numeric", month: "long", day: "numeric" })
      : "";
    return `<article class="institutional-record">
      <div class="institutional-record-number">${String(index + 1).padStart(2, "0")}</div>
      <div class="institutional-record-main">
        <div class="institutional-meta"><span>${escapeHTML(prettyCategory(row.evidence_type || "Institutional evidence"))}</span>${date ? `<time>${escapeHTML(date)}</time>` : ""}</div>
        <h3>${escapeHTML(row.title)}</h3>
        ${row.institution ? `<p class="institution">${escapeHTML(row.institution)}</p>` : ""}
        <p class="institutional-description">${escapeHTML(description)}</p>
        ${inlineAssetStrip(data, assets, { title: row.title, description, date }, { compact: true, max: 2 })}
        ${row.source_url ? `<div class="institutional-source"><span>Original institutional source</span><a href="${escapeAttr(row.source_url)}" target="_blank" rel="noopener">Open the original post ↗</a></div>` : ""}
      </div>
    </article>`;
  }).join("");
  bindAssetButtons(data);
}

function assetTypeIsMedia(asset) {
  const type = String(asset.asset_type || "").toLowerCase();
  return ["media", "project_media", "presentation"].includes(type);
}

function inferMediaCategory(asset, row = {}) {
  const explicit = slugKey(row.category || asset.category || asset.media_category || "");
  const aliases = {
    student_videos_and_conference_presentations: "student_videos_and_conference_presentations",
    student_conference_presentations: "student_videos_and_conference_presentations",
    conference_presentations: "student_videos_and_conference_presentations",
    student_teaching_and_practical_training_activities: "student_teaching_and_practical_training_activities",
    student_teaching: "student_teaching_and_practical_training_activities",
    practical_training: "student_teaching_and_practical_training_activities",
    teacher_training_and_professional_development_programs: "teacher_training_and_professional_development_programs",
    teacher_training: "teacher_training_and_professional_development_programs",
    professional_development: "teacher_training_and_professional_development_programs",
    "3d_printing_and_stem_laboratory_activities": "3d_printing_and_stem_laboratory_activities",
    "3d_printing_stem": "3d_printing_and_stem_laboratory_activities",
    technical_maintenance_and_troubleshooting_work: "technical_maintenance_and_troubleshooting_work",
    technical_maintenance: "technical_maintenance_and_troubleshooting_work",
    graduation_highlights: "graduation_highlights",
    other: "other"
  };
  if (aliases[explicit]) return aliases[explicit];

  const text = normalizedKey([
    asset.title,
    asset.description,
    asset.file_name,
    asset.asset_type,
    row.title,
    row.description,
    row.caption
  ].filter(Boolean).join(" "));

  if (/conference|esmart|presentation|paper presentation|powerpoint|ppt/.test(text)) return "student_videos_and_conference_presentations";
  if (/teacher|teachers|professional development|physics training/.test(text)) return "teacher_training_and_professional_development_programs";
  if (/maintenance|repair|troubleshoot|diagnostic|solder|electronic device/.test(text)) return "technical_maintenance_and_troubleshooting_work";
  if (/3d print|printer|printing|stem lab|robot arm part|manipulator part|prototype/.test(text)) return "3d_printing_and_stem_laboratory_activities";
  if (/graduation|commencement|degree ceremony/.test(text)) return "graduation_highlights";
  if (/student|electronics|proteus|multisim|simulation|circuit|laboratory|training/.test(text)) return "student_teaching_and_practical_training_activities";
  return "other";
}

function buildMediaItems(data) {
  const itemMap = new Map();
  (data.media || []).forEach(row => {
    const asset = publicAsset(data, row.asset_id);
    if (!asset || !asset.file_id) return;
    const key = asset.file_id || asset.$id;
    if (itemMap.has(key)) return;
    itemMap.set(key, {
      asset,
      row,
      category: inferMediaCategory(asset, row),
      title: row.title || asset.title,
      description: row.description || row.caption || row.summary || asset.description || ""
    });
  });

  const explicitlyReferenced = data.referencedAssetIds || new Set();
  (data.assets || []).forEach(asset => {
    if (!asset.file_id || (!asset.visibility || asset.visibility === "public") === false) return;
    const key = asset.file_id || asset.$id;
    if (itemMap.has(key)) return;
    if (!assetTypeIsMedia(asset)) return;
    if (explicitlyReferenced.has(asset.$id)) return;
    itemMap.set(key, {
      asset,
      row: {},
      category: inferMediaCategory(asset, {}),
      title: asset.title,
      description: asset.description || ""
    });
  });

  return [...itemMap.values()];
}

async function renderMedia() {
  const pageRoot = $("#mediaLibrary");
  const deferred = $(".media-deferred");
  const root = pageRoot || deferred?.closest(".section-block") || deferred;
  if (!root) return;
  const data = await loadData();
  const items = buildMediaItems(data);

  if (!items.length) {
    const target = pageRoot || deferred;
    if (target) renderError(target, "No public media records are currently available.");
    return;
  }

  const groups = new Map(MEDIA_ORDER.map(key => [key, []]));
  items.forEach(item => {
    const key = MEDIA_ORDER.includes(item.category) ? item.category : "other";
    groups.get(key).push(item);
  });

  const linkedCount = items.length;
  const imageCount = items.filter(item => effectiveMediaType(item.asset) === "image").length;
  const videoCount = items.filter(item => effectiveMediaType(item.asset) === "video").length;
  const fileCount = linkedCount - imageCount - videoCount;

  const markup = `
    <div class="media-library-intro">
      <div><p class="section-label">Curated Evidence Library</p><h3>Academic and professional media in context</h3><p>Every public item is presented in a fixed viewing window and kept with its academic or professional context. Descriptions appear directly below each item so the media is evidence, not decoration.</p></div>
      <dl class="media-library-stats"><div><dt>${linkedCount}</dt><dd>linked items</dd></div><div><dt>${imageCount}</dt><dd>images</dd></div><div><dt>${videoCount}</dt><dd>videos</dd></div><div><dt>${fileCount}</dt><dd>files</dd></div></dl>
    </div>
    <div class="media-sections">
      ${MEDIA_ORDER.map(key => {
        const group = groups.get(key) || [];
        if (!group.length) return "";
        const meta = MEDIA_META[key];
        return `<section class="media-category-section" id="media-${escapeAttr(key.replaceAll("_", "-"))}">
          <div class="media-category-heading"><div><span class="media-category-index">${String(MEDIA_ORDER.indexOf(key) + 1).padStart(2, "0")}</span><div><h3>${escapeHTML(meta.title)}</h3><p>${escapeHTML(meta.description)}</p></div></div><strong>${group.length} item${group.length === 1 ? "" : "s"}</strong></div>
          <div class="asset-gallery-grid">${group.map(item => assetWindowCard(item.asset, { title: item.title, description: item.description })).join("")}</div>
        </section>`;
      }).join("")}
    </div>`;

  if (pageRoot) pageRoot.innerHTML = markup;
  else root.innerHTML = markup;
  bindAssetButtons(data);
}

async function renderDocuments() {
  const root = $("#documentsList");
  if (!root) return;
  const data = await loadData();
  const used = data.referencedAssetIds || referencedAssetIds(data);
  let assets = (data.assets || []).filter(asset => {
    if ((!asset.visibility || asset.visibility === "public") === false) return false;
    if (!asset.file_id) return false;
    if (used.has(asset.$id)) return false;
    if (assetTypeIsMedia(asset)) return false;
    return true;
  });
  assets = uniqueRows(assets, asset => asset.file_id || asset.$id);
  if (!assets.length) {
    root.innerHTML = `<div class="empty-state compact-empty"><h3>No duplicated document archive</h3><p>Public evidence already linked to publications, projects, awards, credentials, experience, recommendations, institutional evidence, or media is intentionally not repeated here.</p></div>`;
    return;
  }
  root.innerHTML = `<div class="asset-gallery-grid asset-gallery-grid--documents">${assets.map(asset => assetWindowCard(asset, { description: asset.description || "Public supporting document not duplicated elsewhere on the site." }, { compact: true })).join("")}</div>`;
  bindAssetButtons(data);
}

async function renderHome() {
  if (!$("#homeFeaturedPublications") && !$("#metricPublications")) return;
  const data = await loadData();
  const publications = uniqueRows((data.publications || []).filter(row => row.status === "published"), row => normalizedKey(row.doi_url || row.title));
  const projects = uniqueRows(data.projects || [], row => normalizedKey(row.slug || row.title));
  const awards = uniqueRows(data.awards || [], row => row.asset_id || normalizedKey(row.title));

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

function absorbGraduationProjectDuplicate() {
  const list = $("#projectsList");
  const target = $("#graduationProjectActions");
  if (!list || !target) return;
  const absorb = () => {
    const records = $$(".project-record", list);
    const match = records.find(record => (record.querySelector("h3")?.textContent || "").toLowerCase().includes("manipulator robot error correction using computer vision"));
    if (!match) return false;
    const galleries = $$(".record-asset-gallery", match);
    galleries.forEach(gallery => target.appendChild(gallery));
    match.remove();
    $$(".project-index", list).forEach((element, index) => { element.textContent = String(index + 1).padStart(2, "0"); });
    return true;
  };
  if (!absorb()) {
    const observer = new MutationObserver(() => {
      if (absorb()) observer.disconnect();
    });
    observer.observe(list, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 10000);
  }
}

function updateEducationLinks() {
  $$("a[href^='/achievements/']").forEach(link => {
    link.setAttribute("href", "/awards/");
  });
}

async function runDynamicRenderers() {
  const jobs = [
    renderHome(),
    renderPublications(),
    renderProjects(),
    renderAwards(),
    renderCredentials(),
    renderExperiences(),
    renderRecommendations(),
    renderInstitutionalEvidence(),
    renderDocuments(),
    renderMedia()
  ];
  await Promise.allSettled(jobs);
  initFilters();
  absorbGraduationProjectDuplicate();
}

document.addEventListener("DOMContentLoaded", () => {
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
  runDynamicRenderers();
});
