# Storefront Backend Project

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Instruction for running the project correctly

1. Run comand `npm i`
2. Configure the ENV file to the spicified data section
3. Run migrations `db-migrate up`
4. Run the required test 

### Evironment Data

`PORT = 3000
ENV = dev
POSTGRES_PORT = 5432
POSTGRES_HOST = 127.0.0.1
POSTGRES_DB = shopping_app
POSTGRES_DB_TEST = shopping_app_test
POSTGRES_USER = postgres
POSTGRES_PASSWORD = password
BCRYPT_PASSWORD = keep_coding
SALT_ROUNDS = 10
TOKEN = udacity-token`
