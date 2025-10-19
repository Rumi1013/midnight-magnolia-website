import fs from 'node:fs';
import path from 'node:path';

let dotenvLoaded = false;
try {
  const { config } = await import('dotenv');
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    config({ path: envPath });
    dotenvLoaded = true;
  }
} catch (_) {
  // dotenv not installed; continue with process.env as-is
}

const required = [
  'NODE_ENV',
  'NEXT_PUBLIC_APP_NAME',
  'NEXT_PUBLIC_SITE_URL',
  'SHOPIFY_STORE_DOMAIN',
  'SHOPIFY_ADMIN_TOKEN',
  'SHOPIFY_STOREFRONT_TOKEN'
];

const errors = [];
for (const key of required) {
  const v = (process.env[key] ?? '').trim();
  if (!v) errors.push(`❌ ${key} is missing`);
}

if (process.env.NODE_ENV && !['development','production','test'].includes(process.env.NODE_ENV)) {
  errors.push(`❌ NODE_ENV must be development|production|test (got "${process.env.NODE_ENV}")`);
}

if (errors.length) {
  if (dotenvLoaded) {
    console.log(`[dotenv] loaded .env`);
  }
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('🎉 env looks good');
