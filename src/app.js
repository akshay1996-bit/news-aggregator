const express = require("express");
const bodyParser = require("body-parser");
const routes = require("express").Router;
const PORT = 3000;
const app = express();

app.use(bodyParser({ extended: false }));

app.listen(PORT, (err) => {
  if (!err) console.log("Server started at port " + PORT);
  else console.log(err);
});