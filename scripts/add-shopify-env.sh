#!/usr/bin/env bash
set -euo pipefail
touch .env .env.example

read -rp "Shopify store domain (e.g. yourstore.myshopify.com): " S_DOMAIN
read -srp "Shopify Admin API token: " S_ADMIN; echo
read -srp "Shopify Storefront token: " S_STOREFRONT; echo

# Normalize domain
S_DOMAIN="$(echo "$S_DOMAIN" | sed -E 's#^https?://##; s#/$##; s#[[:space:]]+##g')"

# Write to .env
grep -q '^SHOPIFY_STORE_DOMAIN=' .env && sed -i '' "s#^SHOPIFY_STORE_DOMAIN=.*#SHOPIFY_STORE_DOMAIN=$S_DOMAIN#" .env || echo "SHOPIFY_STORE_DOMAIN=$S_DOMAIN" >> .env
grep -q '^SHOPIFY_ADMIN_TOKEN=' .env && sed -i '' "s#^SHOPIFY_ADMIN_TOKEN=.*#SHOPIFY_ADMIN_TOKEN=$S_ADMIN#" .env || echo "SHOPIFY_ADMIN_TOKEN=$S_ADMIN" >> .env
grep -q '^SHOPIFY_STOREFRONT_TOKEN=' .env && sed -i '' "s#^SHOPIFY_STOREFRONT_TOKEN=.*#SHOPIFY_STOREFRONT_TOKEN=$S_STOREFRONT#" .env || echo "SHOPIFY_STOREFRONT_TOKEN=$S_STOREFRONT" >> .env

# Example file (safe)
grep -q '^SHOPIFY_STORE_DOMAIN=' .env.example && sed -i '' "s#^SHOPIFY_STORE_DOMAIN=.*#SHOPIFY_STORE_DOMAIN=$S_DOMAIN#" .env.example || echo "SHOPIFY_STORE_DOMAIN=$S_DOMAIN" >> .env.example
grep -q '^SHOPIFY_ADMIN_TOKEN=' .env.example || echo "SHOPIFY_ADMIN_TOKEN=***" >> .env.example
grep -q '^SHOPIFY_STOREFRONT_TOKEN=' .env.example || echo "SHOPIFY_STOREFRONT_TOKEN=***" >> .env.example

echo "✅ Shopify env values added successfully!"
