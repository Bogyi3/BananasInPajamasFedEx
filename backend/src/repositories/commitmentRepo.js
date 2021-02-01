import { db } from '../data/connection';

export const commitmentRepo = {
  async getCommitments() {
    const sql = 'SELECT commitment_id as id, commitment_name as commitmentName, challenge_id as challengeId, xp FROM commitments;';
    return await db.query(sql, []);
  },

  async saveCommitments(commitmentName, challengeId, xp) {
    const sql = 'INSERT INTO commitments (commitment_name, challenge_id, xp) VALUES (?, ?, ?);';
    return await db.query(sql, [commitmentName, challengeId, xp]);
  },

  async deleteCommitments() {
    const sql = 'DELETE FROM commitments WHERE commitment_id > 0';
    return await db.query(sql);
  },
};
