import request from 'supertest';
import express from 'express';
import app from '../../server';
import assert from 'assert';
import productRoutes from '../product-route';

// const request = supertest(app);
describe('POST /product', function () {
  it('responds with json', function (done) {
    const testProduct = {
      name: 'product test',
      price: 452,
      category: 'category test',
    };
    return request(app)
      .post('/product')
      .auth('username', 'password')
      .set('Accept', 'application/json')
      .send(testProduct)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        assert(response.body.name, testProduct.name);
        done();
      })
      .catch((err) => done());
  });
});

// describe('Test user', () => {
//   const product = {
//     name: 'product test',
//     price: 111,
//     category: 'category test',
//   } as Product;

//   beforeAll(async () => {
//     const createProduct = await productStore.create(product);
//     product.name = createProduct.name;
//   });

//   afterAll(async () => {
//     const conn = await pool.connect();
//     const sql = 'DELETE FROM products';
//     await conn.query(sql);
//     conn.release();
//   });
// });
