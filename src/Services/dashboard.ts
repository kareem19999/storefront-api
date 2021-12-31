import { createCipheriv } from "crypto";
import { resourceLimits } from "worker_threads";
import client from "../database";

export class DashBoardQueries {
    async ordersByUser(username: string): Promise<{
        username: string, 
        order_id: number, 
        status: boolean, 
        product_id: number, 
        quantity: number, 
        name: string, 
        unit_price: number}[]> 
        {
            try{
            const conn= await client.connect();
            const sql = `SELECT 
            orders_table.username, 
            orders_table.id AS order_id, 
            orders_table.status, 
            orders_products_table.product_id AS product_id, 
            orders_products_table.quantity, 
            products_table.name, 
            products_table.price AS unit_price 
            FROM orders_products_table 
            INNER JOIN orders_table ON orders_table.id = orders_products_table.order_id 
            INNER JOIN products_table ON orders_products_table.product_id = products_table.id WHERE orders_table.username = ($1) ORDER by order_id ASC;`
            const result=await conn.query(sql,[username]);
            conn.release()

            return result.rows
            }catch(err) {
                throw new Error('Unable to get orders: ${err')
            }
        }
}