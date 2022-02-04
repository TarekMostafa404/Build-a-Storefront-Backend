import express, { Request, Response } from "express";
import {ProductStore, Product} from "../models/product";

const routes = express.Router();


routes.get('/product/index', async (req:Request, res: Response)=>{
    const store = new ProductStore();
        const result = await store.index()
        res.send(result)
    })

    routes.get('/product/create', async (req:Request, res: Response)=>{
        const store = new ProductStore();
        const p: Product = {id:1, name:'p1', price:100, category:'cat'}
            const result = await store.create(p)
            res.send(result)
        })
            



export default routes;
