var Request = require("request");
var Resp = require('../model/Resp');
var config = require('../config/config')
var logger = require('logger').createLogger('development.log'); // logs to a file
const fetch = require("node-fetch");
const bookingAcReq =  require('../model/bookingActionReq');
const bookingService = require('../service/bookingService');
const booking = require('../model/booking');
exports.booking_options_details = function (req, res){
  bookingService.bookingOptionsDetails(req, res);

}
//
exports.booking_hotels= function (req, res){
   bookingService.bookingHotel(req, res)
}

// booking  details
// [WebAPI_URL]/api/hotel/bookingDetails?bookingReference=BEE123456789
exports.Hotel_booking_details= function (req, res){
  bookingService.bookingHotelDetails(req, res);
}

exports.issue_Voucher= function (req, res){
 bookingService.issueVoucher(req, res);
}

exports.cancel_Booking= function (req, res){
 bookingService.cancelBooking(req, res);
}
exports.user_records = function(req, res){

  if(req.params.role == 'admin' && req.params.user_id == 'null'){
    booking.find({}).then(data => {
      var resp = new Resp(data, "200 OK");
      res.status(200).json(resp);
   }).catch(err => {
       logger.error("booking records get error:", err);
       var resp = new Resp(err, "400 Bad Request");
        res.status(400).json(resp);
   });
  } else {
    booking.find({user_id:req.params.user_id}).then(data => {
      var resp = new Resp(data, "200 OK");
      res.status(200).json(resp);
   }).catch(err => {
       logger.error("booking records get error:", err);
       var resp = new Resp(err, "400 Bad Request");
        res.status(400).json(resp);
   });
  }


}