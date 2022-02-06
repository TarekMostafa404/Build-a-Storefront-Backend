import express, { Request, Response } from 'express';
import { UserStore, User } from '../models/user';

const userRoutes = express.Router();

userRoutes.get('/user/index', async (_req: Request, res: Response) => {
  const store = new UserStore();
  const result = await store.index();
  res.send(result);
});

userRoutes.get('/user/show/:id', async (req: Request, res: Response) => {
  const store = new UserStore();
  const result = await store.show(req.params.id);
  res.send(result);
});

userRoutes.get('/user/create', async (_req: Request, res: Response) => {
  const store = new UserStore();
  const u: User = { id: 2, firstName: 'f2', lastName: 'l2', password: 123 };
  const result = await store.create(u);
  res.send(result);
});

export default userRoutes;
