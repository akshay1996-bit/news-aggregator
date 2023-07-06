const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const allUserData = require("../../../userData.json");
const { v4: uuidv4 } = require("uuid");
const validator = require('../../helper/validator')

const signUp = (req, res) => {
  const userData = req.body;
  const modifiedUser = allUserData;
  const pathName = path.join(__dirname, "../../..", "userData.json");
  if (validator.validUser(userData, allUserData).status) {
    userData.password = bcrypt.hashSync(userData.password, 8);
    modifiedUser.users.push({ id: uuidv4(), ...userData });
    fs.writeFileSync(pathName, JSON.stringify(modifiedUser), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(201).send("User added successfully");
  }else{
    res.status(403).send(validator.validUser(userData, allUserData).message)
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  const filterUser = allUserData.users.filter((item) => item.email == email);
  if (filterUser.length) {
    const user = filterUser[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        message: "Login succesful",
        accessToken: token,
      });
    } else {
      res.status(401).send({
        accessToken: null,
        message: "Invalid Password",
      });
    }
  } else {
    res.status(404).send({
      accessToken: null,
      message: "User not found",
    });
  }
};

module.exports = { signUp, login };
