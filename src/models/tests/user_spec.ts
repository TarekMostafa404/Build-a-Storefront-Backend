import { User, UserStore } from '../user';
import pool from '../../database';

const userStore = new UserStore();

describe('User Model', () => {
  it('should have index method', async () => {
    expect(userStore.index).toBeDefined();
  });
  it('should have show method', async () => {
    expect(userStore.show).toBeDefined();
  });
  it('should have create method', async () => {
    expect(userStore.create).toBeDefined();
  });
});

describe('Test Create User method', () => {
  const user = {
    firstName: 'user test',
    lastName: 'user test',
    password: 'category test',
  } as User;

  beforeAll(async () => {
    const createuser = await userStore.create(user);
    // user.firstName = createuser.firstName;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    const sql = 'DELETE FROM users';
    await conn.query(sql);
    conn.release();
  });

  it('index method should return all users', async () => {
    const usersList = await userStore.index();
    expect(usersList.length).toBeGreaterThan(0);
  });

  it('create method should return a new user', async () => {
    const testuser = {
      firstName: 'user test',
      lastName: 'user test',
      password: 'category test',
    } as User;
  
    const createduser = await userStore.create(testuser);

    expect(createduser.id).toBeGreaterThan(0);
  });

  it('show method should return a specific user', async () => {
    const testuser = {
      firstName: 'user test',
      lastName: 'user test',
      password: 'category test',
    } as User;
  
    const createduser = await userStore.create(testuser);

    const user = await userStore.show(createduser.id.toString());
    
    expect(createduser.id).toEqual(user.id);
  });
});
