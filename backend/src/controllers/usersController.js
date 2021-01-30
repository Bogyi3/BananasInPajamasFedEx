import { usersService } from '../services';

export const usersController = {
  async getUserByUsername(req, res, next) {
    try {
      const result = await usersService.getUserByUsername(req.params.username);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
