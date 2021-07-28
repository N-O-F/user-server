require("dotenv").config();
const express = require("express");
const cors = express("cors");

const server = express();
server.use(express.json())
server.use(express.urlencoded({extended:false}));

const AuthServer = require("./routers/auth");

server.use("/api/v1/auth",AuthServer);

const PORT = process.env.PORT || 5000;


server.listen(PORT);