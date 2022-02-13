-- create order-products table
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    user_id INTEGER REFERENCES users(id) NOT NULL
);