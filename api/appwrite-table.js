const ENDPOINT = "https://fra.cloud.appwrite.io/v1";
const PROJECT = "6a90545d002d8d1ed109";
const DATABASE = "6a919743003b7658ee49";

const ALLOWED_TABLES = new Set([
  "assets",
  "asset_renderings",
  "publications",
  "projects",
  "awards",
  "credentials",
  "experiences",
  "recommendations",
  "institutional_evidence"
]);

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const table = String(req.query.table || "");
  const requestedLimit = Number(req.query.limit || 250);
  const limit = Number.isFinite(requestedLimit)
    ? Math.min(250, Math.max(1, Math.trunc(requestedLimit)))
    : 250;

  if (!ALLOWED_TABLES.has(table)) {
    return res.status(400).json({ error: "Unsupported table" });
  }

  try {
    const url = new URL(`${ENDPOINT}/tablesdb/${DATABASE}/tables/${table}/rows`);
    url.searchParams.append("queries[]", JSON.stringify({ method: "limit", values: [limit] }));
    url.searchParams.set("total", "false");

    const response = await fetch(url, {
      headers: {
        "X-Appwrite-Project": PROJECT,
        "Accept": "application/json"
      },
      cache: "no-store"
    });

    const body = await response.text();
    if (response.ok) {
      // Public table metadata changes infrequently. Cache successful responses
      // at Vercel's edge so normal page views do not repeatedly consume Appwrite bandwidth.
      res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=604800");
    } else {
      res.setHeader("Cache-Control", "no-store, max-age=0");
    }
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(response.status).send(body);
  } catch (error) {
    return res.status(502).json({
      error: "Public academic data is temporarily unavailable"
    });
  }
};
