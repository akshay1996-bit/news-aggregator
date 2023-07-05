const router = require("express").Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const verfiyToken = require("../../middleware/authJWT");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const fetchNews = async (preference) => {
  const data = await axios.get(
    `https://newsapi.org/v2/everything?q=${preference}&from=2023-06-09&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`
  );
  return data;
};

router.get("/", verfiyToken ,async (req, res) => {
  if (!req.user && req.message == null) {
    res.send(403).send("Invalid JWT token");
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  } else {
    const data = await fetchNews("sports");
    res.status(200).send(data.data.articles);
  }
});

module.exports = router;
