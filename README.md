# Pet Wellbeing — Shopify Intelligence Dashboard

An AI-powered Shopify dashboard for Pet Wellbeing with live product/order/customer data, natural language querying, and automation tools.

## ▶ One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nwb/petwellbeing-dashboard&env=SHOPIFY_STORE,SHOPIFY_TOKEN&envDescription=Your%20Shopify%20store%20credentials&project-name=petwellbeing-dashboard)

> **Before clicking:** Push this folder to a GitHub repo first, then replace `YOUR_USERNAME` in the URL above.

---

## Manual Deploy (3 steps)

### 1. Push to GitHub
```bash
cd petwellbeing-dashboard
git init
git add .
git commit -m "Initial dashboard"
git remote add origin https://github.com/YOUR_USERNAME/petwellbeing-dashboard.git
git push -u origin main
```

### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Add these environment variables:
4. Click **Deploy**

### 3. Done
Vercel gives you a permanent URL like `petwellbeing-dashboard.vercel.app`. Bookmark it — live data loads every time you open it.

---

## Features
- **Dashboard** — products, orders, customers, revenue at a glance
- **Products / Orders / Customers** — full lists with inventory status
- **AI Query** — ask Claude anything about your store in plain English
- **Automations** — restock alert email generator + customer reply drafter

## Architecture
- `public/index.html` — the full frontend (no build step needed)
- `api/shopify.js` — Vercel serverless function proxying Shopify Admin API (solves CORS)
- `vercel.json` — routing config

## Security Note
The Shopify token is stored as a Vercel environment variable, not in the frontend code. The proxy never exposes it to the browser.
