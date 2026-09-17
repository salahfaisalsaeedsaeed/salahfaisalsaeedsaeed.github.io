# Appwrite Rendering Integration Design

Date: 2026-09-17
Repository: `salahfaisalsaeedsaeed/salahfaisalsaeedsaeed.github.io`

## Objective

Replace the website's current direct/private Storage-file display path with the finalized Appwrite relationship model:

`public academic/professional record -> Asset -> asset_renderings -> public display rendering`

The website must display approved evidence inside the academic site itself, without exposing private originals or requiring visitors to leave the site to view supporting files.

## Confirmed Appwrite state

- Project: `6a90545d002d8d1ed109`
- Database: `6a919743003b7658ee49`
- Bucket: `academic_media`
- 59/59 Assets are record-linked.
- 41/59 Assets are approved for public display.
- 18/59 Assets are intentionally private.
- Private originals remain inaccessible to anonymous visitors.
- Public display derivatives are stored through `asset_renderings`.
- Graduation Project Report has 145 ordered public page renderings.

Relevant `asset_renderings` fields:

- `$id`
- `asset_id`
- `source_file_id`
- `render_type`
- `display_file_ids`
- `page_count`
- `source_hash`
- `generated_at`
- `status`
- `visibility`

## Scope

### In scope

1. Update `script.js` to load `asset_renderings`.
2. Remove public-display dependence on `assets.file_id`.
3. Remove heuristic Storage-file matching from the public rendering path.
4. Stop synthesizing public Assets from unmatched Storage files.
5. Build an `asset_id -> approved rendering` map.
6. Display only public Assets with public/approved rendering rows.
7. Render public evidence inline inside its semantic academic record.
8. Render multi-page documents from ordered `display_file_ids`.
9. Keep intentionally private evidence private while retaining the public record metadata where appropriate.
10. Remove public UI links such as `Open original` that expose or imply access to source files.
11. Preserve DOI/publisher and institutional source links because they are external verification sources rather than file-download links.
12. Preserve GitHub-hosted Media & Activities as a separate content source.
13. Preserve Institutional Evidence as a separate GitHub/code-managed section.
14. Correct the school spelling to `Al-Shaheeda Ne'mah Rassam School` wherever touched.
15. Verify responsive behavior, accessibility, and same-site viewing behavior.

### Out of scope

- Appwrite schema edits.
- Appwrite Storage edits.
- Creating backups.
- Making any private Asset public.
- Migrating GitHub Media into Appwrite.
- Moving Institutional Evidence links into Appwrite.
- Rebuilding the visual design from scratch.

## Data architecture

### Table configuration

Add:

```js
assetRenderings: "asset_renderings"
```

to the Appwrite table map.

### Loading rules

The frontend loads public rows from the academic tables, `assets`, and `asset_renderings`.

The display path must not enumerate Storage and then guess which file belongs to which Asset. The frontend must instead resolve:

1. record relationship field (`asset_id`, `asset_ids`, `supporting_asset_ids`, or `evidence_asset_ids`)
2. public Asset by Asset ID
3. public approved `asset_renderings` row by `asset_id`
4. ordered `display_file_ids`

Only rendering file IDs are used to build display URLs.

### Private Assets

Private Assets are never requested for display.

If the academic/professional record itself is public, the record may remain visible without its supporting file. A restrained privacy note may be shown only when useful, for example:

`Supporting document retained privately for privacy.`

No private file URL, rendering URL, error placeholder, or 404-producing request should be emitted.

## Rendering behavior

### Images

Display the first approved `display_file_ids` item inside the existing fixed evidence frame using `object-fit: contain`.

### Single-page documents

Display the approved rendered page as an image in the existing evidence frame.

### Multi-page documents

Use a same-page document viewer with:

- current page image
- Previous / Next controls
- page counter
- direct jump/select when practical
- lazy loading of nearby pages
- keyboard-accessible controls

Do not render all pages at once.

The Graduation Project Report must use its 145 ordered rendering IDs and remain embedded in the Projects page.

### Videos

GitHub Media videos remain in the Media & Activities workflow and use the existing embedded player model. Appwrite public renderings are not assumed to contain PowerPoint files.

## Page placement

Assets remain contextual rather than appearing as a generic file library:

- Publications -> publication evidence
- Projects -> project evidence
- Awards -> award evidence
- Credentials -> credential evidence
- Experience -> professional evidence when public
- Recommendations -> public metadata; document display only if public-approved

The same Asset is not duplicated unnecessarily across unrelated pages.

## Publications

Only publicly approved publication records should be surfaced in the public publication list. Records still classified as `In Preparation`, `needs_review`, or otherwise non-public are not promoted merely because they exist in Appwrite.

Published papers retain DOI / Publisher links as provenance links while their display rendering remains embedded in the site.

## Media & Activities

Media & Activities remains separate from the 59 Appwrite Assets.

The GitHub media categories remain:

1. Student Videos and Conference Presentations
2. Student Teaching and Practical Training Activities
3. Teacher Training and Professional Development Programs
4. 3D Printing and STEM Laboratory Activities
5. Technical Maintenance and Troubleshooting Work
6. Graduation Highlights

These assets are loaded from GitHub-hosted media and are not migrated into Appwrite by this integration.

## Institutional Evidence

Institutional Evidence remains a separate site section managed in GitHub/code.

Each entry should present:

- title
- institution
- date when verified
- concise academic explanation
- direct `Original Institutional Post` source link

Institutional source links may open externally because they are verification sources, not supporting-file downloads.

## UI changes

Keep the current AVESİS-inspired layout and existing evidence-card styling.

Change evidence actions so public Appwrite files are viewed in the site only. Remove `Open original` and any equivalent direct-Storage action.

For multi-page rendered documents, provide inline page navigation rather than a direct file link.

## Error handling

- Missing rendering for a public Asset: do not fall back to the private original; show record metadata and a restrained `Preview unavailable` state only if useful.
- Private Asset: do not request it.
- Rendering row exists but has no `display_file_ids`: treat as unavailable and log a non-sensitive console warning.
- Appwrite table temporarily unavailable: keep the current page-level unavailable message, without exposing internal IDs to visitors.

## Security requirements

- Never use `assets.file_id` as the public display URL.
- Never render a direct link to the private original.
- Never auto-promote private Assets.
- Never infer public visibility from an unmatched Storage file.
- Public UI may use only rendering IDs from a public approved `asset_renderings` row.
- No Download button is provided for Appwrite evidence.

## Verification

Before completion:

1. Verify Publications render approved paper pages inline.
2. Verify Graduation Project renders page 1 and can navigate through page 145.
3. Verify Awards and Credentials display approved evidence.
4. Verify intentionally private records generate no Storage request and no broken viewer.
5. Verify Recommendations remain private where required.
6. Verify no `Open original` action remains for Appwrite evidence.
7. Verify no synthetic unmatched Storage Asset is publicly rendered.
8. Verify mobile and desktop evidence viewers.
9. Verify the site remains functional if one rendering is unavailable.
10. Verify deployment behavior on Vercel after GitHub changes are complete.

## Success criteria

The integration is complete when the public website uses only approved `asset_renderings` for Appwrite evidence, the 41 public-display-ready Assets render in their correct academic context, all 18 intentionally private Assets remain undisclosed, the Graduation Project's 145 pages are navigable inside the site, and no Appwrite original-file link or download action is exposed by the frontend.
