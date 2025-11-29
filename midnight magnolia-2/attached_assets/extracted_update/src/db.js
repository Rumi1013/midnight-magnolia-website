import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const dbFile = path.join(__dirname, '..', 'data.sqlite');

export function getDB() {
  const db = new Database(dbFile);
  db.pragma('journal_mode = WAL');
  return db;
}

function migrate() {
  const db = getDB();
  const sql = fs.readFileSync(path.join(__dirname, '..', 'sql', '001_init.sql'), 'utf8');
  db.exec(sql);

  // Seed one product if empty
  const count = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  if (count === 0) {
    db.prepare(`
      INSERT INTO products (slug, title, description, price_cents, status)
      VALUES (@slug, @title, @description, @price_cents, 'published')
    `).run({
      slug: 'soft-steps-90-day',
      title: 'Soft Steps: 90-Day Journal (Digital)',
      description: 'A gentle, neurodivergent-friendly healing journal.',
      price_cents: 1900
    });
  }
  console.log('Migration complete.');
}

if (process.argv[2] === 'migrate') migrate();