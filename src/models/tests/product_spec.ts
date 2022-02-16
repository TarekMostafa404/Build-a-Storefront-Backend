import { Product, ProductStore } from '../product';
import pool from '../../database';

const productStore = new ProductStore();

describe('Product Model', () => {
  it('should have index method', async () => {
    expect(productStore.index).toBeDefined();
  });
  it('should have show method', async () => {
    expect(productStore.show).toBeDefined();
  });
  it('should have create method', async () => {
    expect(productStore.create).toBeDefined();
  });
});

describe('Test Create Product method', () => {
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

  it('index method should return all products', async () => {
    const productsList = await productStore.index();
    expect(productsList.length).toBeGreaterThan(0);
  });

  it('create method should return a new product', async () => {
    const testProduct = {
      name: 'product test',
      price: 111,
      category: 'category test',
    } as Product;
    const createdProduct = await productStore.create(testProduct);

    expect(createdProduct.id).toBeGreaterThan(0);
  });

  it('show method should return a specific product', async () => {
    const testProduct = {
      name: 'product test',
      price: 111,
      category: 'category test',
    } as Product;
    const createdProduct = await productStore.create(testProduct);
    const product = await productStore.show(createdProduct.id.toString());
    expect(createdProduct.id).toEqual(product.id);
  });
});
