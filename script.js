const SITE = {
  email: "salahfaisal589@gmail.com",
  scholar: "https://scholar.google.com/citations?hl=ar&user=kV3STigAAAAJ",
  orcid: "https://orcid.org/0009-0000-9485-7467"
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
    institutionalEvidence: "institutional_evidence"
  }
};

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const escapeHTML = (value="") => { const d=document.createElement("div"); d.textContent=String(value ?? ""); return d.innerHTML; };
const asBool = value => value === true || value === "true" || value === 1 || value === "1";
const sortRows = rows => [...rows].sort((a,b)=>(Number(a.sort_order)||999)-(Number(b.sort_order)||999));
function asArray(value){
  if(Array.isArray(value)) return value;
  if(value===null || value===undefined || value==="" || value==="null") return [];
  if(typeof value === "string"){
    try { const parsed=JSON.parse(value); if(Array.isArray(parsed)) return parsed; } catch {}
    return value.split(",").map(x=>x.trim()).filter(Boolean);
  }
  return [];
}
function prettyCategory(v=""){
  return String(v).replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase());
}
function safeDate(value){ if(!value || value==="null") return null; const d=new Date(value); return Number.isNaN(d.getTime())?null:d; }
function formatDate(value, options={year:"numeric",month:"short"}){ const d=safeDate(value); return d?d.toLocaleDateString("en-US",options):""; }
function formatExperienceRange(row){
  const start=safeDate(row.start_date), end=safeDate(row.end_date);
  const s=start?start.toLocaleDateString("en-US",{year:"numeric",month:"short"}):"";
  const e=asBool(row.current)?"Present":end?end.toLocaleDateString("en-US",{year:"numeric",month:"short"}):"";
  return [s,e].filter(Boolean).join(" – ") || "";
}
function queryString(method, values, column){ const q={method,values}; if(column) q.column=column; return JSON.stringify(q); }

async function fetchRows(tableId, {limit=100}={}){
  const url=new URL(`${APPWRITE.endpoint}/tablesdb/${APPWRITE.databaseId}/tables/${tableId}/rows`);
  url.searchParams.append("queries[]", queryString("limit",[limit]));
  url.searchParams.set("total","false");
  const response=await fetch(url,{headers:{"X-Appwrite-Project":APPWRITE.projectId,"Accept":"application/json"},cache:"no-store"});
  if(!response.ok) throw new Error(`${tableId}: HTTP ${response.status}`);
  const data=await response.json();
  return data.rows || data.documents || [];
}

let DATA_PROMISE;
function loadData(){
  if(DATA_PROMISE) return DATA_PROMISE;
  DATA_PROMISE=(async()=>{
    const entries=Object.entries(APPWRITE.tables);
    const settled=await Promise.allSettled(entries.map(([,id])=>fetchRows(id)));
    const data={errors:[]};
    settled.forEach((result,i)=>{
      const [key]=entries[i];
      if(result.status==="fulfilled") data[key]=sortRows(result.value.filter(r=>!r.visibility || r.visibility==="public"));
      else { data[key]=[]; data.errors.push(`${key}: ${result.reason?.message||"unavailable"}`); }
    });
    data.assetMap=new Map((data.assets||[]).map(a=>[a.$id,a]));
    return data;
  })();
  return DATA_PROMISE;
}

function storageViewUrl(asset){
  if(!asset?.file_id) return "";
  return `${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files/${encodeURIComponent(asset.file_id)}/view?project=${encodeURIComponent(APPWRITE.projectId)}`;
}
function storagePreviewUrl(asset,w=900,h=700){
  if(!asset?.file_id) return "";
  return `${APPWRITE.endpoint}/storage/buckets/${APPWRITE.bucketId}/files/${encodeURIComponent(asset.file_id)}/preview?width=${w}&height=${h}&project=${encodeURIComponent(APPWRITE.projectId)}`;
}
function assetFor(data,id){ return id ? data.assetMap.get(id) : null; }
function publicAsset(data,id){ const a=assetFor(data,id); return a && a.visibility==="public" ? a : null; }

function initYear(){ const el=$("#year"); if(el) el.textContent=new Date().getFullYear(); }
function initProfileImage(){ const img=$("#profilePhoto"), wrap=$("#profilePhotoWrap"); if(!img||!wrap)return; img.addEventListener("error",()=>wrap.classList.add("image-error")); if(img.complete&&img.naturalWidth===0)wrap.classList.add("image-error"); }
function setTheme(theme){document.documentElement.dataset.theme=theme;localStorage.setItem("theme",theme);$$('[data-theme-toggle],#themeToggle').forEach(b=>{const icon=b.querySelector('span:first-child');if(icon)icon.textContent=theme==='dark'?'☀':'◐';if(b.classList.contains('icon-only'))b.textContent=theme==='dark'?'☀':'◐';});}
function initTheme(){const stored=localStorage.getItem("theme");const preferred=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';setTheme(stored||preferred);$$('[data-theme-toggle],#themeToggle').forEach(b=>b.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark')));}
function initMobileNav(){const toggle=$("#menuToggle"),side=$("#sidebar"),backdrop=$("#sidebarBackdrop");if(!toggle||!side||!backdrop)return;const close=()=>{side.classList.remove('open');backdrop.hidden=true;document.body.classList.remove('nav-open');toggle.setAttribute('aria-expanded','false')};toggle.addEventListener('click',()=>{const open=!side.classList.contains('open');side.classList.toggle('open',open);backdrop.hidden=!open;document.body.classList.toggle('nav-open',open);toggle.setAttribute('aria-expanded',String(open))});backdrop.addEventListener('click',close);$$('.side-nav a').forEach(a=>a.addEventListener('click',close));window.addEventListener('keydown',e=>{if(e.key==='Escape')close()});}
function initReveal(){const els=$$('.reveal');if(!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('visible'));return;}const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});els.forEach(e=>io.observe(e));}
function initScrollUI(){const bar=$("#scrollProgress"),top=$("#backToTop");const update=()=>{const y=window.scrollY||0;const h=document.documentElement.scrollHeight-innerHeight;if(bar)bar.style.width=`${h>0?y/h*100:0}%`;if(top)top.classList.toggle('show',y>500)};addEventListener('scroll',update,{passive:true});update();if(top)top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));}
function showToast(msg){const t=$("#toast");if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove('show'),2200);}
function initCopyEmail(){const b=$("#copyEmail");if(!b)return;b.addEventListener('click',async()=>{const email=b.dataset.email||SITE.email;try{await navigator.clipboard.writeText(email);showToast('Email copied to clipboard')}catch{showToast(email)}});}
function initCvAvailability(){ $$('.cv-link').forEach(async a=>{try{const r=await fetch(a.getAttribute('href'),{method:'HEAD'});if(!r.ok){a.classList.add('unavailable');a.title='CV file unavailable';}}catch{}}); }
function initFilters(){ $$('.filter-toolbar').forEach(toolbar=>{if(toolbar.dataset.bound==='1')return;toolbar.dataset.bound='1';const target=document.getElementById(toolbar.dataset.filterTarget);if(!target)return;toolbar.addEventListener('click',e=>{const b=e.target.closest('.filter-btn');if(!b)return;$$('.filter-btn',toolbar).forEach(x=>x.classList.remove('active'));b.classList.add('active');const filter=b.dataset.filter;$$('.filter-item',target).forEach(item=>{const cats=(item.dataset.category||'').split(/\s+/);item.classList.toggle('is-hidden',filter!=='all'&&!cats.includes(filter));});});});}

function ensureModal(){
  let modal=$("#mediaModal");
  if(modal) return modal;
  document.body.insertAdjacentHTML('beforeend',`<div class="media-modal" id="mediaModal" aria-hidden="true"><div class="media-modal-backdrop" data-close-modal></div><div class="media-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="mediaModalTitle"><button class="modal-close" type="button" data-close-modal aria-label="Close preview">×</button><h2 id="mediaModalTitle">Document preview</h2><div id="mediaModalBody"></div></div></div>`);
  return $("#mediaModal");
}
function openAsset(asset,title){
  if(!asset || asset.visibility!=="public") return;
  const modal=ensureModal(), body=$("#mediaModalBody",modal), heading=$("#mediaModalTitle",modal);
  const src=storageViewUrl(asset); heading.textContent=title||asset.title||'Preview';
  if(asset.media_type==='pdf') body.innerHTML=`<iframe class="pdf-frame" src="${src}#toolbar=0&navpanes=0" title="${escapeHTML(title||asset.title||'PDF preview')}"></iframe>`;
  else if(asset.media_type==='image') body.innerHTML=`<img src="${storagePreviewUrl(asset,1400,1000)}" alt="${escapeHTML(asset.alt_text||title||asset.title||'Document image')}">`;
  else if(asset.media_type==='video') body.innerHTML=`<video controls preload="metadata"><source src="${src}"></video>`;
  else body.innerHTML=`<div class="empty-state"><h3>Preview unavailable</h3><p>This file type is not currently previewed in the browser.</p></div>`;
  modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
  $$('[data-close-modal]',modal).forEach(b=>b.onclick=()=>closeModal());
}
function closeModal(){const modal=$("#mediaModal");if(!modal)return;modal.classList.remove('show');modal.setAttribute('aria-hidden','true');const body=$("#mediaModalBody",modal);if(body)body.innerHTML='';document.body.classList.remove('modal-open');}
function initModalKeyboard(){window.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});}
function assetButton(asset,label='View document'){
  if(!asset || asset.visibility!=="public") return '';
  return `<button class="text-button asset-open" type="button" data-asset-id="${escapeHTML(asset.$id)}">${escapeHTML(label)}</button>`;
}
function bindAssetButtons(data){$$('[data-asset-id]').forEach(btn=>{if(btn.dataset.bound==='1')return;btn.dataset.bound='1';btn.addEventListener('click',()=>{const a=data.assetMap.get(btn.dataset.assetId);openAsset(a,btn.dataset.assetTitle||a?.title)});});}
function renderError(root,message='Live academic data is temporarily unavailable. Please refresh shortly.'){if(root)root.innerHTML=`<div class="empty-state"><h3>Data temporarily unavailable</h3><p>${escapeHTML(message)}</p></div>`;}

function highlightSelf(authors=''){
  const escaped=escapeHTML(authors);
  return escaped.replace(/Salah F\. S\. Saeed|Salah F\. S\. Saeed|S\. F\. S\. Saeed|S\. F\. Nasser/g,'<strong class="author-self">$&</strong>');
}

async function renderPublications(){
  const root=$("#publicationsList"); if(!root)return;
  const data=await loadData(); const rows=data.publications||[]; if(!rows.length){renderError(root);return;}
  const published=rows.filter(r=>r.status==='published'); const prep=rows.filter(r=>r.status!=='published');
  const ordered=[...published.sort((a,b)=>(Number(b.year)||0)-(Number(a.year)||0)||(Number(a.sort_order)||0)-(Number(b.sort_order)||0)),...prep];
  let idx=0; root.innerHTML=ordered.map(p=>{idx++;const cat=p.status==='published'?'published':'in_preparation';const asset=publicAsset(data,p.asset_id);return `<article class="publication-record filter-item" data-category="${cat}"><div class="publication-index">${String(idx).padStart(2,'0')}</div><div><div><span class="status-badge ${cat==='published'?'status-published':'status-prep'}">${cat==='published'?'Published':'In Preparation'}</span>${p.title.includes('Trust-by-Design')?'<span class="status-badge award-badge">Best Paper Award</span>':''}</div><h3>${escapeHTML(p.title)}</h3><p class="pub-authors">${highlightSelf(p.authors)}</p><p class="pub-venue">${escapeHTML(p.venue||'')}</p>${p.summary?`<p class="record-summary">${escapeHTML(p.summary)}</p>`:''}<div class="pub-actions">${p.doi_url?`<a href="${escapeHTML(p.doi_url)}" target="_blank" rel="noopener">DOI ↗</a>`:''}${asset?assetButton(asset,'View paper'):''}</div></div></article>`;}).join('');
  const s=$("#publicationsSummary"); if(s)s.innerHTML=`<span><strong>${published.length}</strong> published</span><span><strong>${prep.length}</strong> in preparation</span><span><strong>${rows.length}</strong> total works</span>`;
  bindAssetButtons(data); initFilters();
}

async function renderProjects(){
  const root=$("#projectsList"); if(!root)return;
  const data=await loadData(); const rows=data.projects||[]; if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map((p,i)=>{const assets=asArray(p.asset_ids).map(id=>publicAsset(data,id)).filter(Boolean);const tech=asArray(p.technologies);const tags=tech.length?tech:[prettyCategory(p.category)];return `<article class="project-record filter-item" id="${escapeHTML(p.slug||'')}" data-category="${escapeHTML(p.category||'other')}"><div class="project-top"><div><p class="record-type">${escapeHTML(prettyCategory(p.status||'project'))}</p><h3>${escapeHTML(p.title)}</h3></div><span class="publication-index">${String(i+1).padStart(2,'0')}</span></div><p class="project-summary">${escapeHTML(p.short_description||p.overview||'')}</p><div class="project-tags">${tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>${assets.length?`<div class="record-actions">${assets.map(a=>assetButton(a,a.asset_type==='project_document'?'View project report':'View evidence')).join('')}</div>`:''}<details class="project-details"><summary>Project details</summary><dl>${p.role?`<div><dt>Role</dt><dd>${escapeHTML(p.role)}</dd></div>`:''}${p.objectives?`<div><dt>Objectives</dt><dd>${escapeHTML(p.objectives)}</dd></div>`:''}${p.methodology?`<div><dt>Methodology</dt><dd>${escapeHTML(p.methodology)}</dd></div>`:''}${p.results?`<div><dt>Results / status</dt><dd>${escapeHTML(p.results)}</dd></div>`:''}${p.series?`<div><dt>Research series</dt><dd>${escapeHTML(p.series)}</dd></div>`:''}</dl></details></article>`}).join('');
  bindAssetButtons(data); initFilters();
}

async function renderAwards(){
  const root=$("#awardsList");if(!root)return;const data=await loadData();const rows=data.awards||[];if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map(a=>{const asset=publicAsset(data,a.asset_id);return `<article class="achievement-record"><time>${escapeHTML(a.year||'')}</time><div><p class="record-type">${escapeHTML(prettyCategory(a.category||'award'))}</p><h3>${escapeHTML(a.title)}</h3><p class="institution">${escapeHTML(a.issuer||'')}</p><p>${escapeHTML(a.description||'')}</p>${asset?`<div class="record-actions">${assetButton(asset,'View certificate')}</div>`:''}</div></article>`}).join('');
  const s=$("#awardsSummary");if(s)s.innerHTML=`<span><strong>${rows.length}</strong> awards & distinctions</span><span><strong>${rows.filter(r=>asBool(r.featured)).length}</strong> featured recognitions</span>`;bindAssetButtons(data);
}

async function renderCredentials(){
  const root=$("#credentialsList");if(!root)return;const data=await loadData();const rows=data.credentials||[];if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map(c=>{const main=publicAsset(data,c.asset_id);const supporting=asArray(c.supporting_asset_ids).map(id=>publicAsset(data,id)).filter(Boolean);return `<article class="credential-card filter-item" data-category="${escapeHTML(c.category||'other')}"><div class="credential-meta"><span>${escapeHTML(c.year||'')}</span><span>${escapeHTML(prettyCategory(c.category||''))}</span></div><h3>${escapeHTML(c.title)}</h3><p class="institution">${escapeHTML(c.issuer||'')}</p><p>${escapeHTML(c.description||'')}</p>${main||supporting.length?`<div class="record-actions">${main?assetButton(main,'View credential'):''}${supporting.map((a,i)=>assetButton(a,`Supporting certificate ${i+1}`)).join('')}</div>`:''}</article>`}).join('');bindAssetButtons(data);initFilters();
}

async function renderExperiences(){
  const root=$("#experienceList");if(!root)return;const data=await loadData();const rows=data.experiences||[];if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map(e=>{const responsibilities=asArray(e.responsibilities),tags=asArray(e.tags),evidence=asArray(e.evidence_asset_ids).map(id=>publicAsset(data,id)).filter(Boolean);return `<article class="timeline-record"><div class="record-date">${escapeHTML(formatExperienceRange(e))}</div><div class="record-body"><p class="record-type">${escapeHTML(prettyCategory(e.experience_type||'Experience'))}</p><h3>${escapeHTML(e.title)}</h3><p class="institution">${escapeHTML(e.organization||'')} · ${escapeHTML(e.location||'')}</p><p class="record-summary">${escapeHTML(e.summary||'')}</p>${responsibilities.length?`<ul class="record-bullets">${responsibilities.map(x=>`<li>${escapeHTML(x)}</li>`).join('')}</ul>`:''}${tags.length?`<div class="project-tags">${tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>`:''}${evidence.length?`<div class="record-actions">${evidence.map((a,i)=>assetButton(a,`View evidence ${evidence.length>1?i+1:''}`.trim())).join('')}</div>`:''}</div></article>`}).join('');bindAssetButtons(data);
}

async function renderRecommendations(){
  const root=$("#recommendationsList");if(!root)return;const data=await loadData();const rows=data.recommendations||[];if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map(r=>{const focus=asArray(r.focus_areas),asset=publicAsset(data,r.asset_id);return `<article class="recommendation-card"><div class="recommendation-head"><div><p class="record-type">Recommendation</p><h3>${escapeHTML(r.recommender_name||r.title)}</h3><p class="institution">${escapeHTML(r.recommender_title||'')} · ${escapeHTML(r.institution||'')}</p></div>${r.issued_date&&r.issued_date!=='null'?`<time>${escapeHTML(formatDate(r.issued_date,{year:'numeric',month:'short',day:'numeric'}))}</time>`:''}</div><p class="relationship-context">${escapeHTML(r.relationship_context||'')}</p><p>${escapeHTML(r.summary||'')}</p>${focus.length?`<div class="project-tags">${focus.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>`:''}${asset?`<div class="record-actions">${assetButton(asset,'View public letter')}</div>`:''}</article>`}).join('');bindAssetButtons(data);
}

async function renderInstitutionalEvidence(){
  const root=$("#institutionalEvidenceList");if(!root)return;const data=await loadData();const rows=data.institutionalEvidence||[];if(!rows.length){renderError(root);return;}
  root.innerHTML=rows.map(r=>`<article class="evidence-record"><div class="evidence-side"><span class="evidence-type">${escapeHTML(prettyCategory(r.evidence_type||'Institutional evidence'))}</span>${r.event_date&&r.event_date!=='null'?`<time>${escapeHTML(formatDate(r.event_date,{year:'numeric',month:'short',day:'numeric'}))}</time>`:''}</div><div><h3>${escapeHTML(r.title)}</h3><p class="institution">${escapeHTML(r.institution||'')}</p><p>${escapeHTML(r.description||'')}</p>${r.source_url?`<div class="record-actions"><a class="button button-secondary compact-button" href="${escapeHTML(r.source_url)}" target="_blank" rel="noopener">View Official Announcement ↗</a></div>`:''}</div></article>`).join('');
}

const DOCUMENT_TITLES=[
  "Academic Achievement Recognition — Taiz University",
  "English Language Instruction Certificate — Taiz University",
  "Vocational Diploma Final Result and National Ranking",
  "Certificate of Academic Distinction and Ranking",
  "English Subject Achievement Certificate",
  "Certificate of Appreciation — Al-Hasab Technical Institute",
  "English Beginner Certificate — Academic Sciences Institute",
  "English Beginner 1A Certificate — Global Language Institute",
  "English Basic 3 Certificate — Al-Kindi Institute"
];
async function renderDocuments(){
  const root=$("#documentsList");if(!root)return;const data=await loadData();const rows=DOCUMENT_TITLES.map(t=>(data.assets||[]).find(a=>a.title===t)).filter(Boolean);if(!rows.length){renderError(root,'No approved public supporting documents are currently available.');return;}
  root.innerHTML=rows.map(a=>`<article class="document-card"><div><p class="record-type">${escapeHTML(prettyCategory(a.asset_type||'Document'))}</p><h4>${escapeHTML(a.title)}</h4><p>${escapeHTML(a.description||'')}</p></div><div>${assetButton(a,a.media_type==='image'?'View document':'View PDF')}</div></article>`).join('');bindAssetButtons(data);
}

async function renderHome(){
  if(!$("#homeFeaturedPublications")&&!$("#metricPublications"))return;const data=await loadData();
  const pubs=(data.publications||[]).filter(r=>r.status==='published');const projects=data.projects||[];const awards=data.awards||[];
  const mp=$("#metricPublications"),mj=$("#metricProjects"),ma=$("#metricAwards");if(mp)mp.textContent=pubs.length||8;if(mj)mj.textContent=projects.length||7;if(ma)ma.textContent=awards.length||8;
  const pRoot=$("#homeFeaturedPublications");if(pRoot){const featured=pubs.filter(x=>asBool(x.featured)).slice(0,3);pRoot.innerHTML=featured.map(p=>`<article class="featured-card"><p class="record-type">${escapeHTML(p.year||'Published')}</p><h4>${escapeHTML(p.title)}</h4><p>${escapeHTML(p.summary||p.venue||'')}</p><a class="text-link" href="/publications/">View publication →</a></article>`).join('');}
  const jRoot=$("#homeFeaturedProjects");if(jRoot){const featured=projects.filter(x=>asBool(x.featured)).slice(0,3);jRoot.innerHTML=featured.map(p=>`<article class="featured-card"><p class="record-type">${escapeHTML(prettyCategory(p.category||'Project'))}</p><h4>${escapeHTML(p.title)}</h4><p>${escapeHTML(p.short_description||p.overview||'')}</p><a class="text-link" href="/projects/">View project →</a></article>`).join('');}
  const aRoot=$("#homeFeaturedAwards");if(aRoot){const featured=awards.filter(x=>asBool(x.featured)).slice(0,3);aRoot.innerHTML=featured.map(a=>`<article class="featured-card"><p class="record-type">${escapeHTML(a.year||'')}</p><h4>${escapeHTML(a.title)}</h4><p>${escapeHTML(a.issuer||'')}</p><a class="text-link" href="/awards/">View recognition →</a></article>`).join('');}
}

async function runDynamicRenderers(){
  const jobs=[renderHome(),renderPublications(),renderProjects(),renderAwards(),renderCredentials(),renderExperiences(),renderRecommendations(),renderInstitutionalEvidence(),renderDocuments()];
  await Promise.allSettled(jobs); initFilters();
}

document.addEventListener('DOMContentLoaded',()=>{
  initYear();initProfileImage();initTheme();initMobileNav();initReveal();initScrollUI();initCopyEmail();initCvAvailability();initModalKeyboard();
  runDynamicRenderers();
});
