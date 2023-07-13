const axios = require("axios");
const fs = require("fs");
const path = require('path')
const cachedNews = require("../db/news.json");
const allUserData = require('../db/userData.json')
const moment = require('moment')
const fetchNewsApi = async (preference) => {
  const lastSeventhDate = moment().subtract(7,'d').format('YYYY-MM-DD')
  const data = await axios.get(
    `${process.env.NEWS_API}?q=${preference}&from=${lastSeventhDate}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}`
  );
  return data?.data?.articles;
};

const fetchNews = async (userId,next) => {
  const user = allUserData.users.filter((item) => item.id == userId);
  const preference = user[0].prefernce;
  let promise = [];
  const pathName = path.join(__dirname, "../db", "news.json");
  const userDataPath = path.join(__dirname, "../db", "userData.json");
  for (let i of preference) {
    promise.push(fetchNewsApi(i));
  }
  Promise.all(promise).then((res) => {
    const news = {
      userId: userId,
      time: new Date(),
      news: res,
    };
    const modifiedCache = cachedNews;
    const modifiedUser = allUserData;
    const updatedUser = {...user[0],newsCacheDate: new Date()}
    const userIndex = modifiedUser.users.findIndex(
      (item) => item.userId === userId
    );
    modifiedUser.users.splice(userIndex, 1, updatedUser);
    const userCachedNews = cachedNews.news.filter(
      (item) => item.userId == userId
    );
    if (userCachedNews.length) {
      const index = modifiedCache.news.findIndex(
        (item) => item.userId === userId
      );
      modifiedCache.news.splice(index, 1, news);
    } else {
      modifiedCache.news.push(news);
    }
    fs.writeFileSync(pathName, JSON.stringify(modifiedCache), {
      encoding: "utf-8",
      flag: "w",
    });
    fs.writeFileSync(userDataPath, JSON.stringify(modifiedUser), {
      encoding: "utf-8",
      flag: "w",
    });
    next()
  });
};

module.exports = fetchNews
