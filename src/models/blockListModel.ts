// src/models/blockListModel.ts
import db from '../config/db';

export interface BlockEntry {
  id?: number;
  email: string;
  ip: string;
  reason?: string;
  blockedAt?: string;
}

// Ensure table exists
db.prepare(`
  CREATE TABLE IF NOT EXISTS block_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    ip TEXT NOT NULL,
    reason TEXT,
    blockedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

export const isBlocked = (email: string, ip: string): boolean => {
  const stmt = db.prepare(
    'SELECT 1 FROM block_list WHERE email = ? OR ip = ? ORDER BY blockedAt DESC LIMIT 1'
  );
  const result = stmt.get(email, ip);
  return !!result;
};

export const blockEmail = (email: string, ip: string, reason: string = 'Spam'): void => {
  const stmt = db.prepare(
    'INSERT INTO block_list (email, ip, reason) VALUES (?, ?, ?)'
  );
  stmt.run(email, ip, reason);
};
