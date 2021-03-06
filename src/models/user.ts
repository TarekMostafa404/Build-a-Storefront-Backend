// @ts-ignore
import Client from "../database";
import JwtHelper from "../routes/jwt-helper";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *";
      const hashed = JwtHelper.hashPassword(u.password);
      const result = await conn.query(sql, [u.firstName, u.lastName, hashed]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add a new user ${u}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async auth(firstName: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE first_name=($1)";
      const result = await conn.query(sql, [firstName]);

      if (result.rows.length) {
        const dbpass = result.rows[0].password;
        const isPasswordExist = JwtHelper.validatePassword(password,dbpass);


        if (isPasswordExist) {
          return result.rows[0];
        }
      }
      conn.release();
      return null;
    } catch (err) {
      throw new Error(`Could not log in by user ${firstName}. Error: ${err}`);
    }
  }
}
