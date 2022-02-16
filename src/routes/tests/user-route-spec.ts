// import request from 'supertest';
// import express from 'express';
// import app from '../../server';
// import assert from 'assert';
// import productRoutes from '../product-route';

// // const request = supertest(app);
// describe('POST /user', function () {
//   it('responds with created user', function (done) {
//     const testUser = {
//       firstName: 'user1',
//       lastName: 'user1',
//       password: '123',
//     };
//     return (
//       request(app)
//         .post('/user')
//         // .auth('username', 'password')
//         .set('Accept', 'application/json')
//         .send(testUser)
//         // .expect('Content-Type', /json/)
//         .expect(500)
//         .then((response) => {
//           assert(response.body.firstName !== testUser.firstName);
//           done();
//         })
//       // .catch((err) => {
//       //   throw new Error(err);
//       // })
//     );
//   });
// });
