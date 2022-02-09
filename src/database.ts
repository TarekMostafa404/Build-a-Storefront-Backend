// import dotenv from 'dotenv';
import { Pool } from 'pg';
import config from './config';

const pool = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});

export default pool;

// const {
//   POSTGRES_HOST,
//   POSTGRES_DB,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_TEST_DB,
//   ENV,
// } = process.env;

// console.log(`Active Environment is < ${ENV} >`);

// if (ENV === 'dev') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//   });
// }

// if (ENV === 'test') {
//   client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_TEST_DB,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD,
//   });
// }

// export default client;
