
import client from '../database'
import bcrypt from 'bcrypt'

export type User ={
    username :string;
    first_name?: string ;
    last_name?: string;
    password?: string
};

export class Shopping {
    async index(): Promise<User[]>{
    try
    {
        const conn= await client.connect();
        const sql= 'SELECT username,first_name,last_name FROM users_table';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }catch(err){
        throw new Error(`Cannot get users ${err}`)
    }
    };
    async show(username: string): Promise<User>{
    try
    {
        //console.log("Called user show");
        const conn= await client.connect();
        const sql= `SELECT username,first_name,last_name FROM users_table where username=($1)`;
        const result = await conn.query(sql,[username]);
        conn.release();
        return result.rows[0];
    }catch(err){
        throw new Error(`Cannot get users ${err}`)
    }
    };
    async create(User: User): Promise<User>{
        try
        {
            //console.log("Called user create");
            const {
                BCRYPT_PASSWORD,
                SALT_ROUNDS
            }=process.env;
            const conn= await client.connect();
            //console.log(User)
            const sql= `INSERT INTO users_table (username,first_name,last_name,password) VALUES ($1,$2,$3,$4) RETURNING username,first_name,last_name`;
            //@ts-ignore
            const hashed=bcrypt.hashSync(User.password+BCRYPT_PASSWORD,parseInt(SALT_ROUNDS));
            const result = await conn.query(sql,[User.username,User.first_name,User.last_name,hashed]);
            conn.release();
            return result.rows[0];
        }catch(err){
            throw new Error(`Cannot create users ${err}`)
        }
    };

    async login(username: string, password: string): Promise<User | null>{
        //console.log("Called login");
        try
        {
            
            const {
                BCRYPT_PASSWORD,
                SALT_ROUNDS
            }=process.env;
            const conn= await client.connect();
            const sql= `SELECT password FROM users_table WHERE username=($1)`;
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