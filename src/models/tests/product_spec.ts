import { Product, Shopping} from '../product';

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
    it("Create should add a product of id:1 name:Cookies price:1.99", async ()=> {
        const result= await shopping.create({name:"Cookies",price:1.99});
        expect(result).toEqual({id:1,name:"Cookies",price:1.99});
    });
    it("Create should add a product of id:2 name:Apples price:0.99", async ()=> {
        const result= await shopping.create({name:"Apples",price:0.99});
        expect(result).toEqual({id:2,name:"Apples",price:0.99});
    });
    it("Index should return everything", async ()=> {
        const result= await shopping.index();
        expect(result).toEqual([{id:1,name:"Cookies",price:1.99},{id:2,name:"Apples",price:0.99}]);
    });
    it("Show should return id:0 name:Cookies price:1.99", async ()=> {
        const result= await shopping.show(1);
        expect(result).toEqual({id:1,name:"Cookies",price:1.99});
    });
});
