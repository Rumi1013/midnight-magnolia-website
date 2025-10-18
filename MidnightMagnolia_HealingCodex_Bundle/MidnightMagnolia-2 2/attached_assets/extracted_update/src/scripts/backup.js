import fs from 'fs';
import path from 'path';
import url from 'url';
import zlib from 'zlib';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '..', 'data.sqlite');
const outDir = path.join(__dirname, '..', '..', 'backups');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
const stamp = new Date().toISOString().split('T')[0];
const out = path.join(outDir, `sqlite-backup-${stamp}.sqlite.gz`);

fs.createReadStream(dbPath).pipe(zlib.createGzip()).pipe(fs.createWriteStream(out)).on('finish',()=>{
  console.log('Backup written to', out);
});