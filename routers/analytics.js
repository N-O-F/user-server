const Router = require("express").Router();
const analyticsRoute = require("../controllers/analytics");
const {authenticateJwt} = require("../middleware/auth.middleware");

Router.post("/click",authenticateJwt,analyticsRoute.store_click)
Router.post("/session",authenticateJwt,analyticsRoute.store_session)
Router.post("/view",authenticateJwt,analyticsRoute.store_view)

Router.get("/analysis-data",authenticateJwt,analyticsRoute.get_analysis)
module.exports = Router;