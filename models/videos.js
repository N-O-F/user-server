const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;

const Videos = new Schema({
    id:{
        unique:true,
        type:String,
        required:true   
    },
    author:{
        img:String,
        profile:String,
        id:String
    },
    video:{
        url:{
            type:String,
            unique:true,
        },
        watchTime:Number,
        publishedOn:Date,
        img:String,
        title:String,
        likes:String,
        desc:String
    },
    searchWord:String,
    source:String,
    contentType:{
        type:String,
        default:"video"
    },
    nouns:{
        type:Array,
        default:[]
    }
})

Videos.plugin(uniqueValidator);

module.exports = mongoose.model("videos",Videos);