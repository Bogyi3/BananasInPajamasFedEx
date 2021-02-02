import { usersRepo } from '../repositories';

export const usersService = {
  async getUserByUsername(username) {
    return await usersRepo.getUserByUsername(username);
  },
  async updateUserXp(username, xp) {
    const user = await usersRepo.getUserByUsername(username);
    const { userXp } = user.results[0];
    return await usersRepo.updateUserXp(username, userXp + xp);
  },
};
