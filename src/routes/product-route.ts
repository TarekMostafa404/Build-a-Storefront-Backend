import express, { Request, Response } from 'express';
import { ProductStore, Product } from '../models/product';
import JwtHelper from './jwt-helper';

const productRoutes = express.Router();

productRoutes.get('/product', async (_req: Request, res: Response) => {
  try {
    const store = new ProductStore();

    const result = await store.index();

    res.send(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send('There is an error, please contact the administrator.');
  }
});

productRoutes.get('/product/:id', async (req: Request, res: Response) => {
  try {
    const store = new ProductStore();

    const result = await store.show(req.params.id);

    res.send(result);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send('There is an error, please contact the administrator.');
  }
});

productRoutes.get(
  '/product/delete/:id',
  async (req: Request, res: Response) => {
    try {
      const store = new ProductStore();

      const result = await store.delete(req.params.id);

      res.send(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send('There is an error, please contact the administrator.');
    }
  }
);

productRoutes.post(
  '/product',
  JwtHelper.verifyAuthToken,
  async (req: Request, res: Response) => {
    try {
      const store = new ProductStore();

      const p: Product = req.body;

      const result = await store.create(p);

      res.send(result);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send('There is an error, please contact the administrator.');
    }
  }
);

export default productRoutes;
