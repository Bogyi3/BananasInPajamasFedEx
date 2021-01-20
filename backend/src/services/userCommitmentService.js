import { userCommitmentRepo } from '../repositories';

export const userCommitmentService = {
  async validateCommitmentRequest(userId, commitmentId, challengeDay) {
    if (!userId || !commitmentId || !challengeDay) {
      throw {
        status: 400,
        message: 'userId, commitmentId, challengeDay are required to create new user commitment',
      };
    }
  },

  async saveNewUserCommitments(userId, commitmentId, challengeDay) {
    await this.validateCommitmentRequest(userId, commitmentId, challengeDay);
    // eslint-disable-next-line max-len
    const result = await userCommitmentRepo.insertNewUserCommitment(userId, commitmentId, challengeDay);
    return {
      result,
      message: 'User commitment was saved',
    };
  },
  async deleteUserCommitment(id) {
    if (!id) {
      throw { message: 'User Commitment id is required.', status: 400 };
    }
    const commitmentData = await userCommitmentRepo.getSingleUserCommitmentById(id);
    if (commitmentData.results.length === 0) {
      throw { status: 404, message: 'Not found' };
    }
    await userCommitmentRepo.deleteUserCommitment(id);
    return { message: 'User commitment deleted successfully' };
  },
  async getAllUserCommitmentsByUser(userId) {
    if (!userId) {
      throw { message: 'UserId is required.', status: 400 };
    }
    const result = await userCommitmentRepo.getAllUserCommitmentsByUser(userId);
    return result;
  },
  async getSingleUserCommitment(userId, commitmentId, challengeDay) {
    await this.validateCommitmentRequest(userId, commitmentId, challengeDay);
    // eslint-disable-next-line max-len
    const result = await userCommitmentRepo.getSingleUserCommitment(userId, commitmentId, challengeDay);
    return result;
  },
  async getSingleUserCommitmentById(id, userId) {
    if (!id) {
      throw { message: 'User commitment id is required.', status: 400 };
    }
    if (!userId) {
      throw { message: 'User id is required.', status: 400 };
    }
    const result = await userCommitmentRepo.getSingleUserCommitmentById(id, userId);
    if (result.results.length === 0) {
      throw { status: 404, message: 'No commitment found' };
    }
    return result;
  },
  async updateCompleted(userId, commitmentId, challengeDay) {
    await this.validateCommitmentRequest(userId, commitmentId, challengeDay);
    await userCommitmentRepo.updateCompleted(userId, commitmentId, challengeDay);
    return { message: 'User commitment is completed' };
  },
};
