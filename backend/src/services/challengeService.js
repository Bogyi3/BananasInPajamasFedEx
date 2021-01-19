import { challengeRepo } from '../repositories';

export const challengeService = {
  async getChallenges() {
    return await challengeRepo.getChallenges();
  },

  async validateSaveChallengeRequest(challengeName, startingDate, closingDate, minXp) {
    if (!challengeName || !startingDate || !closingDate || !minXp) {
      throw {
        status: 400,
        message: 'ChallengeName, startingDate, closingDate, minXp are required to create new challenge',
      };
    }
  },

  async saveChallenge(challengeName, startingDate, closingDate, minXp) {
    await this.validateSaveChallengeRequest(challengeName, startingDate, closingDate, minXp);
    // eslint-disable-next-line max-len
    const insertChallenge = await challengeRepo.saveChallenge(challengeName, startingDate, closingDate, minXp);
    const lastInsertedId = insertChallenge.results.insertId;
    // const getLastChallenge = await this.getOrderById(lastInsertedId);
    return lastInsertedId;
  },
};
