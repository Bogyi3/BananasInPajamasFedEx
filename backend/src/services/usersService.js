import { usersRepo } from '../repositories';

export const usersService = {
  async getUserByUsername(username) {
    return await usersRepo.getUserByUsername(username);
  },
};
