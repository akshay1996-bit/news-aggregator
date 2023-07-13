const fs = require("fs");
const getUserData = require("../helper/helper");
const fetchNews = require('../helper/fetchNews')
const cachedNews = (req, res, next) => {
  const userId = req.id;
  const user = getUserData(userId);

  if (user.status) {
    const newsCached = new Date(user.data.newsCacheDate);
    const now = new Date();
    const differenceInMsec = now.getTime() - newsCached.getTime();
    const mm = Math.floor(differenceInMsec / 1000 / 60);
    if (mm > 10) {
      fetchNews(userId,next)
    } else {
      next();
    }
  }
};

module.exports = cachedNews
