CREATE TABLE orders_products_table (
id SERIAL PRIMARY KEY,
order_id integer,
product_id integer,
quantity integer
);
ALTER TABLE orders_products_table ADD FOREIGN KEY (order_id) REFERENCES orders_table(id);
ALTER TABLE orders_products_table ADD FOREIGN KEY (product_id) REFERENCES products_table(id);
