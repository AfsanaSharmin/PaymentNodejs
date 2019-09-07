const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const hotelSchema = new Schema({
    HotelCode: { type: String },
    Name: { type: String },
    Description: { type: String },
    Latitude: { type: Number },
    Longitude: { type: Number },
    StarRating: { type: String },
    Location: { type: String },
    Email: { type: String },
    Address: { type: String },
    Phone: { type: String },
    Category: { type: String },
    Area: { type: String },
    RoomFacilities: [
      // {
      //  Category:{ type: String },
      //  Facilities: [{ type: String}]
      // } 
   ],
    HotelFacilities: [
      // {
      //  Category:{ type: String },
      //  Facilities: [{ type: String}]
      // } 
   ],
    PropertyType: { type: String },
    image: [
      // {
      //   FullSizeUrl: { type: String },
      //   ThumbUrl: { type: String }
      // }
    ]
});

const hotel = mongoose.model("hotel",hotelSchema);

module.exports = hotel;