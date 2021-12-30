import { Order, Shopping} from '../order';
import supertest from 'supertest';
import app from '../../server'
const Token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpudWxsLCJpYXQiOjE2NDA1NTE3Nzd9.fwNVS3XVYvLtyuynePvDneqDmIqM-woBKP3eYD7wxj0" //This is token generated from signing in admin
const request = supertest(app)

const shopping = new Shopping();
describe("Order Tests", ()=> {
    afterAll(()=>{
        it("Should have index method", () => {
            expect(shopping.index).toBeDefined();
        });
        it("Should have show method", () => {
            expect(shopping.show).toBeDefined();
        });
        it("Should have create method", () => {
            expect(shopping.create).toBeDefined();
        });
        it("Should have addProduct method", () => {
            expect(shopping.addProduct).toBeDefined();
        });
        it("Create should add a order of id:1 name:Alpha10", async ()=> {
            const result= await request.post('/orders').send({username:"Alpha10"});
            expect(result.statusCode).toEqual(200);
        });
        it("Index should list all orders", async ()=> {
            const result= await request.get('/orders');
            expect(result.statusCode).toEqual(200);
        });
        it("Show should show orders for Alpha10", async ()=> {
            const result= await request.get('/orders/Alpha10').auth(Token, {type:'bearer'});
            expect(result.statusCode).toEqual(200);
        });
        it("addProduct should add product 1 for order 1", async ()=> {
            const result= await request.post('/orders/1/products').send({product_id:1,quantity:5}).auth(Token, {type:'bearer'});
            expect(result.statusCode).toEqual(200);
        });
        it("addProduct should add product 2 for order 1", async ()=> {
            const result= await request.post('/orders/1/products').send({product_id:2,quantity:10}).auth(Token, {type:'bearer'});
            expect(result.statusCode).toEqual(200);
        });
    });
});
