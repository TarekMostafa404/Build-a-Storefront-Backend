import express, { Request, Response } from 'express';
import { UserStore, User } from '../models/user';
import Jwt from 'jsonwebtoken';
import config from '../config';

const userRoutes = express.Router();

userRoutes.get('/user', async (_req: Request, res: Response) => {
  const store = new UserStore();

  const result = await store.index();

  res.send(result);
});

userRoutes.get('/user/:id', async (req: Request, res: Response) => {
  const store = new UserStore();

  const result = await store.show(req.params.id);

  res.send(result);
});

userRoutes.post('/user/create', async (req: Request, res: Response) => {
  const store = new UserStore();

  const u: User = req.body;

  const result = await store.create(u);

  res.send(result);
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
  }
});

export default userRoutes;
