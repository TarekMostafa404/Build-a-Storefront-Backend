import express, { Request, Response } from "express";
import {ProductStore, Product} from "../models/product";

const productRoutes = express.Router();

productRoutes.get('/product/index', async (_req:Request, res: Response)=>{
    const store = new ProductStore();
        const result = await store.index()
        res.send(result)
    })

   productRoutes.get('/product/create', async (_req:Request, res: Response)=>{
        const store = new ProductStore();
        const p: Product = {id:1, name:'p1', price:100, category:'cat'}
            const result = await store.create(p)
            res.send(result)
        })
            

export default productRoutes;
