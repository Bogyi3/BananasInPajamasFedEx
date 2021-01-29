import { challengeService, commitmentService } from '../services';

export const challengeController = {
  async get(req, res, next) {
    try {
      const result = await challengeService.getChallenges();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async post(req, res, next) {
    try {
      const {
        challengeName,
        startingDate,
        closingDate,
        minXp,
        commitments,
      } = req.body;
      // eslint-disable-next-line max-len
      const result = await challengeService.saveChallenge(challengeName, startingDate, closingDate, minXp);
      const challengeId = result.lastInsertedId;
      // eslint-disable-next-line max-len
      const createCommitment = await commitmentService.saveCommitment(commitments, challengeId);
      res.status(200).json({
        challenge: result.message,
        commitment: createCommitment.message,
      });
    } catch (error) {
      next(error);
    }
  },
};
