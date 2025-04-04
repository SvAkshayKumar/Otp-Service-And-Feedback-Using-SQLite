import db from '../config/db';

export const insertOTP = (email: string, otp: string) => {
  const stmt = db.prepare('INSERT INTO otp (email, otp, attempts, createdAt) VALUES (?, ?, 1, ?)');
  stmt.run(email, otp, new Date().toISOString());
};

export const getLatestOTP = (email: string) => {
  const stmt = db.prepare(
    'SELECT * FROM otp WHERE email = ? ORDER BY createdAt DESC LIMIT 1'
  );
  return stmt.get(email);
};

export const deleteOTP = (id: number) => {
  const stmt = db.prepare('DELETE FROM otp WHERE id = ?');
  stmt.run(id);
};

export const incrementAttempts = (id: number) => {
  const stmt = db.prepare('UPDATE otp SET attempts = attempts + 1 WHERE id = ?');
  stmt.run(id);
};
