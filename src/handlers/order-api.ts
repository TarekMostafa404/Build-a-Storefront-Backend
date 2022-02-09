import express, { Request, Response } from 'express';
import { OrderStore, Order } from '../models/order';

const orderRoutes = express.Router();

orderRoutes.get('/order/', async (_req: Request, res: Response) => {
  const store = new OrderStore();
  const result = await store.index();
  res.send(result);
});

orderRoutes.post('/order/create', async (req: Request, res: Response) => {
  const store = new OrderStore();

  const o: Order = req.body;

  const result = await store.create(o);

  res.send(result);
});

export default orderRoutes;
