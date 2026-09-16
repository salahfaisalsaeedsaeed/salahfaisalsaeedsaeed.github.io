const ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const PROJECT_ID = "6a90545d002d8d1ed109";
const BUCKET_ID = "academic_media";

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "GET only" });
  }
  res.setHeader("Cache-Control", "no-store, max-age=0");

  const url = new URL(`${ENDPOINT}/storage/buckets/${BUCKET_ID}/files`);
  url.searchParams.append("queries[]", JSON.stringify({ method: "limit", values: [100] }));
  url.searchParams.set("total", "false");

  try {
    const response = await fetch(url, {
      headers: {
        "Accept": "application/json",
        "X-Appwrite-Project": PROJECT_ID,
        "X-Appwrite-Response-Format": "2.0.0"
      },
      cache: "no-store"
    });
    const text = await response.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    if (!response.ok) {
      return res.status(response.status).json({ ok: false, status: response.status, data });
    }

    const files = data?.files || [];
    return res.status(200).json({
      ok: true,
      count: files.length,
      files: files.map(f => ({
        id: f.$id,
        name: f.name,
        mimeType: f.mimeType,
        sizeOriginal: f.sizeOriginal,
        permissions: f.$permissions || []
      }))
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: String(error?.message || error) });
  }
};
