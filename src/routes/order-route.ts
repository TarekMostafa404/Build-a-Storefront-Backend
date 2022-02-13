import express, { Request, Response } from "express";
import { request } from "http";
import { OrderStore, Order } from "../models/order";
import JwtHelper from "./jwt-helper";

const orderRoutes = express.Router();

orderRoutes.get("/order", JwtHelper.verifyAuthToken ,async (req: Request, res: Response) => {
  const currentUserId = JwtHelper.getCurrentUser(req).id;

  const store = new OrderStore();
  const result = await store.index(currentUserId);
  res.send(result);
});

orderRoutes.post(
  "/order",
  JwtHelper.verifyAuthToken,
  async (req: Request, res: Response) => {
    const store = new OrderStore();

    const ord: Order = req.body;

    const result = await store.create(ord);

    res.send(result);
  }
);

orderRoutes.post(
  "/order/:id/product",
  JwtHelper.verifyAuthToken,

  async (req: Request, res: Response) => {
    const store = new OrderStore();

    const quantity: number = parseInt(req.body.quantity);
    const orderId: number = parseInt(req.params.id);
    const productId: number = req.body.productId;

    try {
      const addedProduct = await store.addProduct(quantity, orderId, productId);

      res.json(addedProduct);
    } catch (error) {
      res.status(400).json(error);
    }
  }
);

export default orderRoutes;
