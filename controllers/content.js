const articles = require("../models/articles");
const videos = require("../models/videos");
const httpError = require("../models/http-error");
const User = require("../models/user");
const axios = require("axios");
const { find_element } = require("../helpers/findElement");

exports.get_feed = async (req, res, next) => {
  const { type } = req.query;
  const user = req.user;
  if (type !== "home" && type !== "keyword")
    return next(
      new httpError("type is not correct", "try home or keyword type", 402)
    );
  let requestUser = false;
  try {
    requestUser = await find_element({ email: user.email }, User);
  } catch (err) {
    return next(new httpError(err, "error while looking for user", 500));
  }
  if (!requestUser)
    return next(
      new httpError(
        "User doesn't exists but passed auth middleware",
        "How the fuck you reached here",
        403
      )
    );
  let tags = [];
  if (type === "keyword") {
    if (!req.query.tags)
      return next(
        new httpError(
          "didn't passed the keywords to filter by",
          "Pass the tags to filter the feed",
          400
        )
      );
    tags = req.query.tags.split(",").map((each) => each.toLowerCase());
  } else {
    tags = requestUser.tags.map((each) => each.toLowerCase());
  }

  let matchedArticles = [];
  // let matchquery = {} requestUser.tags.map(each=>({searchWord:each}))
  try {
    matchedArticles = await articles.find({
      searchWord: { $in: tags },
    });
  } catch (err) {
    return next(new httpError(err, "while looking for articles", 500));
  }

  matchedVideos = [];

  try {
    matchedVideos = await videos.find({
      searchWord: { $in: tags },
    });
  } catch (err) {
    return next(new httpError(err, "while looking for videos", 500));
  }

  res.status(200).json({
    status: "ok",
    data: { articles: matchedArticles, videos: matchedVideos },
  });
};

exports.get_keywords = async (req, res, next) => {
  let { previous } = req.query;
  const user = req.user;
  let requestUser = false;
  try {
    requestUser = await find_element({ email: user.email }, User);
  } catch (err) {
    return next(new httpError(err, "error while looking for user", 500));
  }
  if (!requestUser)
    return next(
      new httpError(
        "User doesn't exists but passed auth middleware",
        "How the fuck you reached here",
        403
      )
    );
  if (!previous)
    res.status(200).json({ status: "ok", data: { tags: requestUser.tags } });
  else {
    try {
      let response = await axios.get(
        "http://localhost:5001/api/v1/tags?topic=" + previous
      );
      let { data } = await response;
      res.status(200).json({ status: "ok", data });
    } catch (err) {
      return next(
        new httpError(err, "while getting nested keywords from scraper", 500)
      );
    }
  }
};
