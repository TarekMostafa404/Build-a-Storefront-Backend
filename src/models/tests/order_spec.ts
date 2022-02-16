import { User, UserStore } from "../user";
import { Order, OrderStore } from "../order";
import pool from "../../database";
import { Product, ProductStore } from "../product";

const productStore = new ProductStore();
const userStore = new UserStore();
const orderStore = new OrderStore();

describe("Order Model", () => {
  it("should have index method", async () => {
    expect(orderStore.index).toBeDefined();
  });

  it("should have show method", async () => {
    expect(orderStore.show).toBeDefined();
  });

  it("should have create method", async () => {
    expect(orderStore.create).toBeDefined();
  });

  it("should have addProduct method", async () => {
    expect(orderStore.addProduct).toBeDefined();
  });

});

describe("Test Create Order method", () => {
  const order = {
    status: "order test",
    userId: "-1",
  } as Order;

  const user = {
    firstName: "user test",
    lastName: "user test",
    password: "category test",
  } as User;

  const product = {
    name: "product test",
    price: 111,
    category: "category test",
  } as Product;

  beforeAll(async () => {
    const createUser = await userStore.create(user);
    user.id = createUser.id;
    order.userId = createUser.id.toString();

    const createProduct = await productStore.create(product);
    product.id = createProduct.id;

    const createOrder = await orderStore.create(order);
    order.id = createOrder.id;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    await conn.query('DELETE FROM order_products');
    await conn.query('DELETE FROM orders');
    await conn.query('DELETE FROM products');
    await conn.query('DELETE FROM users');
    conn.release();
  });

  it("index method should return all orders", async () => {
    const ordersList = await orderStore.index(user.id);
    expect(ordersList.length).toBeGreaterThan(0);
  });

  it("create method should create a new order", async () => {
    const testOrder = {
      status: "active",
      userId: user.id.toString(),
    } as Order;

    const createOrder = await orderStore.create(testOrder);

    expect(createOrder.id).toBeGreaterThan(0);
  });

  it("show method should return a specific order", async () => {
    const testOrder = {
      status: "active",
      userId: user.id.toString(),
    } as Order;

    const createOrder = await orderStore.create(testOrder);
    const order = await orderStore.show(createOrder.id.toString());
    expect(createOrder.id).toEqual(order.id);
  });

  it("addProduct method should add product to order", async () => {
    const testOrder = {
      status: "active",
      userId: user.id.toString(),
    } as Order;

    const createOrder = await orderStore.create(testOrder);
    const result = await orderStore.addProduct(3, createOrder.id, product.id);
    expect(result).toBe(true);
  });
});
