const mongoose=require("mongoose");
const Schema=mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const countrySchema=new Schema({
    id: { 
        type: Number,
        },
    CountryId: { 
        type: Number,
        // unique: [true, "CountryId should be unique"]
        },
    ISO: {
         type: String,
        //  unique: true
         },
    Name: {
         type: String,
        //  required:[true,"Name is required"] 
        },
    isActive:{ 
        type:Boolean
    }

});
// countrySchema.plugin(uniqueValidator);
const Country = mongoose.model("country",countrySchema);

module.exports = Country;