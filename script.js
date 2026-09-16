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

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const escapeHTML = (value="") => {
  const d = document.createElement("div");
  d.textContent = String(value ?? "");
  return d.innerHTML;
};
const escapeAttr = escapeHTML;
const asBool = value => value === true || value === "true" || value === 1 || value === "1";
const safeDate = value => {
  if (!value || value === "null") return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};
const formatDate = (value, options={year:"numeric",month:"short"}) => {
  const d=safeDate(value);
  return d ? d.toLocaleDateString("en-US", options) : "";
};
const asArray = value => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value === null || value === undefined || value === "" || value === "null") return [];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.filter(Boolean);
    } catch {}
    return value.split(",").map(x => x.trim()).filter(Boolean);
  }
  return [];
};
const prettyCategory = (v="") => String(v)
  .replaceAll("_"," ")
  .replace(/\b\w/g,c=>c.toUpperCase());
const normalizedKey = value => String(value ?? "")
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g,"")
  .replace(/[^a-z0-9]+/g," ")
  .trim();
const sortRows = rows => [...rows].sort((a,b) =>
  (Number(a.sort_order) || 9999) - (Number(b.sort_order) || 9999)
);
function uniqueRows(rows, selector){
  const seen=new Set();
  return rows.filter(row=>{
    const key=selector(row);
    if(!key) return true;
    if(seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function formatExperienceRange(row){
  const start=safeDate(row.start_date), end=safeDate(row.end_date);
  const s=start?start.toLocaleDateString("en-US",{year:"numeric",month:"short"}):"";
  const e=asBool(row.current)?"Present":end?end.toLocaleDateString("en-US",{year:"numeric",month:"short"}):"";
  return [s,e].filter(Boolean).join(" – ");
}
function queryString(method, values, column){
  const q={method,values};
  if(column) q.column=column;
  return JSON.stringify(q);
}

async function fetchRows(tableId,{limit=100}={}){
  const url=new URL(`${APPWRITE.endpoint}/tablesdb/${APPWRITE.databaseId}/tables/${tableId}/rows`);
  url.searchParams.append("queries[]",queryString("limit",[limit]));
  url.searchParams.set("total","false");
  const response=await fetch(url,{
    headers:{"X-Appwrite-Project":APPWRITE.projectId,"Accept":"application/json"},
    cache:"no-store"
  });
  if(!response.ok) throw new Error(`${tableId}: HTTP ${response.status}`);
  const data=await response.json();
  return data.rows || data.documents || [];
}

async function fetchPublicStorageFiles({pageSize=100,maxPages=6}={}){
  const files=[];
  for(let page=0;page<maxPages;page++){
    const url=new URL(`${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files`);
    url.searchParams.append("queries[]",queryString("limit",[pageSize]));
    if(page>0) url.searchParams.append("queries[]",queryString("offset",[page*pageSize]));
    url.searchParams.set("total","false");
    const response=await fetch(url,{
      headers:{"X-Appwrite-Project":APPWRITE.projectId,"Accept":"application/json"},
      cache:"no-store"
    });
    if(!response.ok) throw new Error(`storage: HTTP ${response.status}`);
    const data=await response.json();
    const batch=data.files||[];
    files.push(...batch);
    if(batch.length<pageSize) break;
  }
  return files;
}
function mediaTypeFromFile(file,fallback=""){
  const mime=String(file?.mimeType||"").toLowerCase();
  const name=String(file?.name||"").toLowerCase();
  if(mime==="application/pdf" || name.endsWith(".pdf")) return "pdf";
  if(mime.startsWith("image/")) return "image";
  if(mime.startsWith("video/")) return "video";
  if(/\.(ppt|pptx)$/i.test(name)) return "presentation";
  return fallback;
}
function resolveStorageFile(asset,files){
  if(!asset?.$id || !Array.isArray(files) || !files.length) return null;
  const marker=String(asset.$id).slice(0,17);
  const candidates=files.filter(file=>String(file?.$id||"").includes(marker));
  if(!candidates.length) return null;
  const wanted=String(asset.media_type||"").toLowerCase();
  const score=file=>{
    const mime=String(file?.mimeType||"").toLowerCase();
    const name=String(file?.name||"").toLowerCase();
    let value=0;
    if(wanted==="pdf" && (mime==="application/pdf" || name.endsWith(".pdf"))) value+=100;
    if(wanted==="image" && mime.startsWith("image/")) value+=100;
    if(wanted==="video" && mime.startsWith("video/")) value+=100;
    if(wanted==="presentation" && /\.(ppt|pptx)$/i.test(name)) value+=100;
    if(mime==="application/pdf") value+=20;
    if(mime.startsWith("image/")) value+=10;
    if(/(?:page-?1|_001)\b/.test(name) || /_001$/.test(String(file?.$id||""))) value+=3;
    return value;
  };
  return [...candidates].sort((a,b)=>score(b)-score(a))[0]||null;
}

let DATA_PROMISE;
function loadData(){
  if(DATA_PROMISE) return DATA_PROMISE;
  DATA_PROMISE=(async()=>{
    const entries=Object.entries(APPWRITE.tables);
    const [tableResults,storageResults]=await Promise.all([
      Promise.allSettled(entries.map(([,id])=>fetchRows(id))),
      Promise.allSettled([fetchPublicStorageFiles()])
    ]);
    const data={errors:[]};
    tableResults.forEach((result,i)=>{
      const [key]=entries[i];
      if(result.status==="fulfilled"){
        data[key]=sortRows(result.value.filter(r=>!r.visibility || r.visibility==="public"));
      }else{
        data[key]=[];
        data.errors.push(`${key}: ${result.reason?.message||"unavailable"}`);
      }
    });
    const storageResult=storageResults[0];
    if(storageResult?.status==="fulfilled"){
      const storageFiles=storageResult.value;
      data.assets=(data.assets||[]).map(asset=>{
        const file=resolveStorageFile(asset,storageFiles);
        return file ? {
          ...asset,
          file_id:file.$id,
          media_type:mediaTypeFromFile(file,asset.media_type),
          _storage_resolved:true
        } : {...asset,_storage_resolved:false};
      });
    }else if(storageResult?.status==="rejected"){
      data.errors.push(`storage: ${storageResult.reason?.message||"unavailable"}`);
    }
    data.assetMap=new Map((data.assets||[]).map(a=>[a.$id,a]));
    return data;
  })();
  return DATA_PROMISE;
}
function assetFor(data,id){ return id ? data.assetMap.get(id) : null; }
function publicAsset(data,id){
  const a=assetFor(data,id);
  return a && a.visibility==="public" ? a : null;
}
function storageViewUrl(asset){
  if(!asset?.file_id) return "";
  return `${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files/${encodeURIComponent(asset.file_id)}/view?project=${encodeURIComponent(APPWRITE.projectId)}`;
}
function storagePreviewUrl(asset,w=1400,h=1000){
  if(!asset?.file_id) return "";
  return `${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files/${encodeURIComponent(asset.file_id)}/preview?width=${w}&height=${h}&project=${encodeURIComponent(APPWRITE.projectId)}`;
}

function pathActive(prefix){
  const p=location.pathname.replace(/\/+$/,"/") || "/";
  if(prefix==="/") return p==="/";
  return p.startsWith(prefix);
}
function activeAttr(prefix){
  return pathActive(prefix) ? ' class="is-current"' : "";
}
function initGlobalHeader(){
  if($("#academicHeader")) return;
  const header=document.createElement("header");
  header.id="academicHeader";
  header.className="academic-header";
  header.innerHTML=`
    <div class="header-shell">
      <a class="academic-brand" href="/" aria-label="Salah Faisal home">
        <span class="brand-monogram" aria-hidden="true">SF</span>
        <span class="brand-copy"><strong>Salah Faisal</strong><small>Academic · Engineering · Education</small></span>
      </a>
      <button class="global-menu-toggle" type="button" aria-controls="globalNav" aria-expanded="false">
        <span></span><span></span><span></span><span class="sr-only">Menu</span>
      </button>
      <nav class="global-nav" id="globalNav" aria-label="Primary navigation">
        <a href="/"${activeAttr("/")}>Home</a>
        <details class="nav-dropdown"${pathActive("/about/")||pathActive("/education/") ? " open" : ""}>
          <summary${pathActive("/about/")||pathActive("/education/") ? ' class="is-current"' : ""}>Profile</summary>
          <div class="nav-popover">
            <a href="/about/"${activeAttr("/about/")}>About</a>
            <a href="/education/"${activeAttr("/education/")}>Education</a>
          </div>
        </details>
        <details class="nav-dropdown"${pathActive("/research/")||pathActive("/publications/") ? " open" : ""}>
          <summary${pathActive("/research/")||pathActive("/publications/") ? ' class="is-current"' : ""}>Research</summary>
          <div class="nav-popover">
            <a href="/research/"${activeAttr("/research/")}>Research Areas</a>
            <a href="/publications/"${activeAttr("/publications/")}>Publications</a>
          </div>
        </details>
        <a href="/projects/"${activeAttr("/projects/")}>Projects</a>
        <a href="/teaching/"${activeAttr("/teaching/")}>Teaching</a>
        <a href="/experience/"${activeAttr("/experience/")}>Experience</a>
        <details class="nav-dropdown"${["/awards/","/credentials/","/media/","/recommendations/","/institutional-evidence/","/documents/"].some(pathActive) ? " open" : ""}>
          <summary${["/awards/","/credentials/","/media/","/recommendations/","/institutional-evidence/","/documents/"].some(pathActive) ? ' class="is-current"' : ""}>Portfolio</summary>
          <div class="nav-popover nav-popover-wide">
            <a href="/awards/"${activeAttr("/awards/")}><strong>Awards & Distinctions</strong><small>Major academic and professional recognition</small></a>
            <a href="/credentials/"${activeAttr("/credentials/")}><strong>Credentials</strong><small>Training, conferences and professional development</small></a>
            <a href="/media/"${activeAttr("/media/")}><strong>Media & Activities</strong><small>Curated visual evidence</small></a>
            <a href="/recommendations/"${activeAttr("/recommendations/")}><strong>Recommendations</strong><small>Academic, research and technical letters</small></a>
            <a href="/institutional-evidence/"${activeAttr("/institutional-evidence/")}><strong>Institutional Evidence</strong><small>Independent official sources</small></a>
            <a href="/documents/"${activeAttr("/documents/")}><strong>Documents</strong><small>Non-duplicated public verification archive</small></a>
          </div>
        </details>
        <a href="/contact/"${activeAttr("/contact/")}>Contact</a>
      </nav>
      <div class="header-actions">
        <a class="header-profile-link" href="${SITE.scholar}" target="_blank" rel="noopener">Scholar</a>
        <button class="header-theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme">◐</button>
        <a class="header-cv" href="/Salah_Faisal_CV.pdf" target="_blank" rel="noopener">CV</a>
      </div>
    </div>`;
  document.body.insertBefore(header,document.body.firstChild);

  const toggle=$(".global-menu-toggle",header);
  const nav=$("#globalNav",header);
  toggle?.addEventListener("click",()=>{
    const open=nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded",String(open));
    document.body.classList.toggle("global-nav-open",open);
  });
  $$(".global-nav a",header).forEach(a=>a.addEventListener("click",()=>{
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded","false");
    document.body.classList.remove("global-nav-open");
  }));
  document.addEventListener("click",e=>{
    if(!header.contains(e.target)) $$(".nav-dropdown[open]",header).forEach(d=>d.removeAttribute("open"));
  });
  window.addEventListener("keydown",e=>{
    if(e.key==="Escape"){
      $$(".nav-dropdown[open]",header).forEach(d=>d.removeAttribute("open"));
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded","false");
      document.body.classList.remove("global-nav-open");
    }
  });
}

function initYear(){ const el=$("#year"); if(el) el.textContent=new Date().getFullYear(); }
function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  localStorage.setItem("theme",theme);
  $$("[data-theme-toggle],#themeToggle").forEach(b=>{
    if(b.classList.contains("header-theme-toggle") || b.classList.contains("icon-only")) b.textContent=theme==="dark"?"☀":"◐";
    else {
      const icon=b.querySelector("span:first-child");
      if(icon) icon.textContent=theme==="dark"?"☀":"◐";
    }
  });
}
function initTheme(){
  const stored=localStorage.getItem("theme");
  const preferred=window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light";
  setTheme(stored||preferred);
  $$("[data-theme-toggle],#themeToggle").forEach(b=>{
    if(b.dataset.themeBound==="1") return;
    b.dataset.themeBound="1";
    b.addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark"));
  });
}
function initReveal(){
  const els=$$(".reveal");
  if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("visible"));return;}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target);}
  }),{threshold:.06});
  els.forEach(e=>io.observe(e));
}
function initScrollUI(){
  const bar=$("#scrollProgress"),top=$("#backToTop");
  const update=()=>{
    const y=window.scrollY||0;
    const h=document.documentElement.scrollHeight-innerHeight;
    if(bar) bar.style.width=`${h>0?y/h*100:0}%`;
    if(top) top.classList.toggle("show",y>600);
  };
  addEventListener("scroll",update,{passive:true});
  update();
  top?.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
}
function showToast(msg){
  const t=$("#toast");
  if(!t)return;
  t.textContent=msg;
  t.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer=setTimeout(()=>t.classList.remove("show"),2200);
}
function initCopyEmail(){
  const b=$("#copyEmail");
  if(!b)return;
  b.addEventListener("click",async()=>{
    const email=b.dataset.email||SITE.email;
    try{await navigator.clipboard.writeText(email);showToast("Email copied to clipboard");}
    catch{showToast(email);}
  });
}
function initCvAvailability(){
  $$(".cv-link").forEach(async a=>{
    try{
      const r=await fetch(a.getAttribute("href"),{method:"HEAD"});
      if(!r.ok){a.classList.add("unavailable");a.title="CV file unavailable";}
    }catch{}
  });
}
function initFilters(){
  $$(".filter-toolbar").forEach(toolbar=>{
    if(toolbar.dataset.bound==="1")return;
    toolbar.dataset.bound="1";
    const target=document.getElementById(toolbar.dataset.filterTarget);
    if(!target)return;
    toolbar.addEventListener("click",e=>{
      const b=e.target.closest(".filter-btn");
      if(!b)return;
      $$(".filter-btn",toolbar).forEach(x=>x.classList.remove("active"));
      b.classList.add("active");
      const filter=b.dataset.filter;
      $$(".filter-item",target).forEach(item=>{
        const cats=(item.dataset.category||"").split(/\s+/);
        item.classList.toggle("is-hidden",filter!=="all"&&!cats.includes(filter));
      });
    });
  });
}
function enhanceHome(){
  const intro=$(".home-intro");
  if(!intro || intro.dataset.enhanced==="1") return;
  intro.dataset.enhanced="1";
  const portrait=document.createElement("div");
  portrait.className="hero-portrait-card";
  portrait.innerHTML=`<img src="/myp.jpg" alt="Portrait of Salah Faisal Saeed Saeed"><span>Mechatronics · STEM · Research</span>`;
  intro.insertBefore(portrait,intro.firstChild);

  const pathways=document.createElement("section");
  pathways.className="section-block pathway-section reveal";
  pathways.innerHTML=`
    <div class="section-title-row"><div><p class="section-label">Explore by focus</p><h3>One profile, three professional pathways</h3></div></div>
    <div class="pathway-grid">
      <a class="pathway-card" href="/teaching/"><span class="pathway-index">01</span><strong>Teaching & STEM Education</strong><p>Physics, science, STEM/STEAM, ICT, technical instruction, laboratories and research mentorship.</p><span class="pathway-link">Explore teaching →</span></a>
      <a class="pathway-card" href="/projects/"><span class="pathway-index">02</span><strong>Engineering & Technology</strong><p>Mechatronics, robotics, automation, control, embedded systems, maintenance, energy and technical projects.</p><span class="pathway-link">Explore engineering →</span></a>
      <a class="pathway-card" href="/research/"><span class="pathway-index">03</span><strong>Research & Graduate Study</strong><p>Publications, research projects, academic collaboration, awards, evidence and interdisciplinary research interests.</p><span class="pathway-link">Explore research →</span></a>
    </div>`;
  intro.insertAdjacentElement("afterend",pathways);
}
function improvePageHeader(){
  const h=$(".page-header");
  if(!h || h.dataset.enhanced==="1") return;
  h.dataset.enhanced="1";
  const title=$("h2",h);
  if(title){
    const rule=document.createElement("div");
    rule.className="page-header-rule";
    title.insertAdjacentElement("afterend",rule);
  }
}

let modalState={assets:[],index:0,trigger:null,data:null};
function ensureModal(){
  let modal=$("#mediaModal");
  if(!modal){
    document.body.insertAdjacentHTML("beforeend",`
      <div class="media-modal" id="mediaModal" aria-hidden="true">
        <div class="media-modal-backdrop" data-close-modal></div>
        <div class="media-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="mediaModalTitle">
          <button class="modal-close" type="button" data-close-modal aria-label="Close preview">×</button>
          <h2 id="mediaModalTitle">Document preview</h2>
          <div id="mediaModalBody"></div>
        </div>
      </div>`);
    modal=$("#mediaModal");
  }
  if(modal.dataset.bound!=="1"){
    modal.dataset.bound="1";
    $$("[data-close-modal]",modal).forEach(b=>b.addEventListener("click",closeModal));
    modal.addEventListener("click",e=>{if(e.target.matches("[data-close-modal]"))closeModal();});
  }
  return modal;
}
function modalAssetMarkup(asset,title){
  const src=storageViewUrl(asset);
  const label=escapeHTML(title||asset.title||"Public document");
  const openLink=src?`<a class="button button-secondary compact-button" href="${escapeAttr(src)}" target="_blank" rel="noopener">Open original ↗</a>`:"";
  if(asset.media_type==="pdf"){
    return `<div class="asset-preview asset-preview-pdf"><iframe class="pdf-frame" src="${escapeAttr(src)}#toolbar=0&navpanes=0" title="${label}"></iframe></div><div class="modal-file-actions">${openLink}</div>`;
  }
  if(asset.media_type==="image"){
    return `<div class="asset-preview asset-preview-image"><img src="${escapeAttr(storagePreviewUrl(asset))}" alt="${escapeAttr(asset.alt_text||title||asset.title||"Document image")}"></div><div class="modal-file-actions">${openLink}</div>`;
  }
  if(asset.media_type==="video"){
    return `<div class="asset-preview asset-preview-video"><video controls preload="metadata"><source src="${escapeAttr(src)}"></video></div><div class="modal-file-actions">${openLink}</div>`;
  }
  return `<div class="empty-state compact-empty"><h3>Preview available as a file</h3><p>This file type is best opened in its original format.</p>${openLink}</div>`;
}
function renderModalAsset(){
  const modal=ensureModal(), body=$("#mediaModalBody",modal), heading=$("#mediaModalTitle",modal);
  const asset=modalState.assets[modalState.index];
  if(!asset){body.innerHTML="<p>Preview unavailable.</p>";return;}
  heading.textContent=asset.title||"Document preview";
  const controls=modalState.assets.length>1?`
    <div class="modal-gallery-nav">
      <button type="button" data-modal-prev aria-label="Previous item">← Previous</button>
      <span>${modalState.index+1} / ${modalState.assets.length}</span>
      <button type="button" data-modal-next aria-label="Next item">Next →</button>
    </div>`:"";
  body.innerHTML=`${controls}${modalAssetMarkup(asset,asset.title)}`;
  $("[data-modal-prev]",body)?.addEventListener("click",()=>{
    modalState.index=(modalState.index-1+modalState.assets.length)%modalState.assets.length;
    renderModalAsset();
  });
  $("[data-modal-next]",body)?.addEventListener("click",()=>{
    modalState.index=(modalState.index+1)%modalState.assets.length;
    renderModalAsset();
  });
}
function openAssetSet(assets,title,trigger=null){
  const clean=uniqueRows(assets.filter(a=>a&&a.visibility==="public"&&a.file_id),a=>a.$id||a.file_id);
  if(!clean.length) return;
  modalState={assets:clean,index:0,trigger,data:null};
  if(title && clean[0]) clean[0]={...clean[0],title:title||clean[0].title};
  const modal=ensureModal();
  renderModalAsset();
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
  setTimeout(()=>$(".modal-close",modal)?.focus(),0);
}
function closeModal(){
  const modal=$("#mediaModal");
  if(!modal)return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  const body=$("#mediaModalBody",modal);
  if(body) body.innerHTML="";
  document.body.classList.remove("modal-open");
  modalState.trigger?.focus?.();
  modalState={assets:[],index:0,trigger:null,data:null};
}
function initModalKeyboard(){
  window.addEventListener("keydown",e=>{
    const modal=$("#mediaModal");
    if(!modal?.classList.contains("show")) return;
    if(e.key==="Escape") closeModal();
    if(e.key==="ArrowLeft" && modalState.assets.length>1){
      modalState.index=(modalState.index-1+modalState.assets.length)%modalState.assets.length;renderModalAsset();
    }
    if(e.key==="ArrowRight" && modalState.assets.length>1){
      modalState.index=(modalState.index+1)%modalState.assets.length;renderModalAsset();
    }
  });
}
function assetSetButton(assets,label="View evidence",title=""){
  const ids=uniqueRows(assets.filter(Boolean),a=>a.$id).map(a=>a.$id);
  if(!ids.length) return "";
  return `<button class="text-button asset-open" type="button" data-asset-ids="${escapeAttr(ids.join("|"))}" data-asset-title="${escapeAttr(title)}">${escapeHTML(label)}</button>`;
}
function bindAssetButtons(data){
  $$("[data-asset-ids]").forEach(btn=>{
    if(btn.dataset.bound==="1")return;
    btn.dataset.bound="1";
    btn.addEventListener("click",()=>{
      const assets=(btn.dataset.assetIds||"").split("|").map(id=>data.assetMap.get(id)).filter(Boolean);
      openAssetSet(assets,btn.dataset.assetTitle||"",btn);
    });
  });
}
function renderError(root,message="Live academic data is temporarily unavailable. Please refresh shortly."){
  if(root) root.innerHTML=`<div class="empty-state"><h3>Data temporarily unavailable</h3><p>${escapeHTML(message)}</p></div>`;
}

function highlightSelf(authors=""){
  const escaped=escapeHTML(authors);
  return escaped.replace(/Salah F\. S\. Saeed|Salah F\. S\. Nasser|Salah Faisal Saeed Saeed|S\. F\. S\. Saeed|S\. F\. S\. Nasser/g,'<strong class="author-self">$&</strong>');
}

async function renderPublications(){
  const root=$("#publicationsList");
  if(!root)return;
  const data=await loadData();
  let rows=uniqueRows(data.publications||[],p=>normalizedKey(p.doi_url||p.title));
  if(!rows.length){renderError(root);return;}
  rows=[...rows].sort((a,b)=>{
    const ap=a.status==="published"?0:1, bp=b.status==="published"?0:1;
    return ap-bp || (Number(b.year)||0)-(Number(a.year)||0) || (Number(a.sort_order)||0)-(Number(b.sort_order)||0);
  });
  let idx=0;
  root.innerHTML=rows.map(p=>{
    idx++;
    const cat=p.status==="published"?"published":"in_preparation";
    const asset=publicAsset(data,p.asset_id);
    const isAward=/trust-by-design/i.test(p.title||"");
    const statusLabel=p.status==="published"?"Published":prettyCategory(p.status||"In preparation");
    return `<article class="publication-record filter-item" data-category="${cat}">
      <div class="publication-index">${String(idx).padStart(2,"0")}</div>
      <div class="publication-content">
        <div class="record-eyebrow"><span class="status-badge ${cat==="published"?"status-published":"status-prep"}">${escapeHTML(statusLabel)}</span>${isAward?'<span class="status-badge award-badge">Best Paper Award</span>':""}<span class="publication-year">${escapeHTML(p.year||"")}</span></div>
        <h3>${escapeHTML(p.title)}</h3>
        <p class="pub-authors">${highlightSelf(p.authors||"")}</p>
        <p class="pub-venue">${escapeHTML(p.venue||"")}</p>
        ${p.summary?`<p class="record-summary">${escapeHTML(p.summary)}</p>`:""}
        <div class="pub-actions">
          ${p.doi_url?`<a href="${escapeAttr(p.doi_url)}" target="_blank" rel="noopener">DOI / Publisher ↗</a>`:""}
          ${asset?assetSetButton([asset],"View paper",p.title):""}
        </div>
      </div>
    </article>`;
  }).join("");
  const published=rows.filter(r=>r.status==="published").length;
  const s=$("#publicationsSummary");
  if(s)s.innerHTML=`<span><strong>${published}</strong> published</span><span><strong>${rows.length-published}</strong> current works</span><span><strong>${rows.length}</strong> total records</span>`;
  bindAssetButtons(data);initFilters();
}

async function renderProjects(){
  const root=$("#projectsList");
  if(!root)return;
  const data=await loadData();
  const rows=uniqueRows(data.projects||[],p=>normalizedKey(p.slug||p.title));
  if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map((p,i)=>{
    const assets=uniqueRows([
      publicAsset(data,p.cover_asset_id),
      ...asArray(p.asset_ids).map(id=>publicAsset(data,id))
    ].filter(Boolean),a=>a.$id);
    const tech=asArray(p.technologies);
    const tags=tech.length?tech:[prettyCategory(p.category)];
    return `<article class="project-record filter-item" id="${escapeAttr(p.slug||"")}" data-category="${escapeAttr(p.category||"other")}">
      <div class="project-index">${String(i+1).padStart(2,"0")}</div>
      <div class="project-main">
        <div class="project-top">
          <div><p class="record-type">${escapeHTML(prettyCategory(p.status||"project"))}</p><h3>${escapeHTML(p.title)}</h3></div>
          ${p.year?`<time>${escapeHTML(p.year)}</time>`:""}
        </div>
        <p class="project-summary">${escapeHTML(p.short_description||p.overview||"")}</p>
        <div class="project-tags">${tags.filter(Boolean).slice(0,7).map(t=>`<span>${escapeHTML(t)}</span>`).join("")}</div>
        <div class="record-actions">
          ${assets.length?assetSetButton(assets,assets.length>1?`View evidence (${assets.length})`:"View evidence",p.title):""}
        </div>
        <details class="project-details"><summary>Project details</summary>
          <dl>
            ${p.role?`<div><dt>Role</dt><dd>${escapeHTML(p.role)}</dd></div>`:""}
            ${p.objectives?`<div><dt>Objectives</dt><dd>${escapeHTML(p.objectives)}</dd></div>`:""}
            ${p.methodology?`<div><dt>Methodology</dt><dd>${escapeHTML(p.methodology)}</dd></div>`:""}
            ${p.results?`<div><dt>Results / status</dt><dd>${escapeHTML(p.results)}</dd></div>`:""}
            ${p.series?`<div><dt>Research series</dt><dd>${escapeHTML(p.series)}</dd></div>`:""}
          </dl>
        </details>
      </div>
    </article>`;
  }).join("");
  bindAssetButtons(data);initFilters();
}

async function renderAwards(){
  const root=$("#awardsList");
  if(!root)return;
  const data=await loadData();
  let rows=uniqueRows(data.awards||[],a=>a.asset_id||normalizedKey(a.title));
  if(!rows.length){renderError(root);return;}
  rows=[...rows].sort((a,b)=>Number(asBool(b.featured))-Number(asBool(a.featured)) || (Number(b.year)||0)-(Number(a.year)||0));
  root.innerHTML=rows.map(a=>{
    const asset=publicAsset(data,a.asset_id);
    const major=/best paper|distinction|rank|national/i.test(a.title||"") || asBool(a.featured);
    return `<article class="achievement-record ${major?"major-recognition":""}">
      <div class="achievement-date"><time>${escapeHTML(a.year||"")}</time><span>${escapeHTML(prettyCategory(a.category||"Recognition"))}</span></div>
      <div class="achievement-main">
        <h3>${escapeHTML(a.title)}</h3>
        <p class="institution">${escapeHTML(a.issuer||"")}</p>
        ${a.description?`<p>${escapeHTML(a.description)}</p>`:""}
        ${asset?`<div class="record-actions">${assetSetButton([asset],"View verified evidence",a.title)}</div>`:""}
      </div>
    </article>`;
  }).join("");
  const s=$("#awardsSummary");
  if(s)s.innerHTML=`<span><strong>${rows.length}</strong> verified recognitions</span><span><strong>${rows.filter(r=>asBool(r.featured)).length}</strong> featured distinctions</span>`;
  bindAssetButtons(data);
}

async function renderCredentials(){
  const root=$("#credentialsList");
  if(!root)return;
  const data=await loadData();
  const awardAssetIds=new Set((data.awards||[]).map(a=>a.asset_id).filter(Boolean));
  const awardTitles=new Set((data.awards||[]).map(a=>normalizedKey(a.title)).filter(Boolean));
  let rows=(data.credentials||[]).filter(c=>!awardAssetIds.has(c.asset_id)&&!awardTitles.has(normalizedKey(c.title)));
  rows=uniqueRows(rows,c=>c.asset_id||normalizedKey(c.title));
  if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map(c=>{
    const main=publicAsset(data,c.asset_id);
    const supporting=asArray(c.supporting_asset_ids).map(id=>publicAsset(data,id)).filter(Boolean);
    const assets=uniqueRows([main,...supporting].filter(Boolean),a=>a.$id);
    const label=assets.length>1?`View credential set (${assets.length})`:"View credential";
    return `<article class="credential-card filter-item" data-category="${escapeAttr(c.category||"other")}">
      <div class="credential-meta"><span>${escapeHTML(c.year||"")}</span><span>${escapeHTML(prettyCategory(c.category||"Credential"))}</span></div>
      <h3>${escapeHTML(c.title)}</h3>
      <p class="institution">${escapeHTML(c.issuer||"")}</p>
      ${c.description?`<p>${escapeHTML(c.description)}</p>`:""}
      ${assets.length?`<div class="record-actions">${assetSetButton(assets,label,c.title)}</div>`:""}
    </article>`;
  }).join("");
  bindAssetButtons(data);initFilters();
}

async function renderExperiences(){
  const root=$("#experienceList");
  if(!root)return;
  const data=await loadData();
  const rows=uniqueRows(data.experiences||[],e=>normalizedKey(e.slug||e.title));
  if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map(e=>{
    const responsibilities=asArray(e.responsibilities);
    const tags=asArray(e.tags);
    const evidence=asArray(e.evidence_asset_ids).map(id=>publicAsset(data,id)).filter(Boolean);
    return `<article class="timeline-record">
      <div class="record-date">${escapeHTML(formatExperienceRange(e))}</div>
      <div class="record-body">
        <p class="record-type">${escapeHTML(prettyCategory(e.experience_type||"Experience"))}</p>
        <h3>${escapeHTML(e.title)}</h3>
        <p class="institution">${escapeHTML(e.organization||"")}${e.location?` · ${escapeHTML(e.location)}`:""}</p>
        ${e.summary?`<p class="record-summary">${escapeHTML(e.summary)}</p>`:""}
        ${responsibilities.length?`<ul class="record-bullets">${responsibilities.map(x=>`<li>${escapeHTML(x)}</li>`).join("")}</ul>`:""}
        ${tags.length?`<div class="project-tags">${tags.map(t=>`<span>${escapeHTML(t)}</span>`).join("")}</div>`:""}
        ${evidence.length?`<div class="record-actions">${assetSetButton(evidence,evidence.length>1?`View evidence set (${evidence.length})`:"View evidence",e.title)}</div>`:""}
      </div>
    </article>`;
  }).join("");
  bindAssetButtons(data);
}

async function renderRecommendations(){
  const root=$("#recommendationsList");
  if(!root)return;
  const data=await loadData();
  const rows=uniqueRows(data.recommendations||[],r=>normalizedKey(r.slug||r.title));
  if(!rows.length){renderError(root);return;}
  const groups=new Map();
  rows.forEach(r=>{
    const key=r.asset_id||r.$id;
    if(!groups.has(key)) groups.set(key,[]);
    groups.get(key).push(r);
  });
  root.innerHTML=[...groups.values()].map(group=>{
    const first=group[0];
    const asset=publicAsset(data,first.asset_id);
    const multi=group.length>1;
    return `<article class="recommendation-card ${multi?"recommendation-group":""}">
      <div class="recommendation-head">
        <div>
          <p class="record-type">${multi?`${group.length} recommendations · one verified file`:"Recommendation"}</p>
          <h3>${escapeHTML(multi?"Academic & Technical Recommendations":first.title)}</h3>
        </div>
        ${first.issued_date&&first.issued_date!=="null"?`<time>${escapeHTML(formatDate(first.issued_date,{year:"numeric",month:"short",day:"numeric"}))}</time>`:""}
      </div>
      <div class="recommendation-entries">
        ${group.map(r=>`<div class="recommendation-entry">
          <h4>${escapeHTML(r.recommender_name||r.title)}</h4>
          <p class="institution">${escapeHTML(r.recommender_title||"")}${r.institution?` · ${escapeHTML(r.institution)}`:""}</p>
          ${r.relationship_context?`<p class="relationship-context">${escapeHTML(r.relationship_context)}</p>`:""}
          ${r.summary?`<p>${escapeHTML(r.summary)}</p>`:""}
          ${asArray(r.focus_areas).length?`<div class="project-tags">${asArray(r.focus_areas).map(t=>`<span>${escapeHTML(t)}</span>`).join("")}</div>`:""}
        </div>`).join("")}
      </div>
      ${asset?`<div class="record-actions">${assetSetButton([asset],multi?"View recommendation file":"View public letter",multi?"Academic & Technical Recommendations":first.title)}</div>`:""}
    </article>`;
  }).join("");
  bindAssetButtons(data);
}

async function renderInstitutionalEvidence(){
  const root=$("#institutionalEvidenceList");
  if(!root)return;
  const data=await loadData();
  const rows=uniqueRows(data.institutionalEvidence||[],r=>r.source_url||r.asset_id||normalizedKey(r.title));
  if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map(r=>{
    const asset=publicAsset(data,r.asset_id);
    return `<article class="evidence-record">
      <div class="evidence-side">
        <span class="evidence-type">${escapeHTML(prettyCategory(r.evidence_type||"Institutional evidence"))}</span>
        ${r.event_date&&r.event_date!=="null"?`<time>${escapeHTML(formatDate(r.event_date,{year:"numeric",month:"short",day:"numeric"}))}</time>`:""}
      </div>
      <div class="evidence-main">
        <h3>${escapeHTML(r.title)}</h3>
        <p class="institution">${escapeHTML(r.institution||"")}</p>
        ${r.description?`<p>${escapeHTML(r.description)}</p>`:""}
        <div class="record-actions">
          ${r.source_url?`<a class="button button-secondary compact-button" href="${escapeAttr(r.source_url)}" target="_blank" rel="noopener">Official source ↗</a>`:""}
          ${asset?assetSetButton([asset],"View evidence",r.title):""}
        </div>
      </div>
    </article>`;
  }).join("");
  bindAssetButtons(data);
}

function referencedAssetIds(data){
  const ids=new Set();
  const add=id=>{if(id)ids.add(id);};
  (data.publications||[]).forEach(r=>add(r.asset_id));
  (data.projects||[]).forEach(r=>{add(r.cover_asset_id);asArray(r.asset_ids).forEach(add);});
  (data.awards||[]).forEach(r=>add(r.asset_id));
  (data.credentials||[]).forEach(r=>{add(r.asset_id);asArray(r.supporting_asset_ids).forEach(add);});
  (data.experiences||[]).forEach(r=>asArray(r.evidence_asset_ids).forEach(add));
  (data.recommendations||[]).forEach(r=>add(r.asset_id));
  (data.institutionalEvidence||[]).forEach(r=>add(r.asset_id));
  (data.media||[]).forEach(r=>add(r.asset_id));
  return ids;
}
async function renderDocuments(){
  const root=$("#documentsList");
  if(!root)return;
  const data=await loadData();
  const used=referencedAssetIds(data);
  let rows=(data.assets||[]).filter(a=>a.visibility==="public"&&!used.has(a.$id));
  rows=uniqueRows(rows,a=>a.$id||a.file_id||normalizedKey(a.title));
  if(!rows.length){
    root.innerHTML=`<div class="empty-state compact-empty"><h3>No duplicated document archive</h3><p>Public evidence is attached directly to the relevant award, credential, experience, publication, or recommendation. This page intentionally avoids repeating the same document in multiple places.</p></div>`;
    return;
  }
  root.innerHTML=rows.map(a=>`<article class="document-card">
    <div><p class="record-type">${escapeHTML(prettyCategory(a.asset_type||"Document"))}</p><h4>${escapeHTML(a.title)}</h4><p>${escapeHTML(a.description||"")}</p></div>
    <div>${assetSetButton([a],a.media_type==="image"?"View document":"View file",a.title)}</div>
  </article>`).join("");
  bindAssetButtons(data);
}

const MEDIA_LABELS={
  student_videos_and_conference_presentations:"Student Research & Conference Presentations",
  student_conference_presentations:"Student Research & Conference Presentations",
  student_teaching_and_practical_training_activities:"Student Teaching & Practical Training",
  student_teaching:"Student Teaching & Practical Training",
  teacher_training_and_professional_development_programs:"Teacher Training & Professional Development",
  teacher_training:"Teacher Training & Professional Development",
  "3d_printing_and_stem_laboratory_activities":"3D Printing & STEM Laboratory Activities",
  "3d_printing_stem":"3D Printing & STEM Laboratory Activities",
  technical_maintenance_and_troubleshooting_work:"Technical Maintenance & Troubleshooting",
  technical_maintenance:"Technical Maintenance & Troubleshooting",
  graduation_highlights:"Graduation Highlights",
  institutional_evidence:"Institutional Evidence",
  other:"Other"
};
function mediaLabel(category){ return MEDIA_LABELS[String(category||"").toLowerCase()]||prettyCategory(category||"Media"); }
async function renderMedia(){
  const placeholder=$(".media-deferred");
  if(!placeholder)return;
  const data=await loadData();
  const rows=uniqueRows(data.media||[],r=>r.asset_id||r.$id);
  if(!rows.length)return;
  const groups=new Map();
  rows.forEach(row=>{
    const asset=publicAsset(data,row.asset_id);
    if(!asset)return;
    const key=row.category||"other";
    if(!groups.has(key))groups.set(key,[]);
    groups.get(key).push({row,asset});
  });
  if(!groups.size)return;
  const section=placeholder.closest(".section-block")||placeholder.parentElement;
  section.innerHTML=`
    <div class="media-intro-note"><strong>Curated media library.</strong> Files are grouped by professional context so the same visual evidence is not repeated across multiple windows.</div>
    <div class="media-collection-grid">
      ${[...groups.entries()].map(([key,items],i)=>{
        const image=items.find(x=>x.asset.media_type==="image")?.asset;
        const thumb=image?storagePreviewUrl(image,800,520):"";
        return `<button class="media-collection-card" type="button" data-media-category="${escapeAttr(key)}">
          <span class="media-cover"${thumb?` style="background-image:url('${escapeAttr(thumb)}')"`:""}>${thumb?"":String(i+1).padStart(2,"0")}</span>
          <span class="media-collection-copy"><strong>${escapeHTML(mediaLabel(key))}</strong><small>${items.length} approved item${items.length===1?"":"s"}</small></span>
          <span class="media-arrow">View collection →</span>
        </button>`;
      }).join("")}
    </div>`;
  $$(".media-collection-card",section).forEach(btn=>{
    btn.addEventListener("click",()=>{
      const items=groups.get(btn.dataset.mediaCategory)||[];
      openAssetSet(items.map(x=>x.asset),mediaLabel(btn.dataset.mediaCategory),btn);
    });
  });
}

async function renderHome(){
  if(!$("#homeFeaturedPublications")&&!$("#metricPublications"))return;
  const data=await loadData();
  const pubs=uniqueRows((data.publications||[]).filter(r=>r.status==="published"),p=>normalizedKey(p.doi_url||p.title));
  const projects=uniqueRows(data.projects||[],p=>normalizedKey(p.slug||p.title));
  const awards=uniqueRows(data.awards||[],a=>a.asset_id||normalizedKey(a.title));
  const mp=$("#metricPublications"),mj=$("#metricProjects"),ma=$("#metricAwards");
  if(mp)mp.textContent=pubs.length||8;
  if(mj)mj.textContent=projects.length||7;
  if(ma)ma.textContent=awards.length||0;

  const pRoot=$("#homeFeaturedPublications");
  if(pRoot){
    const featured=(pubs.filter(x=>asBool(x.featured)).length?pubs.filter(x=>asBool(x.featured)):pubs).slice(0,3);
    pRoot.innerHTML=featured.map(p=>`<article class="featured-card"><p class="record-type">${escapeHTML(p.year||"Published")}</p><h4>${escapeHTML(p.title)}</h4><p>${escapeHTML(p.summary||p.venue||"")}</p><a class="text-link" href="/publications/">View publication →</a></article>`).join("");
  }
  const jRoot=$("#homeFeaturedProjects");
  if(jRoot){
    const featured=(projects.filter(x=>asBool(x.featured)).length?projects.filter(x=>asBool(x.featured)):projects).slice(0,3);
    jRoot.innerHTML=featured.map(p=>`<article class="featured-card"><p class="record-type">${escapeHTML(prettyCategory(p.category||"Project"))}</p><h4>${escapeHTML(p.title)}</h4><p>${escapeHTML(p.short_description||p.overview||"")}</p><a class="text-link" href="/projects/">View project →</a></article>`).join("");
  }
  const aRoot=$("#homeFeaturedAwards");
  if(aRoot){
    const featured=(awards.filter(x=>asBool(x.featured)).length?awards.filter(x=>asBool(x.featured)):awards).slice(0,3);
    aRoot.innerHTML=featured.map(a=>`<article class="featured-card recognition-card"><p class="record-type">${escapeHTML(a.year||"")}</p><h4>${escapeHTML(a.title)}</h4><p>${escapeHTML(a.issuer||"")}</p><a class="text-link" href="/awards/">View recognition →</a></article>`).join("");
  }
}

async function runDynamicRenderers(){
  const jobs=[
    renderHome(),renderPublications(),renderProjects(),renderAwards(),renderCredentials(),
    renderExperiences(),renderRecommendations(),renderInstitutionalEvidence(),renderDocuments(),renderMedia()
  ];
  await Promise.allSettled(jobs);
  initFilters();
}

document.addEventListener("DOMContentLoaded",()=>{
  initGlobalHeader();
  initTheme();
  initYear();
  initReveal();
  initScrollUI();
  initCopyEmail();
  initCvAvailability();
  initModalKeyboard();
  enhanceHome();
  improvePageHeader();
  runDynamicRenderers();
});
