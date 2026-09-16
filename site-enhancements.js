/* Final presentation/data-binding enhancements for media and institutional evidence. */

function normFileName(value=""){
  return String(value||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/\.[a-z0-9]{2,5}$/i,"").replace(/[^a-z0-9]+/g," ").trim();
}

async function hydrateAssetsWithStorage(data){
  if(!data) return data;
  let files=[];
  try{ files=await fetchPublicStorageFiles({pageSize:100,maxPages:10}); }catch{ return data; }
  const byId=new Map(files.map(f=>[String(f.$id||""),f]));
  const used=new Set();
  const scoreCandidate=(asset,file)=>{
    let score=0;
    const explicit=[asset.file_id,asset.storage_file_id,asset.appwrite_file_id].filter(Boolean).map(String);
    if(explicit.includes(String(file.$id))) score+=10000;
    const marker=String(asset.$id||"").slice(0,17);
    if(marker && String(file.$id||"").includes(marker)) score+=700;
    const afields=[asset.file_name,asset.filename,asset.original_name,asset.title,asset.slug].filter(Boolean).map(normFileName);
    const fn=normFileName(file.name);
    for(const a of afields){
      if(!a||!fn) continue;
      if(a===fn) score+=500;
      else if(a.length>7 && (fn.includes(a)||a.includes(fn))) score+=180;
    }
    const mt=String(asset.media_type||"").toLowerCase();
    const inferred=mediaTypeFromFile(file,"");
    if(mt && inferred===mt) score+=70;
    return score;
  };

  (data.assets||[]).forEach(asset=>{
    if(asset.file_id && byId.has(String(asset.file_id))){ asset._storage_resolved=true;used.add(String(asset.file_id));return; }
    let best=null,bestScore=0;
    for(const file of files){
      const s=scoreCandidate(asset,file);
      if(s>bestScore){best=file;bestScore=s;}
    }
    if(best && bestScore>=180){
      asset.file_id=best.$id;
      asset.media_type=mediaTypeFromFile(best,asset.media_type||"");
      asset._storage_resolved=true;
      asset._storage_match_score=bestScore;
      used.add(String(best.$id));
    }
  });
  data.assetMap=new Map((data.assets||[]).map(a=>[a.$id,a]));
  data._storageFiles=files;
  data._resolvedFileCount=(data.assets||[]).filter(a=>a.file_id).length;
  data._storageFileCount=files.length;
  return data;
}

function mediaExplanation(row,asset){
  return row?.description || row?.caption || row?.summary || asset?.description || asset?.caption || "Documented visual evidence from the academic, teaching, laboratory, research, or technical activity represented in this collection.";
}

function mediaTitle(row,asset){
  return row?.title || asset?.title || asset?.file_name || "Academic media item";
}

function renderFixedAssetFrame(asset,title){
  const src=storageViewUrl(asset);
  if(!asset?.file_id){
    return `<div class="media-file-placeholder"><span class="media-file-icon">FILE</span><strong>Preview unavailable</strong><span>The record is preserved, but its storage file could not be resolved.</span></div>`;
  }
  if(asset.media_type==="image") return `<img loading="lazy" src="${escapeAttr(storagePreviewUrl(asset,1200,750))}" alt="${escapeAttr(asset.alt_text||title||asset.title||"Academic activity image")}">`;
  if(asset.media_type==="video") return `<video controls preload="metadata" playsinline><source src="${escapeAttr(src)}"></video>`;
  if(asset.media_type==="pdf") return `<iframe loading="lazy" src="${escapeAttr(src)}#toolbar=0&navpanes=0" title="${escapeAttr(title||asset.title||"PDF document")}"></iframe>`;
  const ext=asset.media_type==="presentation"?"PPT":"FILE";
  return `<div class="media-file-placeholder"><span class="media-file-icon">${ext}</span><strong>${escapeHTML(title||asset.title||"Supporting file")}</strong><span>Open the original file to view it in its native format.</span></div>`;
}

const FINAL_MEDIA_ORDER=[
  "student_videos_and_conference_presentations",
  "student_conference_presentations",
  "student_teaching_and_practical_training_activities",
  "student_teaching",
  "teacher_training_and_professional_development_programs",
  "teacher_training",
  "3d_printing_and_stem_laboratory_activities",
  "3d_printing_stem",
  "technical_maintenance_and_troubleshooting_work",
  "technical_maintenance",
  "graduation_highlights",
  "other"
];
const FINAL_MEDIA_DESCRIPTIONS={
  student_videos_and_conference_presentations:"Student research communication, conference participation, oral presentations, and presentation files associated with publication-oriented academic work.",
  student_conference_presentations:"Student research communication, conference participation, oral presentations, and presentation files associated with publication-oriented academic work.",
  student_teaching_and_practical_training_activities:"Practical student training in electronics, circuits, measurement, simulation software, and explanation of technical concepts through hands-on activities.",
  student_teaching:"Practical student training in electronics, circuits, measurement, simulation software, and explanation of technical concepts through hands-on activities.",
  teacher_training_and_professional_development_programs:"Professional-development activities for teachers, including applied electronics, measurement, laboratory practice, and instructional support.",
  teacher_training:"Professional-development activities for teachers, including applied electronics, measurement, laboratory practice, and instructional support.",
  "3d_printing_and_stem_laboratory_activities":"Engineering and STEM laboratory practice, including 3D printing, prototyping, fabrication, equipment use, and project-based technical work.",
  "3d_printing_stem":"Engineering and STEM laboratory practice, including 3D printing, prototyping, fabrication, equipment use, and project-based technical work.",
  technical_maintenance_and_troubleshooting_work:"Applied maintenance, diagnosis, testing, repair, and troubleshooting of electronic and technical equipment.",
  technical_maintenance:"Applied maintenance, diagnosis, testing, repair, and troubleshooting of electronic and technical equipment.",
  graduation_highlights:"Selected academic milestones and graduation-related documentation presented as supporting context rather than a personal photo album.",
  other:"Additional professional and academic material retained for contextual documentation and later refinement."
};

async function renderFinalMediaLibrary(){
  const mount=document.getElementById("mediaLibraryFinal");
  if(!mount) return;
  let data=await loadData();
  data=await hydrateAssetsWithStorage(data);
  const raw=uniqueRows(data.media||[],r=>r.asset_id||r.$id);
  const rows=raw.map(row=>({row,asset:publicAsset(data,row.asset_id)})).filter(x=>x.asset);
  const byCategory=new Map();
  rows.forEach(item=>{
    const key=String(item.row.category||"other").toLowerCase();
    if(key==="institutional_evidence") return;
    if(!byCategory.has(key))byCategory.set(key,[]);
    byCategory.get(key).push(item);
  });
  const keys=[...byCategory.keys()].sort((a,b)=>{
    const ia=FINAL_MEDIA_ORDER.indexOf(a),ib=FINAL_MEDIA_ORDER.indexOf(b);
    return (ia<0?999:ia)-(ib<0?999:ib) || a.localeCompare(b);
  });
  const imageCount=rows.filter(x=>x.asset.media_type==="image").length;
  const videoCount=rows.filter(x=>x.asset.media_type==="video").length;
  const fileCount=rows.filter(x=>!["image","video"].includes(x.asset.media_type)).length;
  const unresolved=rows.filter(x=>!x.asset.file_id).length;
  mount.innerHTML=`
    <div class="media-library-intro">
      <p>This library presents selected visual and documentary evidence by professional context. Each item is shown in a consistent viewing frame with a concise explanation underneath, while duplicate evidence is avoided whenever the same source already belongs to a publication, project, award, credential, recommendation, or institutional record.</p>
      <div class="media-library-note"><strong>Academic presentation rule.</strong><br>Media is contextual evidence, not a stand-alone photo album. Titles and descriptions explain why each item matters professionally or academically.</div>
    </div>
    <div class="asset-audit-strip"><span><strong>${rows.length}</strong>media records</span><span><strong>${imageCount}</strong>images</span><span><strong>${videoCount}</strong>videos</span><span><strong>${fileCount}</strong>documents / presentations</span></div>
    ${unresolved?`<div class="data-warning"><strong>${unresolved} media record${unresolved===1?"":"s"} could not be matched to a public Storage file.</strong> The page keeps the record visible rather than silently dropping it, so the missing Appwrite relationship can be corrected without losing context.</div>`:""}
    ${keys.length?keys.map((key,sectionIndex)=>{
      const items=byCategory.get(key)||[];
      return `<section class="media-category-section" id="media-${escapeAttr(key)}">
        <div class="media-category-head"><div><p class="section-label">Collection ${String(sectionIndex+1).padStart(2,"0")}</p><h3>${escapeHTML(mediaLabel(key))}</h3><p>${escapeHTML(FINAL_MEDIA_DESCRIPTIONS[key]||"Curated professional and academic media associated with this activity area.")}</p></div><span class="media-category-count">${items.length} item${items.length===1?"":"s"}</span></div>
        <div class="media-item-grid">${items.map(({row,asset})=>{
          const title=mediaTitle(row,asset),desc=mediaExplanation(row,asset),src=storageViewUrl(asset);
          return `<article class="media-item-card">
            <div class="media-fixed-frame">${renderFixedAssetFrame(asset,title)}</div>
            <div class="media-item-body">
              <div class="media-item-meta"><span>${escapeHTML(prettyCategory(asset.media_type||"file"))}</span>${row.year?`<span>${escapeHTML(row.year)}</span>`:""}</div>
              <h4>${escapeHTML(title)}</h4>
              <p class="media-item-description">${escapeHTML(desc)}</p>
              <div class="media-item-actions">${src?`<a class="text-link" href="${escapeAttr(src)}" target="_blank" rel="noopener">Open original ↗</a>`:""}</div>
            </div>
          </article>`;
        }).join("")}</div>
      </section>`;
    }).join(""):`<div class="empty-state"><h3>No public media records are linked yet</h3><p>The Appwrite Storage files may exist, but the website needs records in the media table that link each approved asset to its correct professional category.</p></div>`}
  `;
}

function evidenceExplanation(row){
  return row.description || row.summary || row.context || "Institutional source documenting the stated academic, teaching, research-mentorship, training, or professional activity.";
}

async function renderFinalInstitutionalEvidence(){
  const mount=document.getElementById("institutionalEvidenceFinal");
  if(!mount) return;
  let data=await loadData();
  data=await hydrateAssetsWithStorage(data);
  const rows=uniqueRows(data.institutionalEvidence||[],r=>r.source_url||r.asset_id||normalizedKey(r.title));
  if(!rows.length){
    mount.innerHTML=`<div class="empty-state"><h3>No institutional records are linked yet</h3><p>Add each verified post as a record with an academic description and its original source URL.</p></div>`;
    return;
  }
  mount.innerHTML=`<div class="evidence-library">${rows.map(r=>{
    const asset=publicAsset(data,r.asset_id);
    const title=r.title||"Institutional evidence";
    const source=r.source_url||"";
    const visual=asset?renderFixedAssetFrame(asset,title):`<div class="media-file-placeholder"><span class="media-file-icon">URL</span><strong>Original institutional source</strong><span>This record is verified through the linked post below.</span></div>`;
    return `<article class="evidence-academic-card">
      <div class="evidence-visual">${visual}</div>
      <div class="evidence-copy">
        <span class="evidence-label">${escapeHTML(prettyCategory(r.evidence_type||"Institutional Evidence"))}</span>
        <div class="evidence-copy-top"><h3>${escapeHTML(title)}</h3>${r.event_date&&r.event_date!=="null"?`<time class="evidence-date">${escapeHTML(formatDate(r.event_date,{year:"numeric",month:"short",day:"numeric"}))}</time>`:""}</div>
        ${r.institution?`<p class="evidence-institution">${escapeHTML(r.institution)}</p>`:""}
        <p class="evidence-description">${escapeHTML(evidenceExplanation(r))}</p>
        <div class="evidence-source-block"><span class="evidence-source-label">Original institutional post</span>${source?`<a class="evidence-source-link" href="${escapeAttr(source)}" target="_blank" rel="noopener">View the original post ↗</a>`:`<span class="evidence-date">Direct source URL not yet attached to this record.</span>`}</div>
      </div>
    </article>`;
  }).join("")}</div>`;
}

document.addEventListener("DOMContentLoaded",()=>{
  renderFinalMediaLibrary();
  renderFinalInstitutionalEvidence();
});
