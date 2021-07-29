const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Analytics = new Schema({
    clicked:[
        {
            id:String,
            clickedAt:Date,
            rating:Number,
            sourceTag:String
        }
    ],
    viewed:[
        {
            id:String,
            time:Number,
            viewAt:Date,
            sourceTag:String
        }
    ],
    sessions:[
        {
            startTime:Date,
            endTime:Date
        }
    ]

})

module.exports = mongoose.model("analytics",Analytics);