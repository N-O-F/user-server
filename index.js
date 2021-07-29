require("dotenv").config();
const express = require("express");
const cors = express("cors");
const mongoose = require("mongoose");
const server = express();
server.use(express.json())
server.use(express.urlencoded({extended:true}));
// server.use(cors());
const AuthServer = require("./routers/auth");
const ContentServer = require("./routers/content");
const staticServer = require("./routers/statics");
const AnalyticServer = require("./routers/analytics");

server.use("/api/v1/analytics",AnalyticServer)
server.use("/api/v1/statics",staticServer)
server.use("/api/v1/content",ContentServer)
server.use("/api/v1/auth",AuthServer);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  }).then(()=>{
    server.listen(PORT);
    console.log("Connected to server @",Date.now());
}).catch((err)=>{
    console.error("Error while connecting to database",err)
})
