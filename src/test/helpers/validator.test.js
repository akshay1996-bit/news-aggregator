const expect = require("chai").expect;
const validator = require("../../helper/validator");
const userData = require("../../db/userData.json");
let userDetails = {
  name: "test-user",
  email: "testuser11@gmail.com",
  password: "test123",
  prefernce: ["sport", "politics", "weather"],
};

describe("Testing the validator", function () {
  it("1. Validating the name", function (done) {
    let response = validator.validUser(userDetails, userData);
    expect(response.status).equal(true);
    done();
  });

  it("2. Validating the unique email", function (done) {
    userDetails.email = "testuser@gmail.com";
    let response = validator.validUser(userDetails, userData);
    expect(response.status).equal(true);
    // expect(response.message).equal("User exists,please login!");
    done();
  });

  it("3. Validating the existence of all the fields in the user details", function (done) {
    delete userDetails["name"];
    let response = validator.validUser(userDetails, userData);
    expect(response.status).equal(false);
    expect(response.message).equal("Malformed Data");
    done();
  });
});
