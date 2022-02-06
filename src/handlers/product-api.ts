import express, { Request, Response } from 'express';
import { ProductStore, Product } from '../models/product';

const productRoutes = express.Router();

productRoutes.get('/product/index', async (_req: Request, res: Response) => {
  const store = new ProductStore();
  const result = await store.index();
  res.send(result);
});

productRoutes.get('/product/show/:id', async (req: Request, res: Response) => {
  const store = new ProductStore();
  const result = await store.show(req.params.id);
  res.send(result);
});

productRoutes.post('/product/create', async (_req: Request, res: Response) => {
  const store = new ProductStore();
  const p: Product = {
    id: 1,
    name: 'p11111111111',
    price: 150,
    category: 'c1111111',
  };
  const result = await store.create(p);
  res.send(result);
});

export default productRoutes;
