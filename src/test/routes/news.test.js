process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../app");
const path = require("path")
const allUserData = require('../../db/userData.json')
const fs = require('fs')

describe("News Route Testing", () => {
  let jwtToken = "";

  beforeEach((done) => {
    const signUpBody = {
      name: "test",
      email: "test-123@gmail.com",
      prefernce: ["cars", "sports"],
      password: "test@123",
    };
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((req, res) => {
        const signInBody = {
          email: "test-123@gmail.com",
          password: "test@123",
        };
        chai
          .request(server)
          .post("/login")
          .send(signInBody)
          .end((err, loginRes) => {
            // console.log(loginRes)
            jwtToken = loginRes.body.accessToken;
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

  it("Succesfull Access to NewsAPI", (done) => {
    chai
      .request(server)
      .get("/news")
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("news");
        done();
      });
  });

});
