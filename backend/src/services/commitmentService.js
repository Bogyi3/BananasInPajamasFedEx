import { commitmentRepo } from '../repositories';

export const commitmentService = {
  async getCommitments() {
    return await commitmentRepo.getCommitments();
  },

  async validateSaveCommitmentRequest(commitmentName, challengeId, xp) {
    if (!commitmentName || !challengeId || !xp) {
      throw {
        status: 400,
        message: 'commitmentName, challengeId, xp are required to create new challenge',
      };
    }
  },

  async saveCommitment(commitments, challengeId) {
    commitments.forEach(async (element) => {
      const { commitmentName, xp } = element;
      await this.validateSaveCommitmentRequest(commitmentName, challengeId, xp);
      await commitmentRepo.saveCommitments(commitmentName, challengeId, xp);
    });
    return {
      message: 'Commitments were saved',
    };
  },

  async deleteCommitments() {
    return await commitmentRepo.deleteCommitments();
  },
};
