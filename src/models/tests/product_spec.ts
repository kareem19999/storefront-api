import { Product, Shopping} from '../product';
import supertest from 'supertest';
import app from '../../server'
const Token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpudWxsLCJpYXQiOjE2NDA1NTE3Nzd9.fwNVS3XVYvLtyuynePvDneqDmIqM-woBKP3eYD7wxj0" //This is token generated from signing in admin
const request = supertest(app)

const shopping = new Shopping();
describe("Products Tests", ()=> {
    it("Should have index method", () => {
        expect(shopping.index).toBeDefined();
    });
    it("Should have show method", () => {
        expect(shopping.show).toBeDefined();
    });
    it("Should have create method", () => {
        expect(shopping.create).toBeDefined();
    });
    it("Create should add a product of id:1 name:Cookies price:1.99, using Auth Token", async ()=> {
        const result= await request.post('/products').send({name:"Cookies",price:1.99}).auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(200);
    });
    it("Create should add a product of id:2 name:Apples price:0.99, using Auth Token", async ()=> {
        const result= await request.post('/products').send({name:"Apples",price:0.99}).auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(200);
    });
    it("Create should result in error 400 due to null ", async ()=> {
        const result= await request.post('/products').send({name:null,price:0.99}).auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(400);
    });
    it("Create should result in error 400 due to NaN ", async ()=> {
        const result= await request.post('/products').send({name:"Carrot",price:"fssfs"}).auth(Token, {type:'bearer'});
        expect(result.statusCode).toEqual(400);
    });
    //No need to use supertest here as these do not need token
    it("Index should return everything", async ()=> {
        const result= await shopping.index();
        expect(result).toEqual([{id:1,name:"Cookies",price:1.99},{id:2,name:"Apples",price:0.99}]);
    });
    it("Show should return id:1 name:Cookies price:1.99", async ()=> {
        const result= await shopping.show(1);
        expect(result).toEqual({id:1,name:"Cookies",price:1.99});
    });
});
