import fs from "node:fs";

(async () => {
  // Load .env if present, but don't crash if dotenv isn't installed
  try {
    if (fs.existsSync(".env")) {
      const d = await import('dotenv'); 
      d.config();
    }
  } catch (e) {
    // If dotenv isn't installed, keep going (Next.js may have already loaded env)
    console.warn("ℹ️ dotenv not found; continuing without explicit .env load");
  }

  const REQUIRED = [
    "NODE_ENV",
    "NEXT_PUBLIC_APP_NAME",
    "NEXT_PUBLIC_SITE_URL",
    "SHOPIFY_STORE_DOMAIN",
    "SHOPIFY_ADMIN_TOKEN",
    "SHOPIFY_STOREFRONT_TOKEN",
  ];

  let failed = false;
  const need = (k) => {
    const v = process.env[k];
    if (!v || String(v).trim() === "") { console.error(`❌ ${k} is missing`); failed = true; }
    else { console.log(`✅ ${k} present`); }
  };
  for (const k of REQUIRED) need(k);

  const envv = process.env.NODE_ENV || "";
  if (!["development","production","test"].includes(envv)) { console.error(`❌ NODE_ENV must be development|production|test (got "${envv}")`); failed = true; }
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (!/^https?:\/\/[^ ]+$/i.test(site)) { console.error(`❌ NEXT_PUBLIC_SITE_URL must be a valid http(s) URL (got "${site}")`); failed = true; }
  const shop = process.env.SHOPIFY_STORE_DOMAIN || "";
  if (!/^[a-z0-9-]+\.myshopify\.com$/i.test(shop)) { console.error(`❌ SHOPIFY_STORE_DOMAIN must look like your-store.myshopify.com (got "${shop}")`); failed = true; }

  if (failed) process.exit(1);
  console.log("🎉 env looks good");
})();
