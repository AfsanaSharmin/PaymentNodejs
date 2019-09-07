var Request = require("request");
var Resp = require('../model/Resp');
var config = require('../config/config')
var logger = require('logger').createLogger('development.log'); // logs to a file
const fetch = require("node-fetch");
const bookingAcReq =  require('../model/bookingActionReq');

exports.booking_options_details = function (req, res){
   
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;

    var bookingreqdata = new  bookingAcReq( req.body.SessionID ,req.body.TID,req.body.HotelCode);

      var headers1 = {   
        'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
        'WBE-Api-Key': config.bookingee.WBE_Api_Key,
        'Content-Type': 'application/json'
    }
    
      fetch(config.bookingee_org_Api.bookingOptionApi, {
        method: 'post',
        body:    JSON.stringify(bookingreqdata),
        headers: headers1,
    })
    .then(res => res.json())
    .then(data => {
      res.send(data)
    }).catch(err => {
      logger.info("booking actions search error:", err);
  });
}


//
exports.booking_hotels= function (req, res){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;

      var bookingreqdata = new  bookingAcReq( req.body.SessionID ,req.body.TID,req.body.HotelCode, req.body.PaymentOption, req.body.AgencyReference, req.body.CarbonCopyMail, req.body.Rooms);

      var headers1 = {   
        'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
        'WBE-Api-Key': config.bookingee.WBE_Api_Key,
        'Content-Type': 'application/json'
    }
    
    fetch(config.bookingee_org_Api.HotelBookApi, {
        method: 'post',
        body:    JSON.stringify(bookingreqdata),
        headers: headers1,
    })
    .then(res => res.json())
    .then(data => {
      res.send(data)
    }).catch(err => {
      logger.info("destination search error:", err);
  });
}

// booking  details
// [WebAPI_URL]/api/hotel/bookingDetails?bookingReference=BEE123456789
exports.Hotel_booking_details= function (req, res){
  var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
 //   var bookingreqdata = new  bookingAcReq( req.body.SessionID ,req.body.TID,req.body.HotelCode, req.body.PaymentOption, req.body.AgencyReference, req.body.CarbonCopyMail, req.body.Rooms);

    var headers1 = {   
      'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
      'WBE-Api-Key': config.bookingee.WBE_Api_Key,
      'Content-Type': 'application/json'
  }

    fetch(config.bookingee_org_Api.hotelBookingDetails + req.params.bookingReferenceNo, {
      method: 'get',
      headers: headers1,
  })
  .then(res => res.json())
  .then(data => {
    res.send(data)
  }).catch(err => {
    logger.info("hotel booking search error:", err);
});
}