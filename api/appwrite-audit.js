const ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const PROJECT_ID = "6a90545d002d8d1ed109";
const DATABASE_ID = "6a919743003b7658ee49";
const BUCKET_ID = "academic_media";

const PUBLIC_FILE_ID = "6a93302c002e6963e015";
const REVIEW_FILE_ID = "6a93302c002e647b817e";

async function appwrite(path, apiKey) {
  const response = await fetch(`${ENDPOINT}${path}`, {
    headers: {
      "Accept": "application/json",
      "X-Appwrite-Project": PROJECT_ID,
      "X-Appwrite-Key": apiKey,
      "X-Appwrite-Response-Format": "2.0.0"
    },
    cache: "no-store"
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  return { status: response.status, ok: response.ok, data };
}

function safeFileSummary(result) {
  if (!result?.ok) {
    return {
      status: result?.status ?? null,
      existsWithServerKey: false,
      errorType: result?.data?.type || null,
      message: result?.data?.message || null
    };
  }
  return {
    status: result.status,
    existsWithServerKey: true,
    id: result.data?.$id || null,
    name: result.data?.name || null,
    mimeType: result.data?.mimeType || null,
    sizeOriginal: result.data?.sizeOriginal || null,
    permissions: result.data?.$permissions || []
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "GET only" });
  }

  res.setHeader("Cache-Control", "no-store, max-age=0");
  const apiKey = process.env.APPWRITE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      ok: false,
      error: "APPWRITE_API_KEY is not configured in Vercel."
    });
  }

  const [bucket, publicFile, reviewFile, publicRow, reviewRow] = await Promise.all([
    appwrite(`/storage/buckets/${BUCKET_ID}`, apiKey),
    appwrite(`/storage/buckets/${BUCKET_ID}/files/${PUBLIC_FILE_ID}`, apiKey),
    appwrite(`/storage/buckets/${BUCKET_ID}/files/${REVIEW_FILE_ID}`, apiKey),
    appwrite(`/tablesdb/${DATABASE_ID}/tables/assets/rows/6a9340d8c2f1f0c29183`, apiKey),
    appwrite(`/tablesdb/${DATABASE_ID}/tables/assets/rows/6a9340d8c2ecef616ca4`, apiKey)
  ]);

  const result = {
    ok: true,
    bucket: bucket.ok ? {
      status: bucket.status,
      id: bucket.data?.$id || null,
      name: bucket.data?.name || null,
      fileSecurity: bucket.data?.fileSecurity ?? null,
      permissions: bucket.data?.$permissions || bucket.data?.permissions || []
    } : {
      status: bucket.status,
      errorType: bucket.data?.type || null,
      message: bucket.data?.message || null
    },
    knownPublicFile: safeFileSummary(publicFile),
    knownNeedsReviewFile: safeFileSummary(reviewFile),
    knownPublicAssetRow: publicRow.ok ? {
      status: publicRow.status,
      file_id: publicRow.data?.file_id || null,
      visibility: publicRow.data?.visibility || null,
      permissions: publicRow.data?.$permissions || []
    } : { status: publicRow.status },
    knownNeedsReviewAssetRow: reviewRow.ok ? {
      status: reviewRow.status,
      file_id: reviewRow.data?.file_id || null,
      visibility: reviewRow.data?.visibility || null,
      permissions: reviewRow.data?.$permissions || []
    } : { status: reviewRow.status }
  };

  return res.status(200).json(result);
};
