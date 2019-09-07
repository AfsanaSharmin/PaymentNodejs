const express = require('express');
const fetch = require("node-fetch");
const SearchDestReq = require('../model/searchDestReq');
const searchHotelReq = require('../model/searchHotelReq');
var config = require('../config/config');
var apiOrg = require ('../config/apiOrganization');
const logger = require('../config/winstonLogger');
var currency = require('../model/currency');
var Request = require("request");

exports.destination_Search_MinimunPrice =  function(req, res){
    switch(config.organization_Api.orgname)
    {
    case (apiOrg.Name.orgname1):
        Bpookingee_destinationSearchMinPrice(req, res)
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

//
function Bpookingee_destinationSearchMinPrice(req, res){
  var desReqData;
  currency.find({Code:req.body.CurrencyCode}).then(data => {
     var l = data.length;
     if(l> 0){
       desReqData = new SearchDestReq(req.body.SessionID,req.body.DestinationId, req.body.CheckInDate,req.body.CheckOutDate ,req.body.CurrencyCode,req.body.NationalityCode, req.body.Rooms);
       destinationSearch(l);
      } else {
      desReqData = new SearchDestReq(req.body.SessionID,req.body.DestinationId, req.body.CheckInDate,req.body.CheckOutDate ,'USD',req.body.NationalityCode, req.body.Rooms);
      destinationSearch(l);
    }
 }).catch(err => {
     logger.error("country get error:", err);
     var resp = new Resp(err, "400 Bad Request");
      res.status(400).json(resp);
 })

function destinationSearch(l){
  var usernamePassword = config.bookingee.username + ':' + config.bookingee.password
 // var desReqData = new SearchDestReq(req.body.SessionID,req.body.DestinationId, req.body.CheckInDate,req.body.CheckOutDate ,req.body.CurrencyCode,req.body.NationalityCode, req.body.Rooms);
  var headers1 = {   
    'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
    'WBE-Api-Key': config.bookingee.WBE_Api_Key,
    'Content-Type': 'application/json'
}

  fetch(config.bookingee_org_Api.destinationSearch, {
    method: 'post',
    body:    JSON.stringify(desReqData),
    headers: headers1,
})
.then(res => res.json())
.then(data => {
  // console.log(data.Success)
  if(data.Success == true){
    if(l>0){
      res.send(data)
      logger.info("[WebAPI_URL]/api/hotel/searchminprice", data);
    } else {
     // res.send(data);
     // calling another function 
     currenceyConvert(data);
    }
  }
 
}).catch(err => {
  logger.error("destination search error:", err);
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
      var l = responsedata.Data.length;
      var convresult = JSON.parse(result);
      var conversionrate = convresult.body[0].conversionRate;
    //  console.log(conversionrate);
      for(let i= 0; i<l; i++){
        responsedata.Data[i].MinPrice =  Number(responsedata.Data[i].MinPrice * conversionrate);
        responsedata.Data[i].Currency = req.body.CurrencyCode; 
      }
      res.send(responsedata);
  })
} 

}