// src/config/db.ts
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = '/tmp/db';
const dbPath = path.join(dbDir, 'otp.db');

// Ensure the directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS otp (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        otp TEXT NOT NULL,
        attempts INTEGER DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

export default db;
