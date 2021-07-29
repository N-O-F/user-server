const Router = require("express").Router();
const contentControllers = require("../controllers/content");
const {authenticateJwt} = require("../middleware/auth.middleware");
Router.get("/feed",authenticateJwt,contentControllers.get_feed)
Router.get("/keywords",authenticateJwt,contentControllers.get_keywords)
module.exports = Router;