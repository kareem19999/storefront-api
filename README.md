# Storefront Backend Project


- Endpoints related to users_table  
Login route : '/users/login' [GET]                  Send a JSON object having {username:theUsername, password:thePassword}.
Index route : '/users' [GET]                        Send a valid Authentication Bearer Token.
Show route  : '/users/Username=:username [GET]      Send a valid Authentication Bearer Token.
Create route: '/users' [POST]                       Send a JSON object having {username:theUsername,first_name: theFirstName,last_name:theLast_Name,password:thePassword} and valid Authentication Bearer Token.

- Endpoints related to products_table
Index route : '/products' [GET]     No need to send anything.
Show route  : '/products/:id' [GET] No need to send anything.
Create route: '/products' [POST]    Send a JSON object having {name:theName,price:thePrice} and valid Authentication Bearer Token.

- Endpoints related to orders
Index route         : '/orders' [GET]       No need to send anything.
Show route          : '/orders/:username' [GET]  Send a valid authentication token.
Create Route        : '/orders' [POST] Send a JSON object having {username:username}.
Add Product Route   : '/orders/:id/products' [POST] Send a JSON objet having {productId:productId,quantity:quantity}.
- Tables
Table: users_table (username:VARCHAR PRIMARY KEY,first_name:VARCHAR,last_name:VARCHAR,password:VARCHAR)
Table: products_table (id:SERIAL PRIMARY KEY,name:VARCHAR,price:REAL)
Table: orders_table (id:SERIAL PRIMARY KEY,username: STRING FOREIGN KEY REFERENCES users_table(username),status:BOOLEAN) (Status True indicates that order is complete, False indicates order is active)
Table: orders_products_table (id:SERIAL PRIMARY KEY,order_id:NUMBER FOREIGN KEY REFERENCES orders_table(id),product_id:NUMBER FOREIGN KEY REFERENCES products_table(id), quantity integer)


### How to Install:

To prepare it:
Login to PSQL server using admin/default credentials.
CREATE USER shopping_user WITH PASSWORD 'password123';
CREATE DATABASE shopping;
CREATE DATABASE shopping_test;
GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;


Server:
npm install
npm install db-migrate yarn ts-node dotenv -g
db-migrate up

admin credentials (Super user-ish)
Username: admin
Password: admin