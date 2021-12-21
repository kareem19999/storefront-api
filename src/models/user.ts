
import client from '../database'
import bcrypt from 'bcrypt'

export type User ={
    username :String;
    first_name?: String ;
    last_name?: String;
    password: String
};

export class Shopping {
    // async index(): Promise<Product[]>{
    // try
    // {
    //     //console.log("Called product index");
    //     const conn= await client.connect();
    //     const sql= 'SELECT * FROM products_table';
    //     const result = await conn.query(sql);
    //     conn.release();
    //     return result.rows;
    // }catch(err){
    //     throw new Error(`Cannot get products ${err}`)
    // }
    // };
    // async show(id: Number): Promise<Product>{
    // try
    // {
    //     //console.log("Called product show");
    //     const conn= await client.connect();
    //     const sql= `SELECT * FROM products_table where id=($1)`;
    //     const result = await conn.query(sql,[id]);
    //     conn.release();
    //     return result.rows[0];
    // }catch(err){
    //     throw new Error(`Cannot get products ${err}`)
    // }
    // };
    // //async create()
    async create(User: User): Promise<User>{
        try
        {
            //console.log("Called product create");
            const {
                BCRYPT_PASSWORD,
                SALT_ROUNDS
            }=process.env;
            const conn= await client.connect();
            const sql= `INSERT INTO users_table (username,first_name,last_name,password) VALUES ($1,$2,$3,$4) RETURNING *`;
            //@ts-ignore
            const hashed=bcrypt.hashSync(User.password+BCRYPT_PASSWORD,parseInt(SALT_ROUNDS));
            const result = await conn.query(sql,[User.username,User.first_name,User.last_name,hashed]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Cannot create users ${err}`)
        }
        };

    async login(username: String, password: String): Promise<User | null>{
        try
        {
            //console.log("Called product create");
            const {
                BCRYPT_PASSWORD,
                SALT_ROUNDS
            }=process.env;
            const conn= await client.connect();
            const sql= `SELECT password FROM users_table WHERE username=($1)`;
            //@ts-ignore
            //const hashed=bcrypt.hashSync(User.password+BCRYPT_PASSWORD,parseInt(SALT_ROUNDS));
            const result = await conn.query(sql,[username]);
            conn.release();
            if(result.rows.length)
            {
                const User=result.rows[0];
                //@ts-ignore
                if(bcrypt.compareSync(password+BCRYPT_PASSWORD,User.password)){
                    return User;
                }
            }
            return null;
        }catch(err){
            throw new Error(`Cannot login ${err}`)
        }
        };
}