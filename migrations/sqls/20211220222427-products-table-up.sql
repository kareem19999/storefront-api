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

CREATE TABLE orders_table (
id SERIAL PRIMARY KEY,
username VARCHAR,
status BOOLEAN
);
ALTER TABLE orders_table ADD FOREIGN KEY (username) REFERENCES users_table(username);
CREATE TABLE orders_products_table (
id SERIAL PRIMARY KEY,
order_id integer,
product_id integer,
quantity integer
);
ALTER TABLE orders_products_table ADD FOREIGN KEY (order_id) REFERENCES orders_table(id);
ALTER TABLE orders_products_table ADD FOREIGN KEY (product_id) REFERENCES products_table(id);
INSERT INTO users_table (username,first_name,last_name,password) VALUES ('admin','admin','admin','$2b$10$iQseha7l87LkKhFVtEHjGeIVM8g4f3rFBzbC8FyiLbJ/5QTnIPF2O');