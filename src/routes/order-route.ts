import express, { Request, Response } from 'express';
import { OrderStore, Order } from '../models/order';

const orderRoutes = express.Router();

orderRoutes.get('/order/', async (_req: Request, res: Response) => {
  const store = new OrderStore();
  const result = await store.index();
  res.send(result);
});

orderRoutes.post(
  '/order/create',
  // JwtHelper.verifyAuthToken,
  async (req: Request, res: Response) => {
    const store = new OrderStore();

    const ord: Order = req.body;

    const result = await store.create(ord);

    res.send(result);
  }
);

orderRoutes.post('/order/:id/product', async (req: Request, res: Response) => {
  const store = new OrderStore();

  const quantity: number = parseInt(req.body.quantity);
  const orderId: number = parseInt(req.params.id);
  const productId: number = req.body.productId;

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    console.log('added');

    res.json(addedProduct);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default orderRoutes;
