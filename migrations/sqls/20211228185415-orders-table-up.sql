CREATE TABLE orders_table (
id SERIAL PRIMARY KEY,
username VARCHAR,
status BOOLEAN
);
ALTER TABLE orders_table ADD FOREIGN KEY (username) REFERENCES users_table(username);