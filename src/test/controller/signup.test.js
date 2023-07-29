process.env.NODE_ENV = "test";
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
var bcrypt = require("bcrypt");
const server = require("../../app");
const sinon = require("sinon");
const expect = require("chai").expect;
const allUserData = require("../../db/userData.json");
const fs = require("fs");
const path = require("path");
describe("verifies signup flow", () => {
  let signupBody = {
    name: "test-user333",
    email: "test-useddr1ggg@gmail.com",
    password: "test123",
    prefernce: ["sport", "politics", "weather"],
  };

  it("successful signup", (done) => {
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
  afterEach(() => {
    const pathName = path.join(__dirname, "../../db", "userData.json");
    const modifiedData = allUserData;
    const index = modifiedData.users.findIndex(
      (item) => item.name == "test-user333"
    );
    modifiedData.users.splice(index, 1);
    fs.writeFileSync(pathName, JSON.stringify(modifiedData), {
      encoding: "utf-8",
      flag: "w",
    });
  });

  it("verifies signup flow failing because of email validation", (done) => {
    signupBody.email = "test@12345@gmail.com";
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.text).equal("Invalid Email");
        done();
      });
  });

  it("verifies signup flow failing because of incomplete properties passed", (done) => {
    delete signupBody.name;
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.text).equal("Malformed Data");
        done();
      });
  });
});

describe('verifies the sign in flow', () => {

  beforeEach((done) => {
    let signupBody = {
      name: 'test name',
      email: 'test12345@gmail.com',
      password: 'test1234',
      prefernce: ['sports']
    };
    chai.request(server).post('/register').send(signupBody).end((err, res) => {
      done();
    });
  });

  it("successful signin", (done) => {
    let signInBody = {
      'email': 'test12345@gmail.com',
      'password': 'test1234'
    }
    chai.request(server).post('/login').send(signInBody).end((err, res) => {
      expect(res.status).equal(200);
      expect(res.body.user.email).equal('test12345@gmail.com');
      expect(res.body.user.name).equal('test name');
      expect(res.body.message).equal('Login succesful');
      expect(res.body).to.have.property('accessToken');
      done();
    });
  });

  it("Invalid password while signing in", (done) => {
    let signInBody = {
      'email': 'test12345@gmail.com',
      'password': 'test12345'
    }
    chai.request(server).post('/login').send(signInBody).end((err, res) => {
      expect(res.status).equal(401);
      expect(res.body.message).equal('Invalid Password');
      expect(res.body.accessToken).to.be.null;
      done();
    });
  });

  it("User does not exist while signing in", (done) => {
    let signInBody = {
      'email': 'someOtherTest@gmail.com',
      'password': 'test12345'
    }
    chai.request(server).post('/login').send(signInBody).end((err, res) => {
      expect(res.status).equal(404);
      expect(res.body.message).equal('User not found');
      expect(res.body.accessToken).to.be.null;
      done();
    });
  });
});

