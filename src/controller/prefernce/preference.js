const router = require("express").Router();
const bodyParser = require("body-parser");
const verfiyToken = require("../../middleware/authJWT");
const allUserData = require("../../../userData.json");
const fs = require("fs");
const path = require("path");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", verfiyToken, async (req, res) => {
  if (!req.user && req.message == null) {
    res.send(403).send("Invalid JWT token");
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  } else {
    const userId = req.id;
    const userData = allUserData.users.filter((item) => item.id == userId);
    res.status(200).send({ prefernces: userData[0].prefernce });
  }
});

router.put("/", verfiyToken, (req, res) => {
  let pathName = path.join(__dirname, "../../../", "userData.json");
  if (!req.user && req.message == null) {
    res.send(403).send("Invalid JWT token");
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  } else {
    const userId = req.id;
    const newPref = req.body.prefernces;
    console.log(req)
    const index = allUserData.users.findIndex((item) => item.id == userId);
    const user = allUserData.users.filter((item) => item.id == userId);
    const modifiedPref = allUserData;
    modifiedPref.users.splice(index, 1, { ...user[0], prefernce: newPref });
    console.log(modifiedPref)
    fs.writeFileSync(pathName, JSON.stringify({ ...modifiedPref }), {
      encoding: "utf-8",
      flag: "w",
    });
    res.status(200).send("Preference updated successfully");
  }
});

module.exports = router;
