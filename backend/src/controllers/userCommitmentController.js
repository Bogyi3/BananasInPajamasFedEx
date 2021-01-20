/* eslint-disable max-len */
import { userCommitmentService } from '../services';

export const userCommitmentController = {
  async post(req, res, next) {
    try {
      const {
        commitmentId,
        challengeDay,
      } = req.body;
      const userId = req.user.id;
      const result = await userCommitmentService.saveNewUserCommitments(userId, commitmentId, challengeDay);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const { id } = req.body;
      const result = await userCommitmentService.deleteUserCommitment(id);
      res.status(200).json(result.message);
    } catch (error) {
      next(error);
    }
  },

  async getUserCommitments(req, res, next) {
    try {
      const userId = req.user.id;
      const result = await userCommitmentService.getAllUserCommitmentsByUser(userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async getSingleUserCommitments(req, res, next) {
    try {
      const { commitmentId } = req.params;
      const userId = req.user.id;
      const result = await userCommitmentService.getSingleUserCommitmentById(commitmentId, userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  async updateCompleted(req, res, next) {
    try {
      const {
        commitmentId,
        challengeDay,
      } = req.body;
      const userId = req.user.id;
      const result = await userCommitmentService.updateCompleted(userId, commitmentId, challengeDay);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
