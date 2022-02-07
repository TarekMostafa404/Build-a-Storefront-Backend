import express, { Request, Response } from 'express';
import { UserStore, User } from '../models/user';

const userRoutes = express.Router();

userRoutes.get('/user', async (_req: Request, res: Response) => {
  const store = new UserStore();

  const result = await store.index();

  res.send(result);
});

userRoutes.get('/:id', async (req: Request, res: Response) => {
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

export default userRoutes;
