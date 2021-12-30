import express, {Request,Response} from 'express'
import {Order,Shopping} from '../models/order'
import jwt from 'jsonwebtoken'
import checkNull from '../utilities/checkNull';
import checkNaN from '../utilities/checkNaN';
const shopping= new Shopping();

const index= async (_req: Request, res:Response) => {
    const orders= await shopping.index();
    res.json(orders);
}
const show = async (req: Request, res:Response) => {
    const username:string=req.params.username;
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
    try{
        checkNull([username]);
        const orders=await shopping.show(username);
        res.json(orders);
    }catch(err)
    {
        res.status(400);
        res.json(err);
    }
    
}
const create = async (req: Request, res:Response) => {
    const order: Order={
        username :req.body.username
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
        checkNull([order.username]);
        const result=await shopping.create(order);
        res.json(result);
    }catch(err){
        res.status(400);
        res.json(err);
    }

}
const addProduct = async (req: Request, res:Response) => {
    const orderId:number=parseInt(req.params.id);
    const productId:number=parseInt(req.body.product_id);
    const quantity:number=parseInt(req.body.quantity);
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
        checkNull([orderId,productId,quantity]);
        checkNaN([orderId,productId,quantity]);
        const result=await shopping.addProduct(orderId,productId,quantity);
        res.json(result);
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
const order_routes = ( app: express.Application)=>
{
    //console.log("try to connect");
    app.get('/orders',index);
    app.get('/orders/:username', verifyAuthToken, show);
    app.post('/orders',create);
    app.post('/orders/:id/products',addProduct)
}

export default order_routes;