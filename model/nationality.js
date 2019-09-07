const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const nationalitySchema = new Schema({
    Code: { 
        type: String,
          },
    Name: {
         type: String,
          }
});

const nationality = mongoose.model("nationality",nationalitySchema);

module.exports = nationality;