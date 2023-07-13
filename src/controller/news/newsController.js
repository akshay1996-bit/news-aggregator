const router = require("express").Router();
const bodyParser = require("body-parser");
const cachedNewsDb = require("../../db/news.json");
const verfiyToken = require("../../middleware/authJWT");
const allUserData = require("../../db/userData.json");
const cachedNews = require('../../middleware/newsCache')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", [verfiyToken,cachedNews], async (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send("Invalid JWT token");
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  } else {
    const userId = req.id;
    const user = allUserData.users.filter((item) => item.id == userId);
    // const preference = user[0].prefernce;
    const result = cachedNewsDb.news.filter((item) => item.userId === userId);
    res.status(200).send(result[0]);
  }
});

module.exports = router;
