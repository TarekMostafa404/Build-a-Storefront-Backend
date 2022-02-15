import express, { Request, Response } from 'express';
import { OrderStore, Order } from '../models/order';
import JwtHelper from './jwt-helper';

const orderRoutes = express.Router();

orderRoutes.get(
  '/order',
  JwtHelper.verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const currentUserId = JwtHelper.getCurrentUser(req).id;

      const store = new OrderStore();
      const result = await store.index(currentUserId);
      res.send(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send('There is an error, please contact the administrator.');
    }
  }
);

orderRoutes.post(
  '/order',
  JwtHelper.verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const store = new OrderStore();

      const ord: Order = req.body;

      const result = await store.create(ord);

      res.send(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send('There is an error, please contact the administrator.');
    }
  }
);

orderRoutes.post(
  '/order/:id/product',
  JwtHelper.verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const store = new OrderStore();

      const quantity: number = parseInt(req.body.quantity);
      const orderId: number = parseInt(req.params.id);
      const productId: number = req.body.productId;
      const addedProduct = await store.addProduct(quantity, orderId, productId);

      res.json(addedProduct);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send('There is an error, please contact the administrator.');
    }
  }
);

export default orderRoutes;
