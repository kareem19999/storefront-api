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
    it("Route Test: Should login admin ", async ()=> {
        const result= await request.post('/users/login').send({username:"admin",password: "admin"});
        expect(result.statusCode).toEqual(200);
     });
    it("Route Test: Should index all users", async() => {
        const result= await request.get('/users').auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(200);
    });
    it("Route Test: Create should add a User of username:Alpha10 first_name:John last_name:Doe password:1234abcd where password is hashed. Using admin's token", async ()=> {
        const result= await request.post('/users').send({username:"Alpha10",first_name:"John",last_name:"Doe",password:"1234abcd"}).auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(200);
     });

     it("Route Test: Create should return 401 because incorrect token", async ()=> {
        const result= await request.post('/users').send({username:"Alpha11",first_name: "John",last_name:"Doe",password:"1234abcd"}).auth("13443", {type:'bearer'});
        expect(result.statusCode).toEqual(401);
     });
     it("Route Test: Show should show Alpha10 datails", async ()=> {
        const result= await request.get('/users/Alpha10').auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(200);
     });
     it("Function Test: Create should add a User of username:Alpha11 first_name:Lorem last_name:Ipsum password:1234abcd where password is hashed.", async ()=> {
        const result= await shopping.create({username:"Alpha11",first_name:"Lorem",last_name:"Ipsum",password:"1234abcd"});
        expect(result).toEqual({username:"Alpha11",first_name:"Lorem",last_name:"Ipsum"});
     });
     it("Function Test: Index should show all users", async ()=> {
        const result= await shopping.index();
        expect(result).toEqual([{ "username": "admin","first_name": "admin","last_name": "admin"},{"username": "Alpha10","first_name": "John","last_name": "Doe"},{"username":"Alpha11","first_name":"Lorem","last_name":"Ipsum"}]);
     });
     it("Function Test: Show should show Alpha10 details", async ()=> {
        const result= await shopping.show("Alpha10");
        expect(result).toEqual({"username": "Alpha10","first_name": "John","last_name": "Doe"});
     });
     it("Route Test: Index should not work due to absence of token", async ()=> {
        const result= await request.get('/users')
        expect(result.body).toEqual("Invalid Token");
     });
     it("Route Test: Show should show Alpha10 details", async ()=> {
        const result= await request.get('/users/Alpha10').auth(Token, {type:'bearer'});
        expect(result.body).toEqual({"username": "Alpha10","first_name": "John","last_name": "Doe"});
     });
});
