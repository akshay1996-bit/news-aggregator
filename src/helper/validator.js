class validator {
  static validUser(userData, allUserData) {
    if (
      userData.hasOwnProperty("name") &&
      userData.hasOwnProperty("email") &&
      userData.hasOwnProperty("password") &&
      userData.hasOwnProperty("prefernce") &&
      typeof userData.name == "string" &&
      typeof userData.email == "string" &&
      typeof userData.password == "string" &&
      Array.isArray(userData.prefernce)
    ) {
      let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (regex.test(userData.email)) {
        const ifEmailExists = allUserData.users.some(
          (item) => item.email === userData.email
        );
        if (ifEmailExists) {
          return {
            status: false,
            message: "User exists,please login!",
          };
        } else {
          return {
            status: true,
          };
        }
      } else {
        return {
          status: false,
          message: "Invalid Email",
        };
      }
    } else {
      return {
        status: false,
        message: "Malformed Data",
      };
    }
  }
}

module.exports = validator
