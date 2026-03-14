// api/shopify.js — Vercel serverless proxy for Shopify Admin API
// Forwards requests to Shopify so the browser never hits CORS restrictions

export default async function handler(req, res) {
  // CORS headers so the frontend can call this from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { endpoint } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Missing endpoint parameter' });
  }

  const STORE = process.env.SHOPIFY_STORE;
  const TOKEN = process.env.SHOPIFY_TOKEN;

  try {
    const shopifyUrl = `https://${STORE}/admin/api/2024-01/${endpoint}`;

    const shopifyRes = await fetch(shopifyUrl, {
      method: req.method === 'GET' ? 'GET' : req.method,
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
      },
      ...(req.body && req.method !== 'GET' ? { body: JSON.stringify(req.body) } : {}),
    });

    const data = await shopifyRes.json();

    if (!shopifyRes.ok) {
      return res.status(shopifyRes.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
