const Router = require("express").Router();
const {authenticateJwt} = require("../middleware/auth.middleware");
const {login,logout,SIGNUP} = require("../controllers/auth");

Router.post("/login",authenticateJwt,login);
Router.post("/signup",SIGNUP)
Router.delete("/logout",logout)

module.exports = Router;