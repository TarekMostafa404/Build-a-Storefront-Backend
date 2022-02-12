import express, { Request, Response } from "express";
import { ProductStore, Product } from "../models/product";
import Jwt from "jsonwebtoken";
import config from "../config";
import JwtHelper from "./jwt-helper";

const productRoutes = express.Router();

productRoutes.get("/product", async (_req: Request, res: Response) => {
  const store = new ProductStore();

  const result = await store.index();

  res.send(result);
});

productRoutes.get("/product/:id", async (req: Request, res: Response) => {
  const store = new ProductStore();

  const result = await store.show(req.params.id);

  res.send(result);
});

productRoutes.post(
  "/product/create",
  JwtHelper.verifyAuthToken,
  async (req: Request, res: Response) => {
    const store = new ProductStore();

    const p: Product = req.body;

    const result = await store.create(p);

    res.send(result);
  }
);

export default productRoutes;
