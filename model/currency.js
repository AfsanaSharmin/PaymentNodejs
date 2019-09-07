const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const currencySchema = new Schema({
    Code: { 
        type: String,
          }
});

const currency = mongoose.model("currency",currencySchema);

module.exports = currency;