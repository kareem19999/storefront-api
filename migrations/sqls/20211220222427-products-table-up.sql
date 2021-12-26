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
INSERT INTO users_table (username,first_name,last_name,password) VALUES ('admin','admin','admin','$2b$10$iQseha7l87LkKhFVtEHjGeIVM8g4f3rFBzbC8FyiLbJ/5QTnIPF2O');