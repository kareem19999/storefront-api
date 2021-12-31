import { Order, Shopping} from '../order';
import supertest from 'supertest';
import app from '../../server'
const Token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjpudWxsLCJpYXQiOjE2NDA1NTE3Nzd9.fwNVS3XVYvLtyuynePvDneqDmIqM-woBKP3eYD7wxj0" //This is token generated from signing in admin
const request = supertest(app)

const shopping = new Shopping();
describe("Order Tests", ()=> {
    //setTimeout(()=>{
        it("Should have index method", () => {
            expect(shopping.index).toBeDefined();
        });
        it("Should have create method", () => {
            expect(shopping.create).toBeDefined();
        });
        it("Should have addProduct method", () => {
            expect(shopping.addProduct).toBeDefined();
        });
        it("Route Test: Create should add a order of id:1 name:Alpha10 with 10 of product 1", async ()=> {
            const result= await request.post('/orders').send({username:"Alpha10",product_id:1,quantity:5}).auth(Token, {type:'bearer'});
            expect(result.statusCode).toEqual(200);
        });
        it("Route Test: Index should list all orders", async ()=> {
            const result= await request.get('/orders');
            expect(result.statusCode).toEqual(200);
        });
        it("Route Test: Show should show orders for Alpha10", async ()=> {
            const result= await request.get('/orders/Alpha10').auth(Token, {type:'bearer'});
            expect(result.statusCode).toEqual(200);
        });
        it("Route Test: addProduct should add product 1 for order 1", async ()=> {
            const result= await request.post('/orders/1/products').send({product_id:1,quantity:5}).auth(Token, {type:'bearer'});
            expect(result.statusCode).toEqual(200);
        });
        it("Route Test: addProduct should add product 2 for order 1", async ()=> {
            const result= await request.post('/orders/1/products').send({product_id:2,quantity:10}).auth(Token, {type:'bearer'});
            expect(result.statusCode).toEqual(200);
        });
        it("Function Test: Create should create new order", async ()=> {
            const result= await shopping.create("admin",1,4);
            expect(result).toEqual({id:2,username: "admin",status: false});
        });
        it("Function Test: addProduct should add product for order 1", async ()=> {
            const result= await shopping.addProduct(1,2,25);
            expect(result).toEqual({id: 3,order_id: 1,product_id: 2,quantity: 25});
        });
        it("Function Test: Index should show all orders", async ()=> {
            const result= await shopping.index();
            expect(result).toEqual([{ id: 1,username: "Alpha10",status: false},{ id: 2, username: 'admin', status: false }]);
        });
        it("Route Test: Create should add a order of id:3 name:Alpha11 with 12 of product 2", async ()=> {
            const result= await request.post('/orders').send({username:"Alpha11",product_id:2,quantity:12}).auth(Token, {type:'bearer'});
            expect(result.body).toEqual({id:3,username: "Alpha11",status: false});
        });
        it("Route Test: Index should list all orders", async ()=> {
            const result= await request.get('/orders');
            expect(result.body).toEqual([{ id: 1,username: "Alpha10",status: false},{ id: 2, username: 'admin', status: false },{id:3,username: "Alpha11",status: false}]);
        });
        it("Route Test: addProduct should add product 1 for order 3", async ()=> {
            const result= await request.post('/orders/3/products').send({product_id:1,quantity:5}).auth(Token, {type:'bearer'});
            expect(result.statusCode).toEqual(200);
        });
        it("Route Test: Show should show orders for Alpha10", async ()=> {
            const result= await request.get('/orders/Alpha10').auth(Token, {type:'bearer'});
            expect(result.body).toEqual([{username: 'Alpha10',order_id: 1,status: false,product_id: 1,quantity: 5,name:"Cookies",unit_price: 1.99},{ username: "Alpha10", order_id: 1, status: false, product_id: 2, quantity: 10, name: "Apples", unit_price: 0.99 },{ username: "Alpha10", order_id: 1, status: false, product_id: 2, quantity: 25, name: "Apples", unit_price: 0.99 }]);
        });
        //Show can be only done with route testing as it uses dashboard query not model
    //},500);
});
