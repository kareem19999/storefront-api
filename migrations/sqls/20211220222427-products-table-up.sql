/* Replace with your SQL commands */
CREATE TABLE products_table (
id SERIAL PRIMARY KEY,
name VARCHAR,
price REAL
);
CREATE TABLE users_table (
username VARCHAR PRIMARY KEY,
first_name VARCHAR,
last_name VARCHAR,
password VARCHAR
);