-- create orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL
    user_id INTEGER REFERENCES users(id) NOT NULL,
);