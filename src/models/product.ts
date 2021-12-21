
import client from '../database'

export type Product ={
    id? :Number;
    name: String ;
    price: Number
};

export class Shopping {
    async index(): Promise<Product[]>{
    try
    {
        //console.log("Called product index");
        const conn= await client.connect();
        const sql= 'SELECT * FROM products_table';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }catch(err){
        throw new Error(`Cannot get products ${err}`)
    }
    };
    async show(id: Number): Promise<Product>{
    try
    {
        //console.log("Called product show");
        const conn= await client.connect();
        const sql= `SELECT * FROM products_table where id=($1)`;
        const result = await conn.query(sql,[id]);
        conn.release();
        return result.rows[0];
    }catch(err){
        throw new Error(`Cannot get products ${err}`)
    }
    };
    //async create()
    async create(Product: Product): Promise<Product>{
        try
        {
            //console.log("Called product create");
            const conn= await client.connect();
            const sql= `INSERT INTO products_table (name,price) VALUES ($1,$2) RETURNING *`;
            const result = await conn.query(sql,[Product.name,Product.price]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Cannot create products ${err}`)
        }
        };
}