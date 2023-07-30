process.env.NODE_ENV='test';
const expect = require('chai').expect;
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const server = require('../../app'); 
const path = require("path")
const allUserData = require('../../db/userData.json')
const fs = require('fs')
describe("Preferences Route Testing",()=>{
    let jwtToken='';
    const signUpBody={
        name: "test",
        email: "test12@gmail.com",
        prefernce: ["cars","sports"],
        password:"test12",
    }
    
    beforeEach(done=>{
        chai.request(server).post('/register').send(signUpBody).end((req,res)=>{
            const signInBody={
                email: "test12@gmail.com",
                password:"test12",
            }
            chai.request(server).post('/login').send(signInBody).end((err,loginRes)=>{
                jwtToken=loginRes.body.accessToken;
                done();
            });
        });

    });

    afterEach(() => {
        const pathName = path.join(__dirname, "../../db", "userData.json");
        const modifiedData = allUserData;
        const index = modifiedData.users.findIndex((item) => item.name == "test");
        modifiedData.users.splice(index, 1);
        fs.writeFileSync(pathName, JSON.stringify(modifiedData), {
          encoding: "utf-8",
          flag: "w",
        });
      });

    it("Succesfully Access to Preferences",done=>{
        chai.request(server).get("/prefernces").set('authorization',`JWT ${jwtToken}`).end((err,res)=>{
            expect(res.status).equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.prefernces).to.be.deep.equal(signUpBody.prefernce);
            done();
        });       
    });

    it("2. Validate if user passed wrong jwt ", (done) => {
        chai.request(server).get("/prefernces").set('authorization',`JWT ${jwtToken}bhh`).end((err,res)=>{
            expect(res.status).equal(403);
            expect(res.body.message).equal("Invalid JWT token");
            done();
        });
      });

    // it("3. Succesfully updating the Preferences",done=>{
    //     const preferences= {preferences:["tesla","meta","flipkart"]};
    //     chai.request(server).put("/api/preferences").set('authorization',`JWT ${jwtToken}`).send(preferences).end((err,res)=>{
    //         expect(res.status).equal(200);
    //         expect(res.body).to.be.an('object');
    //         expect(res.body.preferences).to.be.deep.equal(["tesla","meta","flipkart"]);
    //         done();
    //     });       
    // });
});