import supertest from 'supertest';
import { Pool } from 'pg';
import config from '../../config';
import { Product, ProductStore } from '../product';

import app from '../../server';
import pool from '../../database';

const request = supertest(app);

const productStore = new ProductStore();

describe('Product Model', () => {
  it('should have create method', async () => {
    // expect(Store.index).toBeDefined();
    expect(productStore.create).toBeDefined();

    // const result = await productStore.index();

    // expect(result).toEqual([]);
  });
});

describe('Product Model ', () => {
  describe('Test Create Method Exist', () => {
    it('create product should be exist', async () => {
      expect(productStore.create).toBeDefined();
    });
  });
  describe('Test Create Product', () => {
    const product = {
      name: 'product test',
      price: 111,
      category: 'category test',
    } as Product;

    beforeAll(async () => {
      const createProduct = await productStore.create(product);
      product.name = createProduct.name;
    });

    afterAll(async () => {
      const conn = await pool.connect();
      const sql = 'DELETE FROM products';
      await conn.query(sql);
      conn.release();
    });
  });
});
