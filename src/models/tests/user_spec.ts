import { User, Shopping} from '../user';

const shopping = new Shopping();
describe("User Tests", ()=> {
    // it("Should have index method", () => {
    //     expect(shopping.index).toBeDefined();
    // });
    // it("Should have show method", () => {
    //     expect(shopping.show).toBeDefined();
    // });
    it("Should have create method", () => {
        expect(shopping.create).toBeDefined();
    });
    it("Create should add a User of username:Alpha10 first_name:John last_name:Doe password:1234abcd where password is hashed", async ()=> {
        const result= await shopping.create({username:"Alpha10",first_name: "John",last_name:"Doe",password:"1234abcd"});
        //expect(result).({username:"Alpha10",first_name: "John",last_name:"Doe"});
        expect([result.username,result.first_name,result.last_name]).toEqual(["Alpha10","John","Doe"]);
    });
    it("Login should correctly authenticate usermame:Alpha10 with password:1234abcd", async ()=> {
        const result= await shopping.login("Alpha10","1234abcd");
        expect(result).toBeTruthy();
    });
    it("Login should return null for false password username:Alpha10 with password:124abcd", async ()=> {
        const result= await shopping.login("Alpha10","124abcd");
        expect(result).toBeNull();
    });
    it("Login should return null for incorrect username username:Alpha12 with password:124abcd", async ()=> {
        const result= await shopping.login("Alpha12","124abcd");
        expect(result).toBeNull();
    });
});
