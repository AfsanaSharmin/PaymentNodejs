const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    Leader: { type: String },
    HotelConfirmationNumber: {type: String},
    DateOfIssue: { type: String},
    EmergencyInfo: { type:String},
    Remarks: { type: String},
    BookingReference: { type:String}
});

const voucher = mongoose.model("voucher",voucherSchema);

module.exports = voucher;