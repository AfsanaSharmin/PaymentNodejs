const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    user_id: { type: String }, //type may be changed 
    SessionID: { type: String },
    TID: { type: String },
    HotelCode: { type: String },
    DestinationId: { type: Number},
    HotelName: { type: String },
    PaymentOption: { type: Number },
    AgencyReference: { type: String },
    Email: { type: String },
    Address: { type: String },
    Phone: { type: String },
    CheckInDate: { type: String},
    CheckOutDate:{ type: String},
    BookingReference: { type: String },
    BookingStatus: { type: String },
    PaymentType: { type: Number },
    IsPaid: { type: String},
    CancellationDeadline:{ type: String},
    NonRefundable: { type: String },
    CancellationConditions: { type: String },
    Price: { type: Number },
    IsPaid: { type: String},
    Currency:{ type: String},
    Rooms: [],
    RoomDescription:{ type: String},
    isActive: { type: String},
   
});

const booking = mongoose.model("booking",bookingSchema);

module.exports = booking;