process.env.NODE_ENV='test';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../app'); 
const path = require("path")
const allUserData = require('../../db/userData.json')
const fs = require('fs')

describe("Signin Route Testing",()=>{
    beforeEach(done=>{
        const signUpBody={
            name: "test",
            email: "test123@gmail.com",
            prefernce: ["cars","meta","google"],
            password:"test1233",
        }
        chai.request(server).post('/register').send(signUpBody).end((req,res)=>{
            done();
        });

    });
    afterEach(() => {
        const pathName = path.join(__dirname, "../../db", "userData.json");
        const modifiedData = allUserData;
        const index = modifiedData.users.findIndex(
          (item) => item.name == "test"
        );
        modifiedData.users.splice(index, 1);
        fs.writeFileSync(pathName, JSON.stringify(modifiedData), {
          encoding: "utf-8",
          flag: "w",
        });
      });
    it("Succesful SignIn",done=>{
        const signInBody={
            email: "test123@gmail.com",
            password:"test1233",
        }
        chai.request(server).post('/login').send(signInBody).end((err,res)=>{
            expect(res.status).equal(200);
            expect(res.body.accessToken).to.not.be.null;
            // expect(res.body.message).equal("Login SUccesfull");
            done();
        });
    });
    it("Validate if user enter wrong password ",done=>{
        const signInBody={
            email: "test123@gmail.com",
            password:"wrongpassword",
        }
        chai.request(server).post('/login').send(signInBody).end((err,res)=>{
            expect(res.status).equal(401);
            expect(res.body.accessToken).to.be.null;
            expect(res.body.message).equal("Invalid Password");
            done();
        });
    });
    it("Validate if user does not exist ",done=>{
        const signInBody={
            email: "xyz@gmail.com",
            password:"test1233",
        }
        chai.request(server).post('/login').send(signInBody).end((err,res)=>{
            expect(res.status).equal(404);
            expect(res.body.message).equal("User not found");
            done();
        });
    });
});
