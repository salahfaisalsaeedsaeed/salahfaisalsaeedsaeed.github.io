TEMPORARY APPWRITE LINKER — SALAH ACADEMIC WEBSITE

PURPOSE
This package links the CURRENT Appwrite records to the CURRENT 59 Assets.
It does NOT redesign the public website.
It does NOT upload new files.

WHAT IT LINKS
- 8 published Publications -> asset_id
- 8 Awards -> asset_id
- 15 Credentials -> asset_id
- eSmarTA 2025 and 2026 Credentials -> supporting_asset_ids
- 3 Experiences -> evidence_asset_ids
- 7 Recommendations -> asset_id
- 1 Graduation Project -> asset_ids

INTENTIONALLY NOT LINKED
- The institutional Ne’mah recommendation remains without asset_id because no matching recommendation file exists.
- 11 Documents & Evidence / archive Assets are not forced into unrelated tables.
- Videos and new media remain postponed.

FILES TO ADD TEMPORARILY TO YOUR WEBSITE REPOSITORY
1) api/link-appwrite.js
2) link-admin.html

VERCEL ENVIRONMENT VARIABLES
Create these in:
Vercel -> Salah Academic Website project -> Settings -> Environment Variables

APPWRITE_API_KEY
- Create a temporary Appwrite Server API key.
- Minimum scopes required: rows.read and rows.write.
- Do NOT place the API key in source code.
- Do NOT send the key in ChatGPT.

LINK_SECRET
- Create your own long temporary secret, for example 30+ random characters.
- Do NOT place it in source code.
- You will type it only into link-admin.html.

DEPLOY
Commit/push the two temporary files to the same GitHub repository used by Vercel.
Wait for Vercel deployment to finish.

RUN
Open:
https://salah-faisal.vercel.app/link-admin.html

1) Enter LINK_SECRET.
2) Click Dry Run.
3) Confirm the JSON says:
   "ok": true
   "mode": "dry-run"
   and no conflicts.
4) Only then click Apply Links.

SAFETY
- The server function performs a full pre-flight before any write.
- It verifies every target row title.
- It refuses to overwrite a different non-empty link.
- Re-running is idempotent: already-correct values are left unchanged.
- It changes only the planned relation/link fields.

AFTER SUCCESS
1) Verify Appwrite rows.
2) Delete:
   api/link-appwrite.js
   link-admin.html
3) Delete/revoke the temporary Appwrite API key.
4) Remove APPWRITE_API_KEY and LINK_SECRET from Vercel Environment Variables.

THEN
Begin the actual website rebuild according to the agreed AVESİS-inspired academic/professional design.