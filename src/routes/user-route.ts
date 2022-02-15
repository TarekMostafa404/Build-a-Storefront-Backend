import express, { Request, Response } from 'express';
import { UserStore, User } from '../models/user';
import Jwt from 'jsonwebtoken';
import config from '../config';
import JwtHelper from './jwt-helper';

const userRoutes = express.Router();

userRoutes.get(
  '/user',
  JwtHelper.verifyAuthToken,
  async (_req: Request, res: Response) => {
    try {
      const store = new UserStore();

      const result = await store.index();

      res.send(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send('There is an error, please contact the administrator.');
    }
  }
);

userRoutes.get(
  '/user/:id',
  JwtHelper.verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const store = new UserStore();

      const result = await store.show(req.params.id);

      res.send(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send('There is an error, please contact the administrator.');
    }
  }
);

userRoutes.post('/user', async (req: Request, res: Response) => {
  try {
    const store = new UserStore();

    const u: User = req.body;

    const result = await store.create(u);

    res.send(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send('There is an error, please contact the administrator.');
  }
});

userRoutes.post('/user/auth', async (req: Request, res: Response) => {
  try {
    const store = new UserStore();

    const { firstName, password } = req.body;

    const user = await store.auth(firstName, password);

    const token = Jwt.sign({ user }, config.token as string);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        msg: 'invalid user name or password',
      });
    }
    return res.json({
      status: 'success',
      data: { user, token },
      msg: 'valid user',
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send('There is an error, please contact the administrator.');
  }
});

export default userRoutes;
