const Router = require("express").Router();
const {authenticateJwt} = require("../middleware/auth.middleware");
const {login,logout,SIGNUP} = require("../controllers/auth");

Router.post("/signup",SIGNUP)
Router.post("/login",login);

Router.delete("/logout",logout)

module.exports = Router;