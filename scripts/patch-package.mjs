import fs from "node:fs";
const path = "package.json";
if (!fs.existsSync(path)) {
  console.error("❌ package.json not found. Run from project root.");
  process.exit(1);
}
const pkg = JSON.parse(fs.readFileSync(path, "utf8"));
pkg.scripts = pkg.scripts || {};
pkg.scripts["validate:env"] = "node scripts/check-env.mjs";
pkg.scripts["dev:validated"] = "npm run validate:env && pnpm dev";
fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
console.log("✅ Added scripts: validate:env, dev:validated");
