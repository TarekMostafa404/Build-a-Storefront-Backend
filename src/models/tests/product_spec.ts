import { Product, ProductStore } from '../product';
import pool from '../../database';

const productStore = new ProductStore();

describe('Product Model', () => {
  it('should have create method', async () => {
    expect(productStore.index).toBeDefined();
    expect(productStore.show).toBeDefined();
    expect(productStore.create).toBeDefined();
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
