import express, {Request,Response} from 'express'
import {Product,Shopping} from '../models/product'

const shopping= new Shopping();

const index= async (_req: Request, res:Response) => {
    const products= await shopping.index();
    res.json(products);
}
const show = async (req: Request, res:Response) => {
    const id:number=parseInt(req.params.id);
    //console.log(req.params);
    try{
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
    //console.log(req.body);
    try {
        const products=await shopping.create(Prod);
        res.json(products);
    }catch(err){
        res.status(400);
        res.json(err);
    }

}
const product_routes = ( app: express.Application)=>
{
    //console.log("try to connect");
    app.get('/products',index);
    app.get('/products/:id',show);
    app.post('/products',create);
}

export default product_routes;