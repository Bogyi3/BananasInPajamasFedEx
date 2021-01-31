import { db } from '../data/connection';

export const userCommitmentRepo = {
  async insertNewUserCommitment(userId, commitmentId, challengeDay, completed) {
    const sql = 'INSERT INTO user_commitments (user_id, commitment_id, challenge_day) VALUES (?, ?, ?);';
    return await db.query(sql, [userId, commitmentId, challengeDay, completed]);
  },
  async getSingleUserCommitment(userId, commitmentId, challengeDay) {
    const sql = 'SELECT id, user_id as userId, commitment_id as commitmentId, challenge_day as challengeDay, completed FROM user_commitments WHERE user_id=? AND commitment_id=? AND challenge_day=?;';
    return await db.query(sql, [userId, commitmentId, challengeDay]);
  },
  async getSingleUserCommitmentById(id, userId) {
    const sql = 'SELECT id, user_id as userId, commitment_id as commitmentId, challenge_day as challengeDay, completed FROM user_commitments WHERE id=? AND user_id=?;';
    return await db.query(sql, [id, userId]);
  },
  async getAllUserCommitmentsByUser(userId) {
    const sql = 'SELECT id, user_id as userId, commitment_id as commitmentId, challenge_day as challengeDay, completed FROM user_commitments WHERE user_id=?;';
    return await db.query(sql, [userId]);
  },
  async deleteUserCommitment(id) {
    const sql = 'DELETE FROM user_commitments WHERE id=?;';
    return await db.query(sql, [id]);
  },
  async updateCompleted(id, userId) {
    const sql = 'UPDATE user_commitments SET completed=true WHERE id=? AND user_id=?;';
    return await db.query(sql, [id, userId]);
  },
  async getAllUsers() {
    const sql = `SELECT DISTINCT user_commitments.user_id as id, username
    FROM user_commitments
    LEFT JOIN users ON user_commitments.user_id = users.user_id
    ORDER BY username ASC;`;
    return await db.query(sql, []);
  },

};
