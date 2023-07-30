process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../app");

describe("Signup Route Testing", () => {
    let signupBody = {
        name: "test name",
        email: "test1234d5@gmail.com",
        password: "test1234",
        prefernce: ["sports"]
      };
//   beforeEach((done) => {
//     let signupBody = {
//       name: "test name",
//       email: "test12345@gmail.com",
//       password: "test1234",
//       prefernce: ["sports"],
//     };
//     chai
//       .request(server)
//       .post("/register")
//       .send(signupBody)
//       .end((err, res) => {
//         done();
//       });
//   });
  it("Succesfull SignUp", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(201);
        expect(res.text).equal("User added successfully");
        done();
      });
  });
});
