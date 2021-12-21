import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

let client: Pool;
const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_Test,
    POSTGRES_PORT,
    MODE,
}= process.env;
console.log("hello");
//console.log(ENV);
if(MODE === 'test') {
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB_Test,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      port: (POSTGRES_PORT as unknown) as number
    })
    //console.log("Test");
  }else if(MODE === 'dev') {
    //console.log("Dev");
    client = new Pool({
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      port: (POSTGRES_PORT as unknown) as number
    })

  }else {
      console.log("Nothing");
  }
//@ts-ignore
export default client