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
