import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFile = path.join(__dirname, '..', 'data.sqlite');

export const db = new Database(dbFile);
db.pragma('journal_mode = WAL');

// Run migrations programmatically
export function initializeDatabase() {
  try {
    // Create users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        role TEXT NOT NULL DEFAULT 'seeker',
        stripe_customer_id TEXT,
        stripe_subscription_id TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create journal_entries table
    db.exec(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        title TEXT,
        content TEXT NOT NULL,
        prompt TEXT,
        type TEXT NOT NULL DEFAULT 'journal',
        metadata TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create products table
    db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price INTEGER NOT NULL,
        category TEXT NOT NULL,
        image_url TEXT,
        featured BOOLEAN DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database tables initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}
