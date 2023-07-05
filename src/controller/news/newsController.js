const router = require("express").Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const verfiyToken = require("../../middleware/authJWT");
const allUserData = require('../../../userData.json')
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const fetchNews = async (preference) => {
  const data = await axios.get(
    `${process.env.NEWS_API}?q=${preference}&from=2023-06-09&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`
  );
  return data;
};

router.get("/", verfiyToken, async (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send("Invalid JWT token");
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  } else {
    const userId = req.id;
    const user = allUserData.users.filter((item) => item.id == userId)
    const preference = user[0].prefernce
    const data = await fetchNews(preference[0]);
    res.status(200).send(data.data.articles);
  }
});

module.exports = router;
