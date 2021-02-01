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

  async getCommitments(req, res, next) {
    try {
      const result = await commitmentService.getCommitments();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async saveSingleCommitment(req, res, next) {
    try {
      const commitment = [{
        commitmentName: req.body.commitmentName,
        xp: req.body.xp,
      }];
      const { challengeId } = req.body;
      const result = await commitmentService.saveCommitment(commitment, challengeId);
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

  async deleteChallenge(req, res, next) {
    try {
      const { challengeName } = req.body;
      const result = await challengeService.deleteChallenge(challengeName);
      await commitmentService.deleteCommitments();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
