const mongoose=require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
const languageSchema = new Schema({
    Code: { 
        type: String,
          },
    Name: {
         type: String,
          }
});

const language = mongoose.model("language",languageSchema);

module.exports = language;