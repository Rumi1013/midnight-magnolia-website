#!/usr/bin/env bash
set -e

echo "🌙 Midnight Magnolia — Environment Setup (with optional Markdown import)"

FROM_MD=""
if [[ "$1" == "--from-md" && -n "$2" ]]; then
  FROM_MD="$2"
fi

if [[ -n "$FROM_MD" && -f "$FROM_MD" ]]; then
  echo "📜 Importing environment variables from: $FROM_MD"
  awk -F'=' '/=/{print $1"="$2}' "$FROM_MD" > .env
  cp .env .env.example
else
  echo "📝 Creating .env interactively..."
  read -p "Public site URL (prod) e.g. https://midnight-magnolia.com: " SITE_URL
  cat > .env <<ENV
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Midnight Magnolia
NEXT_PUBLIC_SITE_URL=${SITE_URL:-http://localhost:3000}

SHOPIFY_STORE_DOMAIN=
SHOPIFY_ADMIN_TOKEN=
SHOPIFY_STOREFRONT_TOKEN=

STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
PRINTIFY_API_KEY=
PATREON_CLIENT_ID=
PATREON_CLIENT_SECRET=
GUMROAD_APPLICATION_ID=
GUMROAD_SECRET=
GUMROAD_TOKEN=
ENV
  cp .env .env.example
fi

# Make sure .env is ignored by git
grep -qxF ".env" .gitignore || echo ".env" >> .gitignore
grep -qxF ".env.local" .gitignore || echo ".env.local" >> .gitignore

echo "✅ .env and .env.example ready."
echo "Next steps:"
echo "  npm run validate:env"
echo "  npm run dev:validated"
