import express, { Request, Response } from 'express';
import { OrderStore, Order } from '../models/order';

const userRoutes = express.Router();

userRoutes.get('/order/', async (req: Request, res: Response) => {
  const store = new OrderStore();
  const result = await store.index();
  res.send(result);
});

userRoutes.get('/order/create', async (req: Request, res: Response) => {
  const store = new OrderStore();
  const o: Order = {
    id: 1,
    status: true,
    quantity: 2,
    userID: 1,
    productID: 5,
  };
  const result = await store.create(o);
  res.send(result);
});

export default userRoutes;
