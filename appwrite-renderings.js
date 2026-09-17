(() => {
  APPWRITE.tables.assetRenderings = "asset_renderings";

  const PUBLIC = "public";
  let SAFE_DATA_PROMISE = null;
  let SAFE_MODAL_STATE = { models: [], itemIndex: 0, pageIndex: 0, trigger: null };

  const renderingStyles = `
    .rendering-page-count{display:inline-flex;align-items:center;gap:5px;color:var(--muted);font-size:.68rem;font-weight:760}
    .private-evidence-note{margin-top:13px;padding:10px 12px;border-left:3px solid var(--border-strong);background:var(--surface-soft);color:var(--muted);font-size:.75rem;border-radius:0 6px 6px 0}
    .asset-window img,.asset-preview-full img{width:100%;height:100%;object-fit:contain;background:var(--surface-soft)}
    .asset-preview-full{display:flex;align-items:center;justify-content:center;min-height:58vh;max-height:72vh;background:var(--surface-soft);border:1px solid var(--border);border-radius:8px;overflow:hidden}
    .asset-preview-full img{max-height:72vh}
    .document-page-nav,.modal-item-nav{display:flex;align-items:center;justify-content:center;gap:10px;margin:12px 0 0}
    .document-page-nav button,.modal-item-nav button{border:1px solid var(--border);background:var(--surface);color:var(--text);border-radius:6px;padding:6px 10px;cursor:pointer;font-size:.72rem;font-weight:760}
    .document-page-nav button:disabled,.modal-item-nav button:disabled{opacity:.45;cursor:not-allowed}
    .document-page-nav span,.modal-item-nav span{min-width:82px;text-align:center;color:var(--muted);font-size:.72rem;font-weight:760}
    .asset-caption-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap}
    .github-media-empty{padding:18px 0;color:var(--muted);font-size:.82rem;border-top:1px solid var(--border)}
    @media (max-width:700px){.asset-preview-full{min-height:46vh;max-height:62vh}.asset-preview-full img{max-height:62vh}.document-page-nav{gap:6px}.document-page-nav button{padding:6px 8px}}
  `;

  const style = document.createElement("style");
  style.id = "appwrite-rendering-integration-styles";
  style.textContent = renderingStyles;
  document.head.appendChild(style);

  function publicRow(row) {
    return row && (!row.visibility || String(row.visibility).toLowerCase() === PUBLIC);
  }

  function normalizeRendering(row) {
    if (!row || !publicRow(row)) return null;
    const ids = asArray(row.display_file_ids);
    if (!ids.length) return null;
    return {
      ...row,
      display_file_ids: ids,
      page_count: Number(row.page_count) || ids.length
    };
  }

  loadData = function safeLoadData() {
    if (SAFE_DATA_PROMISE) return SAFE_DATA_PROMISE;
    SAFE_DATA_PROMISE = (async () => {
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
    return SAFE_DATA_PROMISE;
  };

  assetFor = function safeAssetFor(data, id) {
    if (!id) return null;
    return data.assetMap?.get(id) || null;
  };

  publicAsset = function safePublicAsset(data, id) {
    const asset = assetFor(data, id);
    return asset && publicRow(asset) ? asset : null;
  };

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
      visibility: PUBLIC,
      asset,
      rendering,
      display_file_ids: rendering.display_file_ids,
      render_type: rendering.render_type || "image",
      page_count: rendering.page_count || rendering.display_file_ids.length,
      _displayModel: true
    };
  }

  function modelForId(data, id) {
    return displayModelForAsset(data, publicAsset(data, id));
  }

  recordAssets = function safeRecordAssets(data, row) {
    const ids = assetIdsFromRecord(row);
    return uniqueRows(ids.map(id => {
      const model = modelForId(data, id);
      return model || { $id: `private:${id}`, _privateEvidence: true };
    }), item => item.$id);
  };

  function visibleModels(items) {
    return (items || []).filter(item => item && item._displayModel && item.display_file_ids?.length);
  }

  function hasPrivateEvidence(items) {
    return (items || []).some(item => item?._privateEvidence);
  }

  function displayKind(model) {
    const renderType = String(model?.render_type || "").toLowerCase();
    if (renderType === "pdf_pages") return "Document";
    if (renderType.includes("video")) return "Video";
    return "Image";
  }

  function renderingFileUrl(model, pageIndex = 0) {
    const fileId = model?.display_file_ids?.[pageIndex];
    return fileId ? storageFileView(fileId) : "";
  }

  function renderingPreviewMarkup(model, context = {}, pageIndex = 0) {
    if (!model?._displayModel) return "";
    const source = renderingFileUrl(model, pageIndex);
    const title = context.title || model.title || "Supporting evidence";
    const alt = model.alt_text || title;
    if (!source) return `<div class="asset-unavailable"><span>Preview</span><strong>${escapeHTML(title)}</strong><small>Public rendering unavailable</small></div>`;

    if (String(model.render_type || "").toLowerCase().includes("video") || String(model.media_type || "").toLowerCase() === "video") {
      return `<video controls preload="metadata" playsinline aria-label="${escapeAttr(title)}"><source src="${escapeAttr(source)}"></video>`;
    }
    return `<img src="${escapeAttr(source)}" alt="${escapeAttr(alt)}" loading="lazy" decoding="async">`;
  }

  assetWindowCard = function safeAssetWindowCard(model, context = {}, options = {}) {
    if (!model?._displayModel) return "";
    const title = context.title || model.title || "Supporting evidence";
    const description = context.description || context.caption || context.summary || model.description || "Verified supporting evidence linked to this academic or professional record.";
    const kind = displayKind(model);
    const className = options.compact ? " asset-evidence-card--compact" : "";
    const pages = model.display_file_ids.length;

    return `<figure class="asset-evidence-card${className}" data-asset-card="${escapeAttr(model.$id)}">
      <div class="asset-window asset-window--image">${renderingPreviewMarkup(model, context, 0)}</div>
      <figcaption class="asset-caption">
        <div class="asset-caption-head"><span>${escapeHTML(kind)}</span>${pages > 1 ? `<span class="rendering-page-count">${pages} pages</span>` : ""}${context.date ? `<time>${escapeHTML(context.date)}</time>` : ""}</div>
        <h4>${escapeHTML(title)}</h4>
        ${description ? `<p>${escapeHTML(description)}</p>` : ""}
        <div class="asset-caption-actions"><button class="text-button asset-open" type="button" data-display-asset="${escapeAttr(model.$id)}">${pages > 1 ? "View document" : "Open full view"}</button></div>
      </figcaption>
    </figure>`;
  };

  inlineAssetStrip = function safeInlineAssetStrip(data, items, context = {}, options = {}) {
    const models = uniqueRows(visibleModels(items), item => item.$id);
    if (!models.length) {
      return hasPrivateEvidence(items)
        ? `<div class="private-evidence-note" role="note">Supporting document retained privately for privacy.</div>`
        : "";
    }
    const max = options.max || models.length;
    return `<div class="record-asset-gallery${options.compact ? " record-asset-gallery--compact" : ""}">${models.slice(0, max).map(model => assetWindowCard(model, context, { compact: options.compact })).join("")}</div>`;
  };

  function modalCurrentModel() {
    return SAFE_MODAL_STATE.models[SAFE_MODAL_STATE.itemIndex] || null;
  }

  function clampPage(model, index) {
    const max = Math.max(0, (model?.display_file_ids?.length || 1) - 1);
    return Math.max(0, Math.min(index, max));
  }

  renderModalAsset = function safeRenderModalAsset() {
    const modal = ensureModal();
    const body = $("#mediaModalBody", modal);
    const heading = $("#mediaModalTitle", modal);
    const model = modalCurrentModel();
    if (!model) {
      body.innerHTML = "<p>Preview unavailable.</p>";
      return;
    }

    SAFE_MODAL_STATE.pageIndex = clampPage(model, SAFE_MODAL_STATE.pageIndex);
    const pages = model.display_file_ids.length;
    heading.textContent = model.title || "Document preview";

    const itemNav = SAFE_MODAL_STATE.models.length > 1 ? `<div class="modal-item-nav"><button type="button" data-modal-item-prev>← Previous item</button><span>${SAFE_MODAL_STATE.itemIndex + 1} / ${SAFE_MODAL_STATE.models.length}</span><button type="button" data-modal-item-next>Next item →</button></div>` : "";
    const pageNav = pages > 1 ? `<div class="document-page-nav"><button type="button" data-page-prev ${SAFE_MODAL_STATE.pageIndex === 0 ? "disabled" : ""}>← Previous</button><span>Page ${SAFE_MODAL_STATE.pageIndex + 1} / ${pages}</span><button type="button" data-page-next ${SAFE_MODAL_STATE.pageIndex >= pages - 1 ? "disabled" : ""}>Next →</button></div>` : "";

    body.innerHTML = `${itemNav}<div class="asset-preview-full">${renderingPreviewMarkup(model, {}, SAFE_MODAL_STATE.pageIndex)}</div>${pageNav}${model.description ? `<p class="modal-description">${escapeHTML(model.description)}</p>` : ""}`;

    $("[data-page-prev]", body)?.addEventListener("click", () => { SAFE_MODAL_STATE.pageIndex -= 1; renderModalAsset(); });
    $("[data-page-next]", body)?.addEventListener("click", () => { SAFE_MODAL_STATE.pageIndex += 1; renderModalAsset(); });
    $("[data-modal-item-prev]", body)?.addEventListener("click", () => {
      SAFE_MODAL_STATE.itemIndex = (SAFE_MODAL_STATE.itemIndex - 1 + SAFE_MODAL_STATE.models.length) % SAFE_MODAL_STATE.models.length;
      SAFE_MODAL_STATE.pageIndex = 0;
      renderModalAsset();
    });
    $("[data-modal-item-next]", body)?.addEventListener("click", () => {
      SAFE_MODAL_STATE.itemIndex = (SAFE_MODAL_STATE.itemIndex + 1) % SAFE_MODAL_STATE.models.length;
      SAFE_MODAL_STATE.pageIndex = 0;
      renderModalAsset();
    });
  };

  openAssetSet = function safeOpenAssetSet(models, trigger = null) {
    const clean = uniqueRows(visibleModels(models), model => model.$id);
    if (!clean.length) return;
    SAFE_MODAL_STATE = { models: clean, itemIndex: 0, pageIndex: 0, trigger };
    const modal = ensureModal();
    renderModalAsset();
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    setTimeout(() => $(".modal-close", modal)?.focus(), 0);
  };

  closeModal = function safeCloseModal() {
    const modal = $("#mediaModal");
    if (!modal) return;
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    const body = $("#mediaModalBody", modal);
    if (body) body.innerHTML = "";
    document.body.classList.remove("modal-open");
    SAFE_MODAL_STATE.trigger?.focus?.();
    SAFE_MODAL_STATE = { models: [], itemIndex: 0, pageIndex: 0, trigger: null };
  };

  bindAssetButtons = function safeBindAssetButtons(data) {
    $$("[data-display-asset]").forEach(button => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", () => {
        const model = modelForId(data, button.dataset.displayAsset);
        if (model) openAssetSet([model], button);
      });
    });
    $$("[data-asset-ids]").forEach(button => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", () => {
        const models = (button.dataset.assetIds || "").split("|").map(id => modelForId(data, id)).filter(Boolean);
        openAssetSet(models, button);
      });
    });
  };

  initModalKeyboard = function safeInitModalKeyboard() {
    window.addEventListener("keydown", event => {
      const modal = $("#mediaModal");
      if (!modal?.classList.contains("show")) return;
      if (event.key === "Escape") return closeModal();
      const model = modalCurrentModel();
      if (!model) return;
      if (event.key === "ArrowLeft" && SAFE_MODAL_STATE.pageIndex > 0) {
        SAFE_MODAL_STATE.pageIndex -= 1;
        renderModalAsset();
      }
      if (event.key === "ArrowRight" && SAFE_MODAL_STATE.pageIndex < model.display_file_ids.length - 1) {
        SAFE_MODAL_STATE.pageIndex += 1;
        renderModalAsset();
      }
    });
  };

  renderDocuments = async function safeRenderDocuments() {
    const root = $("#documentsList");
    if (!root) return;
    const data = await loadData();
    const used = data.referencedAssetIds || referencedAssetIds(data);
    const models = (data.assets || []).map(asset => displayModelForAsset(data, asset)).filter(Boolean).filter(model => !used.has(model.$id));
    if (!models.length) {
      root.innerHTML = `<div class="empty-state compact-empty"><h3>No duplicated document archive</h3><p>Public evidence is displayed inside the academic or professional record it supports. Private documents remain protected and are not exposed here.</p></div>`;
      return;
    }
    root.innerHTML = `<div class="asset-gallery-grid">${models.map(model => assetWindowCard(model)).join("")}</div>`;
    bindAssetButtons(data);
  };

  renderMedia = async function safeRenderMedia() {
    const root = $("#mediaLibrary");
    if (!root) return;
    root.innerHTML = `<div class="media-library-intro"><div><p class="section-label">GitHub Media Library</p><h3>Academic and professional media in context</h3><p>This library is maintained separately from the protected Appwrite academic-document archive. Media files are published from the dedicated GitHub media collections only.</p></div></div><div class="media-sections">${MEDIA_ORDER.filter(key => key !== "other").map((key, index) => { const meta = MEDIA_META[key]; return `<section class="media-category-section" id="media-${escapeAttr(key.replaceAll("_", "-"))}"><div class="media-category-heading"><div><span class="media-category-index">${String(index + 1).padStart(2, "0")}</span><div><h3>${escapeHTML(meta.title)}</h3><p>${escapeHTML(meta.description)}</p></div></div></div><div class="github-media-empty">No reviewed GitHub media files have been published in this category yet.</div></section>`; }).join("")}</div>`;
  };
})();
