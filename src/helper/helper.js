const userData = require("../db/userData.json");

const getUserData = (userId) => {
  const user = userData.users.filter((item) => item.id === userId);
  if (user.length) {
    return {
      status: true,
      message: "success",
      data: user[0],
    };
  } else {
    return{
        status: false,
        message: 'user not found',
        data: null
    }
  }
};

module.exports = getUserData
