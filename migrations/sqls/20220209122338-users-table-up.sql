-- create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_Name VARCHAR(50) NOT NULL,
    last_Name VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL
);