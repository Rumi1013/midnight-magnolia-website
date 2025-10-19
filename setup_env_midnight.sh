set -euo pipefail

echo "🌙 Midnight Magnolia — Environment Setup (with optional Markdown import)"

# -----------------------------
# Args
# -----------------------------
FROM_MD=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --from-md)
      FROM_MD="${2:-}"; shift 2;;
    *)
      echo "Unknown arg: $1"; exit 1;;
  esac
done

# -----------------------------
# Helpers
# -----------------------------
ensure_line() { local line="$1" file="$2"; grep -qxF "$line" "$file" 2>/dev/null || echo "$line" >> "$file"; }

json_add_script() {
  node - <<'JS'
const fs = require('fs');
const pkgPath = 'package.json';
if (!fs.existsSync(pkgPath)) { process.exit(0); }
const p = JSON.parse(fs.readFileSync(pkgPath,'utf8'));
p.scripts = p.scripts || {};
p.scripts["validate:env"] = "node scripts/check-env.mjs";
p.scripts["dev:validated"] = "npm run validate:env && pnpm dev";
fs.writeFileSync(pkgPath, JSON.stringify(p,null,2));
console.log("✅ wired npm scripts: validate:env, dev:validated");
JS
}

# -----------------------------
# Sanity checks
# -----------------------------
test -f package.json || { echo "❌ Run from repo root (package.json missing)."; exit 1; }
ensure_line ".env" .gitignore
ensure_line ".env.local" .gitignore
ensure_line ".env.production" .gitignore
# Avoid accidentally committing your markdown secrets file
if [[ -n "${FROM_MD}" ]]; then
  ensure_line "$(basename "$FROM_MD")" .gitignore
fi

# -----------------------------
# Extractor (Node) — reads KEY=VALUE pairs from a Markdown file
# -----------------------------
mkdir -p scripts
cat > scripts/extract-env-from-md.mjs <<'JS'
import fs from "node:fs";

const file = process.argv[2];
if (!file || !fs.existsSync(file)) {
  console.error("⚠️  No Markdown file found to import.");
  console.log(JSON.stringify({}));
  process.exit(0);
}
const raw = fs.readFileSync(file, "utf8");

// Strategy:
// 1) capture code fences ```.*``` blocks OR entire file lines
// 2) match lines like KEY=VALUE (allow spaces around =; no leading #)
// 3) trim quotes around VALUE if present
const map = {};
const lines = raw.split(/\r?\n/);

for (let line of lines) {
  // ignore comments and headings
  if (/^\s*#(?!\!)/.test(line)) continue;
  const m = line.match(/^\s*([A-Z][A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (!m) continue;
  let key = m[1].trim();
  let val = m[2];

  // strip trailing comments
  val = val.replace(/\s+#.*$/, "");

  // strip wrapping quotes/backticks
  if ((val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'")) ||
      (val.startsWith("`") && val.endsWith("`"))) {
    val = val.slice(1, -1);
  }
  map[key] = val;
}

console.log(JSON.stringify(map));
JS

# -----------------------------
# Import map (if provided)
# -----------------------------
IMPORTED_JSON="{}"
if [[ -n "${FROM_MD}" && -f "${FROM_MD}" ]]; then
  echo "📥 Importing env from: ${FROM_MD}"
  IMPORTED_JSON="$(node scripts/extract-env-from-md.mjs "${FROM_MD}")"
fi

# helper to fetch from imported json
get_from_import() {
  local key="$1"
  node -e "const m=${IMPORTED_JSON}; console.log(m['${key}']||'')"
}

# -----------------------------
# Collect required (prefill from import where possible)
# -----------------------------
SITE_URL="$(get_from_import NEXT_PUBLIC_SITE_URL)"
SHOP_DOMAIN="$(get_from_import SHOPIFY_STORE_DOMAIN)"
SHOP_ADMIN="$(get_from_import SHOPIFY_ADMIN_TOKEN)"
SHOP_STOREFRONT="$(get_from_import SHOPIFY_STOREFRONT_TOKEN)"

# Prompt for any missing
if [[ -z "${SITE_URL}" ]]; then read -rp "Public site URL (prod) e.g. https://midnight-magnolia.com: " SITE_URL; fi
if [[ -z "${SHOP_DOMAIN}" ]]; then read -rp "Shopify store domain (your-store.myshopify.com): " SHOP_DOMAIN; fi
if [[ -z "${SHOP_ADMIN}" ]]; then read -rsp "Shopify Admin API token (shpat_…): " SHOP_ADMIN; echo; fi
if [[ -z "${SHOP_STOREFRONT}" ]]; then read -rsp "Shopify Storefront API token: " SHOP_STOREFRONT; echo; fi

# Optional scrub
read -rp "Scrub old leaked Shopify tokens from Git history now? (y/N): " WANT_SCRUB
OLD_ADMIN=""; OLD_STOREFRONT=""
if [[ "${WANT_SCRUB:-N}" =~ ^[Yy]$ ]]; then
  read -rp "Old Admin token to scrub (leave blank to skip): " OLD_ADMIN
  read -rp "Old Storefront token to scrub (leave blank to skip): " OLD_STOREFRONT
fi

# -----------------------------
# Canonical .env.example
# -----------------------------
cat > .env.example <<ENV
# 1) Core app
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Midnight Magnolia
NEXT_PUBLIC_SITE_URL=${SITE_URL}

# 2) Database
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE

# 3) Storage (DigitalOcean Spaces)
SPACES_BUCKET=midnight-magnolia-archive
SPACES_REGION=nyc3
SPACES_BUCKET_ORIGIN=https://midnight-magnolia-archive.nyc3.digitaloceanspaces.com
SPACES_BUCKET_CDN=https://midnight-magnolia-archive.nyc3.cdn.digitaloceanspaces.com
SPACES_ACCESS_KEY_ID=
SPACES_SECRET_ACCESS_KEY=

# 4) Shopify (headless)
SHOPIFY_STORE_DOMAIN=${SHOP_DOMAIN}
SHOPIFY_ADMIN_TOKEN=
SHOPIFY_STOREFRONT_TOKEN=
# SHOPIFY_API_KEY=
# SHOPIFY_API_SECRET_KEY=

# 5) Printify
PRINTIFY_API_KEY=

# 6) Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=

# 7) Notion
NOTION_TOKEN=

# 8) Patreon
PATREON_CLIENT_ID=
PATREON_CLIENT_SECRET=
PATREON_CREATOR_ACCESS_TOKEN=
PATREON_CREATOR_REFRESH_TOKEN=

# 9) Gumroad
GUMROAD_CLIENT_ID=
GUMROAD_CLIENT_SECRET=
GUMROAD_TOKEN=
# GUMROAD_APPLICATION_ID=
# GUMROAD_SECRET=

# 10) eBay Affiliate
EBAY_AFFILIATE_BASE_URL=https://ebay.com/inf/magnoliamoonmarket
EBAY_AFFILIATE_CAMPAIGN_ID=
EBAY_AFFILIATE_TOOL_ID=

# 11) AI
OPENAI_API_KEY=
# ANTHROPIC_API_KEY=

# (Optional) Email
# RESEND_API_KEY=
# SENDGRID_API_KEY=
ENV
echo "✅ wrote .env.example"

# -----------------------------
# Private .env — populate from imported map where available
# -----------------------------
# helper: get or default (safe echo)
val() { node -e "const m=${IMPORTED_JSON}; console.log((m['$1']||'').toString())"; }

cat > .env <<ENV
# 1) Core app
NODE_ENV=$(val NODE_ENV || echo development)
NEXT_PUBLIC_APP_NAME=$(val NEXT_PUBLIC_APP_NAME || echo "Midnight Magnolia")
NEXT_PUBLIC_SITE_URL=${SITE_URL}

# 2) Database
DATABASE_URL=$(val DATABASE_URL)

# 3) Storage (DigitalOcean Spaces)
SPACES_BUCKET=$(val SPACES_BUCKET || echo midnight-magnolia-archive)
SPACES_REGION=$(val SPACES_REGION || echo nyc3)
SPACES_BUCKET_ORIGIN=$(val SPACES_BUCKET_ORIGIN || echo https://midnight-magnolia-archive.nyc3.digitaloceanspaces.com)
SPACES_BUCKET_CDN=$(val SPACES_BUCKET_CDN || echo https://midnight-magnolia-archive.nyc3.cdn.digitaloceanspaces.com)
SPACES_ACCESS_KEY_ID=$(val SPACES_ACCESS_KEY_ID)
SPACES_SECRET_ACCESS_KEY=$(val SPACES_SECRET_ACCESS_KEY)

# 4) Shopify (headless)
SHOPIFY_STORE_DOMAIN=${SHOP_DOMAIN}
SHOPIFY_ADMIN_TOKEN=${SHOP_ADMIN}
SHOPIFY_STOREFRONT_TOKEN=${SHOP_STOREFRONT}
SHOPIFY_API_KEY=$(val SHOPIFY_API_KEY)
SHOPIFY_API_SECRET_KEY=$(val SHOPIFY_API_SECRET_KEY)

# 5) Printify
PRINTIFY_API_KEY=$(val PRINTIFY_API_KEY)

# 6) Stripe
STRIPE_SECRET_KEY=$(val STRIPE_SECRET_KEY)
STRIPE_PUBLISHABLE_KEY=$(val STRIPE_PUBLISHABLE_KEY)

# 7) Notion
NOTION_TOKEN=$(val NOTION_TOKEN)

# 8) Patreon
PATREON_CLIENT_ID=$(val PATREON_CLIENT_ID)
PATREON_CLIENT_SECRET=$(val PATREON_CLIENT_SECRET)
PATREON_CREATOR_ACCESS_TOKEN=$(val PATREON_CREATOR_ACCESS_TOKEN)
PATREON_CREATOR_REFRESH_TOKEN=$(val PATREON_CREATOR_REFRESH_TOKEN)

# 9) Gumroad
GUMROAD_CLIENT_ID=$(val GUMROAD_CLIENT_ID)
GUMROAD_CLIENT_SECRET=$(val GUMROAD_CLIENT_SECRET)
GUMROAD_TOKEN=$(val GUMROAD_TOKEN)
# Legacy aliases (if present)
GUMROAD_APPLICATION_ID=$(val GUMROAD_APPLICATION_ID)
GUMROAD_SECRET=$(val GUMROAD_SECRET)

# 10) eBay Affiliate
EBAY_AFFILIATE_BASE_URL=$(val EBAY_AFFILIATE_BASE_URL || echo https://ebay.com/inf/magnoliamoonmarket)
EBAY_AFFILIATE_CAMPAIGN_ID=$(val EBAY_AFFILIATE_CAMPAIGN_ID)
EBAY_AFFILIATE_TOOL_ID=$(val EBAY_AFFILIATE_TOOL_ID)

# 11) AI
OPENAI_API_KEY=$(val OPENAI_API_KEY)
ANTHROPIC_API_KEY=$(val ANTHROPIC_API_KEY)

# (Optional) Email
RESEND_API_KEY=$(val RESEND_API_KEY)
SENDGRID_API_KEY=$(val SENDGRID_API_KEY)
ENV
echo "✅ wrote .env (private — gitignored)"

# -----------------------------
# Env validator
# -----------------------------
mkdir -p scripts
cat > scripts/check-env.mjs <<'JS'
import fs from "node:fs";
if (fs.existsSync(".env")) { const d = await import('dotenv'); d.config(); }

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
JS
echo "✅ added scripts/check-env.mjs"

# -----------------------------
# Optional upload API + server uploader (if missing)
# -----------------------------
if [[ ! -f server/upload.js ]]; then
  mkdir -p server
  cat > server/upload.js <<'JS'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
const region = process.env.SPACES_REGION || "nyc3";
const endpoint = `https://${region}.digitaloceanspaces.com`;
const s3 = new S3Client({
  region, endpoint, forcePathStyle: false,
  credentials: { accessKeyId: process.env.SPACES_ACCESS_KEY_ID, secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY },
});
export async function uploadToSpaces({ key, buffer, contentType="application/octet-stream", acl="public-read" }) {
  if (!process.env.SPACES_BUCKET) throw new Error("SPACES_BUCKET missing");
  await s3.send(new PutObjectCommand({ Bucket: process.env.SPACES_BUCKET, Key: key, Body: buffer, ContentType: contentType, ACL: acl }));
  const base = process.env.SPACES_BUCKET_CDN || process.env.SPACES_BUCKET_ORIGIN || `https://${process.env.SPACES_BUCKET}.${region}.digitaloceanspaces.com`;
  return `${base}/${encodeURI(key)}`;
}
JS
  echo "✅ added server/upload.js"
fi

if [[ ! -f app/api/upload/route.ts ]]; then
  mkdir -p app/api/upload
  cat > app/api/upload/route.ts <<'TS'
import { NextRequest } from "next/server";
import { uploadToSpaces } from "../../../server/upload";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const folder = String(form.get("folder") ?? "uploads");
    if (!file) return new Response(JSON.stringify({ error: "file is required" }), { status: 400 });
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = (file.name?.split(".").pop() || "").toLowerCase();
    const safeName = file.name?.replace(/[^\w.\-]+/g, "_") || `upload.${ext || "bin"}`;
    const stamp = new Date().toISOString().replace(/[:.]/g, "");
    const key = `${folder}/${stamp}-${safeName}`;
    const url = await uploadToSpaces({ key, buffer, contentType: file.type || "application/octet-stream" });
    return new Response(JSON.stringify({ ok: true, key, url }), { headers: { "Content-Type": "application/json" }, status: 200 });
  } catch (err: any) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: "upload_failed", detail: err?.message }), { status: 500 });
  }
}
TS
  echo "✅ added app/api/upload/route.ts"
fi

# -----------------------------
# Wire npm scripts & deps
# -----------------------------
json_add_script
node -e 'try{require.resolve("@aws-sdk/client-s3");console.log("📦 @aws-sdk/client-s3 present")}catch(e){console.log("📦 Installing @aws-sdk/client-s3...");process.exit(1)}' || pnpm add @aws-sdk/client-s3

# -----------------------------
# Optional history scrub
# -----------------------------
read -rp "Also scrub the CURRENT tokens you just entered from your shell history? (y/N): " SHELLHIST
if [[ "${SHELLHIST:-N}" =~ ^[Yy]$ ]]; then
  echo "ℹ️ On macOS, consider: 'history -c' for bash, or edit ~/.zsh_history for zsh."
fi

read -rp "Perform git history scrub for specific OLD tokens now? (y/N): " WANT_SCRUB2
if [[ "${WANT_SCRUB2:-N}" =~ ^[Yy]$ ]]; then
  REPL_FILE="$(mktemp)"; echo "# token replacements" > "$REPL_FILE"
  [[ -n "${OLD_ADMIN}" ]] && echo "${OLD_ADMIN} SHPAT_REDACTED" >> "$REPL_FILE"
  [[ -n "${OLD_STOREFRONT}" ]] && echo "${OLD_STOREFRONT} STOREFRONT_REDACTED" >> "$REPL_FILE"
  if [[ -s "$REPL_FILE" ]]; then
    brew list git-filter-repo >/dev/null 2>&1 || brew install git-filter-repo
    git filter-repo --force --replace-text "$REPL_FILE"
    git remote -v >/dev/null 2>&1 || git remote add origin "https://github.com/Rumi1013/midnight-magnolia-website.git"
    CUR="$(git rev-parse --abbrev-ref HEAD)"
    git push -u origin "$CUR" --force
    echo "✅ history scrubbed & pushed ($CUR)"
  else
    echo "ℹ️ No tokens provided to scrub."
  fi
fi

# -----------------------------
# Commit SAFE files only
# -----------------------------
git add .env.example scripts/check-env.mjs scripts/extract-env-from-md.mjs package.json server/upload.js app/api/upload/route.ts || true
git commit -m "chore: env setup with optional Markdown import, validator, uploader & API" || echo "ℹ️ Nothing to commit"

echo ""
echo "Next:"
echo " 1) Review .env (private) — imported values are filled; complete any blanks."
echo " 2) Validate:      npm run validate:env"
echo " 3) Start dev:     npm run dev:validated"
echo " 4) Test upload:   curl -X POST -F \"file=@/path/to/image.png\" -F \"folder=gallery\" http://localhost:3000/api/upload"
echo " 5) Keep your Markdown secrets file OUT of git (already added to .gitignore)."
