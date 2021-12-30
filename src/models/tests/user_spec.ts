import { User, Shopping} from '../user';
import supertest from 'supertest';
import app from '../../server'
const Token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpudWxsLCJpYXQiOjE2NDA1NTE3Nzd9.fwNVS3XVYvLtyuynePvDneqDmIqM-woBKP3eYD7wxj0" //This is token generated from signing in admin
const request = supertest(app)
const shopping = new Shopping();
describe("User Tests", ()=> {
    it("Should have index method", () => {
        expect(shopping.index).toBeDefined();
    });
    it("Should have show method", () => {
        expect(shopping.show).toBeDefined();
    });
    it("Should have create method", () => {
        expect(shopping.create).toBeDefined();
    });
    it("Should have login method", () => {
        expect(shopping.login).toBeDefined();
    });
    it("Should login admin ", async ()=> {
        const result= await request.post('/users/login').send({username:"admin",password: "admin"});
        expect(result.statusCode).toEqual(200);
     });
    it("Should index all users", async() => {
        const result= await request.get('/users').auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(200);
    });
    it("Create should add a User of username:Alpha10 first_name:John last_name:Doe password:1234abcd where password is hashed. Using admin's token", async ()=> {
        const result= await request.post('/users').send({username:"Alpha10",first_name:"John",last_name:"Doe",password:"1234abcd"}).auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(200);
     });
     it("Create should return 401 because incorrect token", async ()=> {
        const result= await request.post('/users').send({username:"Alpha11",first_name: "John",last_name:"Doe",password:"1234abcd"}).auth("13443", {type:'bearer'});
        expect(result.statusCode).toEqual(401);
     });
     it("Show should show Alpha10 datails", async ()=> {
        const result= await request.get('/users/Username=Alpha10').auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(200);
     });
});
