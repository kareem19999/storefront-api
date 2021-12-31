
import client from '../database'

export type Order ={
    id?:number
    username :string;
    status?: Boolean;
};

export class Shopping {
    async index(): Promise<Order[]>{
    try
    {
        const conn= await client.connect();
        const sql= 'SELECT * FROM orders_table';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }catch(err){
        throw new Error(`Cannot get orders ${err}`)
    }
    };
    // async show(username: string): Promise<Order[]>{
    // try
    // {
    //     //console.log("Called Order show");
    //     const conn= await client.connect();
    //     const sql= `SELECT * FROM orders_table where username=($1)`;
    //     const result = await conn.query(sql,[username]);
    //     conn.release();
    //     return result.rows;
    // }catch(err){
    //     throw new Error(`Cannot get oders ${err}`)
    // }
    // };
    async create(username: string,productId: number,quantity: number): Promise<Order>{
        try
        {
            const conn= await client.connect();
            //All new orders will be automatically placed as active
            const sql= `INSERT INTO orders_table (username,status) VALUES ($1,$2) RETURNING *`;
            //@ts-ignore
            const result = await conn.query(sql,[username,false]);
            const addProd=this.addProduct(result.rows[0].id,productId,quantity)
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Cannot create order ${err}`)
        }
    };
    async addProduct(orderId: number, productId: number,quantity: number): Promise<{id:number,order_id:number,product_id:number,quantity:number}>{
        try
        {
            const conn= await client.connect();
            //All new orders will be automatically placed as active
            const sql= `INSERT INTO orders_products_table (order_id,product_id,quantity)  VALUES ($1,$2,$3) RETURNING *`;
            //@ts-ignore
            const result = await conn.query(sql,[orderId,productId,quantity]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Cannot add products to order ${err}`)
        }
    };

}