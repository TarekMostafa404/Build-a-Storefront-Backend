import { Request, Response, NextFunction } from 'express';
import Jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

class JwtHelper {
  static verifyAuthToken(req: Request, res: Response, next: NextFunction) {
    try {
      JwtHelper.getCurrentUser(req);
      next();
    } catch (error) {
      res.status(401).send('Unauthorized user');
    }
  }

  static getCurrentUser(req: Request): User {
    const authorizationHeader = req.headers.authorization || '';

    const token = authorizationHeader.split(' ')[1];

    const jwtRes = Jwt.verify(token, config.token || '');

    return (<any>jwtRes).user;
  }

  static hashPassword(password: string) {
    const salt = parseInt(config.salt as string, 10);

    return bcrypt.hashSync(`${password}${config.pepper}`, salt);
  }

  static validatePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(`${password}${config.pepper}`, hashPassword);
  }
}

export default JwtHelper;
