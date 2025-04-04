// src/config/db.ts
import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../tmp/otp.db');
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
