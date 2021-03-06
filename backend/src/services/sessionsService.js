import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersRepo } from '../repositories/usersRepo';
import config from '../config';

export const sessionsService = {

  generateAccessToken({ id, username, userType }) {
    return jwt.sign({ id, username, userType }, config.secret, { expiresIn: '1800000' });
  },

  async getToken(username, password) {
    if (!username || !password) {
      throw { message: 'Username and/or password not provided!', status: 400 };
    }

    const user = await usersRepo.getUserByUsername(username);

    if (!user.results[0]) {
      throw { message: 'No such user!', status: 400 };
    }
    const passwordCheck = await usersRepo.getPassword(username);

    if (!await bcrypt.compare(password, passwordCheck.results[0].passwordHash)) {
      throw { message: 'Username and password do not match!', status: 400 };
    }

    const token = this.generateAccessToken({
      id: user.results[0].id,
      username,
      userType: user.results[0].userType,
    });

    const returnData = {
      id: user.results[0].id,
      username,
      token,
      userType: user.results[0].userType,
    };

    return returnData;
  },

};
