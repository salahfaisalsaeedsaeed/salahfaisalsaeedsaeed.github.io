# Appwrite Rendering Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the website’s direct/original Appwrite Storage display path with the finalized `record → asset → asset_renderings → safe public rendering` flow while keeping private assets non-displayable and preserving the current academic UI.

**Architecture:** Keep the current page structure and renderers, but refactor `script.js` so public academic records resolve assets through `asset_renderings` and render only `display_file_ids`. Remove synthetic Storage-file discovery and any public “Open original” behavior. Add a compact internal multipage viewer for PDF-derived page images, including the 145-page graduation report, while private linked records remain visible without exposing document files.

**Tech Stack:** Static HTML/CSS/JavaScript, Appwrite TablesDB + Storage, GitHub Pages/Vercel static deployment.

**Spec:** `docs/superpowers/specs/2026-09-17-appwrite-rendering-integration-design.md`

## Global Constraints

- Appwrite project: `6a90545d002d8d1ed109`.
- Appwrite database: `6a919743003b7658ee49`.
- Storage bucket: `academic_media`.
- All 59 Assets are record-linked; 41 are public-display-ready and 18 are intentionally private.
- Public display must use `asset_renderings.display_file_ids`, never `assets.file_id`.
- Original files remain private and must not be linked from the website.
- Do not modify Appwrite data from the frontend.
- Do not merge GitHub Media & Activities into Appwrite.
- Institutional Evidence remains independent from Appwrite assets except where an already-public supporting asset is intentionally linked.
- No PowerPoint/PPTX handling is required for Appwrite Assets.
- Keep `needs_review`/private assets out of public file rendering.
- Preserve the existing academic visual design; change only the data-binding/viewer behavior needed for safe rendering.

---

### Task 1: Load and index `asset_renderings`

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: existing `fetchRows`, `APPWRITE.tables`, Appwrite row objects.
- Produces: `data.assetRenderings`, `data.renderingMap`, `renderingsForAsset(data, assetId)`, `primaryRenderingForAsset(data, assetId)`.

- [ ] **Step 1: Add `assetRenderings: "asset_renderings"` to `APPWRITE.tables`.**
- [ ] **Step 2: Keep the existing generic `fetchRows` path so the new table is loaded with the other tables.**
- [ ] **Step 3: Build `renderingMap` keyed by `asset_id`, filtering to public rows only through the same public-data path.**
- [ ] **Step 4: Add helpers that normalize `display_file_ids` with `asArray()` and return rendering rows sorted by `render_type`/page order metadata when present.**
- [ ] **Step 5: Verify statically that no helper falls back to `assets.file_id` for public display.**

### Task 2: Remove unsafe Storage discovery and synthetic public assets

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: `data.assets`, `data.assetRenderings`.
- Produces: `data.assetMap` containing only real Appwrite Asset rows; no synthetic Storage rows.

- [ ] **Step 1: Remove `fetchPublicStorageFiles()` from `loadData()` and stop listing public bucket files for asset discovery.**
- [ ] **Step 2: Remove the synthetic-row branch in `enrichAssets()` and simplify asset enrichment so real Asset rows are preserved without Storage guessing.**
- [ ] **Step 3: Remove/retire `resolveStorageFile`, `bestStorageCandidate`, and `_synthetic`/`_storage_meta` display dependencies if no longer referenced.**
- [ ] **Step 4: Keep `storageFileView(fileId)` as a rendering-file URL builder only.**
- [ ] **Step 5: Confirm that orphan/unlinked Storage files cannot appear in Documents or Media through inference.**

### Task 3: Make public asset resolution rendering-aware

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: record Asset IDs, `data.assetMap`, `data.renderingMap`.
- Produces: public display model with `display_file_ids`, `render_type`, `page_count`; private linked assets return metadata-only/no display model.

- [ ] **Step 1: Update `publicAsset(data, id)` to require the Asset row itself to be public.**
- [ ] **Step 2: Add `displayModelForAsset(data, asset)` that attaches the public rendering and normalized `display_file_ids`.**
- [ ] **Step 3: Update `recordAssets()` so only public Assets with public renderings become visual evidence cards.**
- [ ] **Step 4: Add `privateRecordAssetIds(data, row)` to detect linked Assets that exist but are intentionally private, for optional metadata-only privacy messaging.**
- [ ] **Step 5: Ensure publication/project/award/credential/experience/recommendation renderers never request private file URLs.**

### Task 4: Replace the asset viewer with rendering-file display

**Files:**
- Modify: `script.js`
- Modify: `style.css`

**Interfaces:**
- Consumes: display model `{ asset, rendering, display_file_ids, render_type, page_count }`.
- Produces: `assetWindowCard(...)`, `renderingPreviewMarkup(...)`, internal modal/page viewer.

- [ ] **Step 1: Replace `assetPreviewMarkup(asset, ...)` with rendering-aware preview logic.**
- [ ] **Step 2: For `image` renderings, display the first public `display_file_id` in the fixed frame.**
- [ ] **Step 3: For `pdf_pages`, display page 1 in the fixed frame and show page count.**
- [ ] **Step 4: Replace “Open original ↗” with no external Storage link. Keep only an internal “View document”/“Open full view” action.**
- [ ] **Step 5: Update the modal to navigate `display_file_ids` with Previous/Next buttons, page number, keyboard arrows, and no original-file action.**
- [ ] **Step 6: Add CSS for the page navigator and make large document pages fit with `object-fit: contain`.**
- [ ] **Step 7: Ensure the 145-page graduation report loads one page at a time rather than inserting all 145 images into the DOM.**

### Task 5: Preserve private evidence without exposing files

**Files:**
- Modify: `script.js`
- Modify: `style.css`

**Interfaces:**
- Consumes: record rows and linked private Asset IDs.
- Produces: optional metadata-only note such as `Supporting document retained privately for privacy.`

- [ ] **Step 1: Add a small `privateEvidenceNote(...)` helper.**
- [ ] **Step 2: Show the note only on records that have linked private Assets and no public visual rendering.**
- [ ] **Step 3: Do not expose Asset IDs, file IDs, signatures, contact data, or Storage URLs in the rendered page.**
- [ ] **Step 4: Add restrained styling consistent with the academic design.**

### Task 6: Correct publication visibility and no-duplication behavior

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: publication visibility/status, rendering-aware record assets.
- Produces: only approved public publication records; no synthetic/duplicate Documents entries.

- [ ] **Step 1: Keep `needs_review`/non-public publication records out of public rendering even if an Asset exists.**
- [ ] **Step 2: Preserve the current published-vs-current-work ordering only for rows already public/approved by Appwrite.**
- [ ] **Step 3: Confirm `renderDocuments()` excludes assets already referenced by semantic records and cannot pick up orphan Storage files.**

### Task 7: Keep GitHub Media and Institutional Evidence paths independent

**Files:**
- Modify only if needed: `script.js`

**Interfaces:**
- Consumes: current GitHub/static Media & Activities behavior and Institutional Evidence records/links.
- Produces: no regression from the Appwrite viewer refactor.

- [ ] **Step 1: Confirm Appwrite rendering refactor does not reroute GitHub Media into Appwrite.**
- [ ] **Step 2: Confirm Institutional Evidence source links remain direct external verification links and are not replaced by Storage links.**
- [ ] **Step 3: Preserve exact school spelling `Al-Shaheeda Ne'mah Rassam School` in any touched static copy.**

### Task 8: Verification and deployment readiness

**Files:**
- Inspect: `script.js`, `style.css`, affected page HTML files.

**Interfaces:**
- Produces: evidence that the frontend no longer exposes private originals and that all public document viewing is internal.

- [ ] **Step 1: Search the repository for `Open original`, direct `assets.file_id` display use, `_synthetic`, and Storage-file inference.**
- [ ] **Step 2: Verify `asset_renderings` is loaded and `display_file_ids` is the only file-ID source for Appwrite document display.**
- [ ] **Step 3: Verify private records render without broken 404 viewers.**
- [ ] **Step 4: Verify multipage viewer navigation handles 1-page and 145-page renderings.**
- [ ] **Step 5: Verify responsive CSS keeps the viewer usable on mobile.**
- [ ] **Step 6: Commit the completed integration and record the commit SHA for Vercel deployment/verification.**
