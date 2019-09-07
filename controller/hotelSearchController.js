
var Request = require("request");
var Resp = require('../model/Resp');
var config = require('../config/config')
var logger = require('logger').createLogger('development.log'); // logs to a file
const fetch = require("node-fetch");
const SearchDestReq = require('../model/searchDestReq');
const searchHotelReq = require('../model/searchHotelReq');
exports.hotel_search_byDestinationId = function (req, res) {
      var usernamePassword = config.bookingee.username + ':' + config.bookingee.password
      var desReqData = new SearchDestReq(req.body.SessionID,req.body.DestinationId, req.body.CheckInDate,req.body.CheckOutDate ,req.body.CurrencyCode,req.body.NationalityCode, req.body.Rooms);
      var headers1 = {   
        'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
        'WBE-Api-Key': config.bookingee.WBE_Api_Key,
        'Content-Type': 'application/json'
    }
    // 'http://webapi.uat.wbe.travel/api/hotel/search'
    
      fetch(config.bookingee_org_Api.hotelSearchApi, {
        method: 'post',
        body:    JSON.stringify(desReqData),
        headers: headers1,
    })
    .then(res => res.json())
    .then(data => {
      res.send(data)
    }).catch(err => {
      logger.info("hotel search error:", err);
  });

};

/// details of hotel
exports.hotel_search_byHotelCode = function (req, res) {
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
    var hotelReqData = new searchHotelReq(req.body.SessionID,req.body.HotelCode, req.body.CheckInDate,req.body.CheckOutDate ,req.body.CurrencyCode,req.body.NationalityCode, req.body.Rooms);
  
      var headers1 = {   
        'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
        'WBE-Api-Key': config.bookingee.WBE_Api_Key,
        'Content-Type': 'application/json'
    }

      fetch(config.bookingee_org_Api.hotelSearchApi, {
        method: 'post',
        body:    JSON.stringify(hotelReqData),
        headers: headers1,
    })
    .then(res => res.json())
    .then(data => {
      res.send(data)
    }).catch(err => {
      logger.info("hotel search error:", err);
  });
   // }  

};