const mongoose=require("mongoose");
const Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const destinationSchema=new Schema({


    DestinationId: {  type: Number },

    Name: {  type: String,},

    ParentDestinationId: { type: Number },
    Label: {type: String},

    destinationType: { type: String},

    Depth: { type: Number}

    // Children:[
    //      {
    //        DestinationId: {type:Number},
    //        Name:{type:String},
    //        ParentDestinationId: { type: Number },
    //        Children: []
    //     },
    // ]

});

const destination = mongoose.model("destination", destinationSchema);

module.exports = destination;