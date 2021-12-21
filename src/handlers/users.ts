import express, {Request,Response} from 'express'
import {User,Shopping} from '../models/user'

const shopping= new Shopping();

// const index= async (_req: Request, res:Response) => {
//     const users= await shopping.index();
//     res.json(users);
// }
// const show = async (req: Request, res:Response) => {
//     const id:number=parseInt(req.params.id);
//     //console.log(req.params);
//     try{
//         const products=await shopping.show(id);
//         res.json(products);
//     }catch(err)
//     {
//         res.status(400);
//         res.json(err);
//     }
    
// }
const create = async (req: Request, res:Response) => {
    const User: User={
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
        };
    //console.log(req.body);
    try {
        const Users=await shopping.create(User);
        res.json(User);
    }catch(err){
        res.status(400);
        res.json(err);
    }

}
const login = async (req: Request, res:Response) => {
    const User: User={
        username: req.body.username,
        password: req.body.password
        };
    //console.log(req.body);
    try {
        const Users=await shopping.login(User.username,User.password);
        res.json(User);
    }catch(err){
        res.status(400);
        res.json(err);
    }

}
const product_routes = ( app: express.Application)=>
{
    //console.log("try to connect");
    //app.get('/products',index);
    //app.get('/products/:id',show);
    app.post('/users',create);
}

export default product_routes;