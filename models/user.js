const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const mongooseValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const User = new Schema({
    username:{
        type:String,
        default:""
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    refreshToken:{
        type:String
    },
    tags:[{
        type:String
    }],
    profession:{
        type:String
    },
    bookmarks:[],
    analytics:{
        type:mongoose.Types.ObjectId,
        ref:"analytics"
    },
    suggestion:{
        type:mongoose.Types.ObjectId,
        ref:"suggestion"
    }
},{timestamps:true})

User.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("user",User);