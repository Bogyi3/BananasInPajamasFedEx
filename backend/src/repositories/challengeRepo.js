import { db } from '../data/connection';

export const challengeRepo = {
  async getChallenges() {
    const sql = 'SELECT challenge_id as id, challenge_name as challengeName, starting_date as startingDate, closing_date as closingDate, min_xp as minXp FROM challenges;';
    return await db.query(sql, []);
  },

  async saveChallenge(challengeName, startingDate, closingDate, minXp) {
    const sql = 'INSERT INTO challenges (challenge_name, starting_date, closing_date, min_xp) VALUES (?, ?, ?, ?);';
    return await db.query(sql, [challengeName, startingDate, closingDate, minXp]);
  },

  async deleteChallenge(challengeName) {
    const sql = 'DELETE FROM challenges WHERE challenge_name=?;';
    return await db.query(sql, [challengeName]);
  },
};
