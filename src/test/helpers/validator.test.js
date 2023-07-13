const expect = require("chai").expect;
const validator = require("../../helper/validator");
const userData = require("../../db/userData.json");
let userDetails = {
  name: "test-user",
  email: "test-user11@gmail.com",
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
    userDetails.email = "test-user@gmail.com";
    let response = validator.validUser(userDetails, userData);
    expect(response.status).equal(false);
    expect(response.message).equal("User exists,please login!");
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

// describe('Validate the course id', function () {
//   it('asserts that course id is not valid', function(done) {
//     courseDetails.courseId = 10;
//     let response = validator.validateUniqueCourseId(courseDetails, courseData);
//     expect(response).equal(false);
//     done();
//   });

//   it('validates the course id', function(done) {
//     courseDetails.courseId = 50;
//     let response = validator.validateUniqueCourseId(courseDetails, courseData);
//     expect(response).equal(true);
//     done();
//   });
// });

// describe('Validates the average rating', function () {
//   it('asserts that course rating is present and rating is integer', function(done) {
//     let averageRating = {'rating' : 10};
//     let response = validator.validateAverageRating(averageRating);
//     expect(response).equal(true);
//     done();
//   });

//   it('validates the course rating is not present', function(done) {
//     let averageRating = {'averageRating' : 10};
//     let response = validator.validateAverageRating(averageRating);
//     expect(response).equal(false);
//     done();
//   });

//   it('validates the course rating is an integer', function(done) {
//     let averageRating = {'rating' : undefined};
//     let response = validator.validateAverageRating(averageRating);
//     expect(response).equal(false);
//     done();
//   });
// });
