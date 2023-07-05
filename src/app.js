const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();
const cors = require('cors')
const {signUp,login} = require('./controller/auth/signup')
const PORT = 3000;
const app = express();
const newsRoutes = require('./controller/news/newsController')
require('dotenv').config()

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())
app.use(router);

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json())
router.post('/signup',signUp)
router.post('/login',login)
router.use('/news',newsRoutes)
// router.use('/prefernce',prefRoute)

app.listen(PORT, (err) => {
  if (!err) console.log('Server started at port ' + PORT);
  else console.log(err);
});
