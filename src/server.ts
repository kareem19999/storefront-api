import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import product_routes from './handlers/products'
import user_routes from './handlers/users'
import order_routes from './handlers/orders'

const corsOptions = {
    "origin": 'http://someotherdomain.com',
    "optionsSuccessStatus": 200
}
const app: express.Application = express()
const port=8000;

app.use(bodyParser.json())
app.listen(cors); //This worked but cors(corsOptions) didnt work?
app.get('/hi', function (req: Request, res: Response) {
    res.send('Hello World!')
})
product_routes(app);
user_routes(app);
order_routes(app);
app.get('/test-cors',cors(corsOptions),(req:Request,res:Response)=>
    {
        res.json({msg:"This is CORS enabled"})
    })
app.listen(port, function () {
    console.log(`starting app on: ${port}`)
})

export default app;
