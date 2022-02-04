import express, { Request, Response } from "express";
import { UserStore, User } from "../models/user";

const userRoutes = express.Router();

userRoutes.get("/user/index", async (req: Request, res: Response) => {
  const store = new UserStore();
  const result = await store.index();
  res.send(result);
});

userRoutes.get("/user/create", async (req: Request, res: Response) => {
  const store = new UserStore();
  const u: User = { id: 1, firstName: "f1", lastName: "l1", password: 123 };
  const result = await store.create(u);
  res.send(result);
});

export default userRoutes;
