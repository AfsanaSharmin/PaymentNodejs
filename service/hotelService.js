const express = require('express');
const fetch = require("node-fetch");
const SearchDestReq = require('../model/searchDestReq');
const searchHotelReq = require('../model/searchHotelReq');
const hotel = require('../model/hotel');
var config = require('../config/config');
var apiOrg = require ('../config/apiOrganization');
const logger = require('../config/winstonLogger');
var currency = require('../model/currency');
exports.hotelSearch_bydestinationId = function(req, res){

    switch(config.organization_Api.orgname)
    {
    case (apiOrg.Name.orgname1):
      Bookingee_hotelSearch(req, res)
      break;
    case (apiOrg.Name.orgname2):
       'another organization api call'
      break;
      case (apiOrg.Name.orgname3):
        'another organization api call'
       break;
    default:
       "Didn't get any api "
    }
}

// hotel search by destinationid
function Bookingee_hotelSearch (req, res){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password
    var desReqData = new SearchDestReq(req.body.SessionID,req.body.DestinationId, req.body.CheckInDate,req.body.CheckOutDate ,req.body.CurrencyCode,req.body.NationalityCode, req.body.Rooms);
    var headers1 = {   
      'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
      'WBE-Api-Key': config.bookingee.WBE_Api_Key,
      'Content-Type': 'application/json'
  }
  
    fetch(config.bookingee_org_Api.hotelSearchApi, {
      method: 'post',
      body:    JSON.stringify(desReqData),
      headers: headers1,
  })
  .then(res => res.json())
  .then(data => {
    res.send(data)
  }).catch(err => {
    logger.error("hotel search error:", err);
});
}


exports.hotelSearch_byHotelCode = function(req, res){
      switch(config.organization_Api.orgname)
      {
      case (apiOrg.Name.orgname1):
        Bookingee_hotelSearchByHotelCode(req, res)
        break;
      case (apiOrg.Name.orgname2):
         'another organization api call'
        break;
        case (apiOrg.Name.orgname3):
          'another organization api call'
         break;
      default:
         "Didn't get any api "
      }
  }


///....................................
  exports.static_hotelSearch = function(req, res){
    switch(config.organization_Api.orgname)
    {
    case (apiOrg.Name.orgname1):
      Booking_static_hotelSearch(req, res)
      break;
    case (apiOrg.Name.orgname2):
       'another organization api call'
      break;
      case (apiOrg.Name.orgname3):
        'another organization api call'
       break;
    default:
       "Didn't get any api "
    }
}
function Booking_static_hotelSearch(req, res){
  var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
  //var hotelReqData = new searchHotelReq(req.body.SessionID,req.body.HotelCode, req.body.CheckInDate,req.body.CheckOutDate ,req.body.CurrencyCode,req.body.NationalityCode, req.body.Rooms);

    var headers1 = {   
      'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
      'WBE-Api-Key': config.bookingee.WBE_Api_Key,
      'Content-Type': 'application/json'
  }

    fetch(config.bookingee_org_Api.hoteldetailsApi + req.params.HotelCode, {
      method: 'get',
     // body:    JSON.stringify(hotelReqData),
      headers: headers1,
  })
  .then(res => res.json())
  .then(data => {
    saveHotelDetails(data)
  }).catch(err => {
    logger.error("hotel search error:", err);
});

function saveHotelDetails(hotelData){
  hotel.create(hotelData.Data).then(data => {
  res.send(data);
  }).catch(err => {
    logger.error("hotel search error:", err);
});
}

}
///////////.................................
  // hotel search by hotelcode
function Bookingee_hotelSearchByHotelCode(req, res){
  var hotelReqData;
  currency.find({Code:req.body.CurrencyCode}).then(data => {
     var l = data.length;
     if(l> 0){
       hotelReqData = new searchHotelReq(req.body.SessionID,req.body.HotelCode, req.body.CheckInDate,req.body.CheckOutDate ,req.body.CurrencyCode,req.body.NationalityCode, req.body.Rooms);
       hotel_search(l);
      } else {
       hotelReqData = new searchHotelReq(req.body.SessionID,req.body.HotelCode, req.body.CheckInDate,req.body.CheckOutDate ,"USD",req.body.NationalityCode, req.body.Rooms);
       hotel_search(l);
    }
 }).catch(err => {
     logger.error("country get error:", err);
     var resp = new Resp(err, "400 Bad Request");
      res.status(400).json(resp);
 })

  function hotel_search(l){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
    //var hotelReqData = new searchHotelReq(req.body.SessionID,req.body.HotelCode, req.body.CheckInDate,req.body.CheckOutDate ,req.body.CurrencyCode,req.body.NationalityCode, req.body.Rooms);
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
      if(data.Success == true){
        if(l>0){
          res.send(data)
        } else {
        //  res.send(data);
         // calling another function 
         currenceyConvert(data);
        }
      }
    }).catch(err => {
      logger.error("hotel search error:", err);
  });
  }
  function currenceyConvert(responsedata){
    console.log('currency')
    const options1 = {
      url: config.currency.currency_convertApi+'USD'+'/'+req.body.CurrencyCode,
      method: 'GET',
      strictSSL: false,
      rejectUnauthorized: false
     }
     Request(options1, (error, response, result) => {
        var l = responsedata.Data.Hotels.length;
        var convresult = JSON.parse(result);
        var conversionrate = convresult.body[0].conversionRate;
      //  console.log(conversionrate);
        for(let i= 0; i<l; i++){
          responsedata.Data.Hotels[i].TotalPrice =  Number(responsedata.Data.Hotels[i].TotalPrice * conversionrate);
          responsedata.Data.Hotels[i].Currency = req.body.CurrencyCode; 
        }
        res.send(responsedata);
    })
  } 

}