import { db } from '../data/connection';

export const usersRepo = {
  async insertNewUser(username, firstName, lastName, email, hashedPassword) {
    const sql = 'INSERT INTO users (username, first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?, ?);';
    return await db.query(sql, [username, firstName, lastName, email, hashedPassword]);
  },
  async getUserByUsername(username) {
    const sql = 'SELECT user_id as id, username, first_name as firstName, last_name as lastName, email, user_type as userType, user_xp as userXp FROM users WHERE username=?;';
    return await db.query(sql, [username]);
  },
  async getUserByEmail(email) {
    const sql = 'SELECT user_id as id, username, first_name as firstName, last_name as lastName, email, user_type as userType, user_xp as userXp FROM users WHERE email=?;';
    return await db.query(sql, [email]);
  },
  async getPassword(username) {
    const sql = 'SELECT password_hash AS passwordHash FROM users WHERE username=?;';
    return await db.query(sql, [username]);
  },
  async getAllUsers() {
    const sql = 'SELECT user_id as id, username, first_name as firstName, last_name as lastName, email, user_type as userType, user_xp as userXp FROM users;';
    return await db.query(sql, []);
  },
  async updateUserXp(username, xp) {
    const sql = `UPDATE users SET user_xp = ? WHERE username = '${username}';`;
    return await db.query(sql, [xp]);
  },
  async getUserXp(username) {
    const sql = `SELECT user_xp FROM users WHERE username = '${username}';`;
    return await db.query(sql, []);
  },
};
