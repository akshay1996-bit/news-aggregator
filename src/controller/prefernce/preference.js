const router = require("express").Router();
const bodyParser = require("body-parser");
const verfiyToken = require("../../middleware/authJWT");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get("/", verfiyToken ,async (req, res) => {
  if (!req.user && req.message == null) {
    res.send(403).send("Invalid JWT token");
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message,
    });
  } else {
        
  }
});

module.exports = router;
