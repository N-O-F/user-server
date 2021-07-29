const Router = require("express").Router();
const {authenticateJwt} = require("../middleware/auth.middleware");
const {login,logout,SIGNUP,verify_refresh_token} = require("../controllers/auth");

Router.post("/signup",SIGNUP)
Router.post("/login",login);
Router.delete("/logout",logout)
Router.get("/new-access-token",verify_refresh_token)
module.exports = Router;