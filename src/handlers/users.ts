import express, {Request,Response} from 'express'
import {User,Shopping} from '../models/user'
import jwt from 'jsonwebtoken'
const shopping= new Shopping();

const index= async (req: Request, res:Response) => {
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
        const users= await shopping.index();
        res.json(users);
    }catch(err)
    {
        res.status(400)
        res.json(err)
    }

}
const show = async (req: Request, res:Response) => {
    const username:String=req.params.username;
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
        const Users=await shopping.show(username);
        res.json(Users);
    }catch(err)
    {
        res.status(400);
        res.json(err);
    }
    
}
const create = async (req: Request, res:Response) => {
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
        const User: User={
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
            };
        const Users=await shopping.create(User);
        //var token = jwt.sign({user: Users},process.env.TOKEN_SECRET);
        res.json(Users);
    }catch(err){
        //@ts-ignore
        console.log(err);
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
        var token = jwt.sign({user: Users},process.env.TOKEN_SECRET as string);
        res.json(token);
        
    }catch(err){
        res.status(400);
        //@ts-ignore
        res.json(err+User);
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

const user_routes = ( app: express.Application)=>
{
    app.get('/users',verifyAuthToken,index);
    app.get('/users/Username=:username',verifyAuthToken,show);
    app.post('/users',verifyAuthToken,create);
    app.get('/users/login',login)
}

export default user_routes