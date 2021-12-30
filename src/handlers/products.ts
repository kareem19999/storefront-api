import express, {Request,Response} from 'express'
import {Product,Shopping} from '../models/product'
import jwt from 'jsonwebtoken'
import checkNull from '../utilities/checkNull'
import checkNaN from '../utilities/checkNaN';
const shopping= new Shopping();

const index= async (_req: Request, res:Response) => {
    const products= await shopping.index();
    res.json(products);
}
const show = async (req: Request, res:Response) => {
    const id:number=parseInt(req.params.id);
    //console.log(req.params);
    try{
        checkNaN([id]);
        const products=await shopping.show(id);
        res.json(products);
    }catch(err)
    {
        res.status(400);
        res.json(err);
    }
    
}
const create = async (req: Request, res:Response) => {
    const Prod: Product={
        name:req.body.name,
        price:parseFloat(req.body.price)
        };
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
    } catch(err) {
        res.status(401)
        res.json('Access denied, invalid token')
        return
    }
    try {
        checkNull([Prod.name,Prod.price]);
        checkNaN([Prod.price]);
        const product=await shopping.create(Prod);
        res.json(product);
    }catch(err){
        res.status(400);
        res.json(err);
    }

}
const verifyAuthToken = (req: Request, res: Response, next: any) => {
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()
    } catch (error) {
        res.status(401)
        res.json("Invalid Token")
    }
}
const product_routes = ( app: express.Application)=>
{
    //console.log("try to connect");
    app.get('/products',index);
    app.get('/products/:id',show);
    app.post('/products',verifyAuthToken,create);
}

export default product_routes;