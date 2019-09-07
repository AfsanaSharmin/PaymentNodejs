const express = require('express');
const fetch = require("node-fetch");
var config = require('../config/config');
const bookingAcReq =  require('../model/bookingActionReq');
const booking = require('../model/booking');
const voucher = require('../model/voucher');
var apiOrg = require ('../config/apiOrganization');
const logger = require('../config/winstonLogger');
var Resp = require('../model/Resp');
 exports.bookingOptionsDetails = function(req, res) {
    switch(config.organization_Api.orgname)
    {
    case (apiOrg.Name.orgname1):
        Bookingee_bookingOptionsDetails(req, res)
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

exports.bookingHotel = function(req, res) {
    switch(config.organization_Api.orgname)
    {
    case (apiOrg.Name.orgname1):
        Bookingee_bookkingHotel(req, res)
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


 exports.bookingHotelDetails = function(req, res) {
    switch(config.organization_Api.orgname)
    {
    case (apiOrg.Name.orgname1):
        Bookingee_bookingHotelDetails(req, res)
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

//////////////////////////////
 exports.issueVoucher = function(req, res) {
    switch(config.organization_Api.orgname)
    {
    case (apiOrg.Name.orgname1):
        Bookingee_issueVoucher(req, res)
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

 exports.cancelBooking = function(req, res) {
    switch(config.organization_Api.orgname)
    {
    case (apiOrg.Name.orgname1):
        Bookingee_cancelBooking(req, res)
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

//////////////////////

 function Bookingee_bookingOptionsDetails(req, res){
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
     // logger.error(err);
     logger.error("booking actions search error:", err);
  });
 }

function Bookingee_bookkingHotel(req, res){

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
    .then(bookingdata => {
      console.log(bookingdata);
    // res.send(data)
    ////////////////// have some work, compare success message
     if(bookingdata.Success == true){
      bookingSave(bookingdata.Data, bookingdata)
     } else if(bookingdata.Success == false){
           res.send(bookingdata)
     }
    }).catch(err => {
      logger.error("destination search error:", err);
      var resp = new Resp(err, "400 Bad Request");
      res.status(400).json(resp);
  });
///
function bookingSave(dBook, bookingdata){
  console.log(bookingdata);

  const book = new booking({
    user_id: req.body.user_id,
    SessionID: req.body.SessionID, // req parameter
    TID: req.body.TID, // req parameter
    HotelCode:  req.body.HotelCode, // req parameter
    DestinationId: dBook.DestinationId,
    HotelName: dBook.HotelName,
    PaymentOption: req.body.PaymentOption, //
    AgencyReference: req.body.AgencyReference, // req parameter
    Email: dBook.Email,
    CheckInDate: dBook.CheckInDate,
    CheckOutDate: dBook.CheckOutDate,
    BookingReference: dBook.BookingReference,
   // BookingStatus:dBook.BookingStatus ,
    BookingStatus:"BOOKING_IN_PROGRESS" ,
    PaymentType: dBook.PaymentType,
    IsPaid: dBook.IsPaid,
    CancellationDeadline:dBook.CancellationDeadline,
    NonRefundable: dBook.NonRefundable,
    CancellationConditions: dBook.CancellationConditions,
    Price: dBook.Price,
    Currency:dBook.Currency,
    Rooms: dBook.Rooms,
    RoomDescription:dBook.RoomDescription,
    isActive: true
  })
 
  booking.create(book).then(data => {
    //res.send(bookingdata);
    payment(dBook.BookingReference)
}).catch(err => {
    logger.error("booking create error:", err);
    var resp = new Resp(err, "400 Bad Request");
     res.status(400).json(resp);
});
}

function payment(reference){
  var postData={
    store_id : config.payment_ssl.store_id,
    store_passwd : config.payment_ssl.store_passwd,
    total_amount : req.body.total_amount,
    currency : req.body.currency,
    tran_id : reference, 
    success_url : config.payment_ssl.success_url,
    fail_url : config.payment_ssl.fail_url,
    cancel_url : config.payment_ssl.cancel_url,
    cus_name : req.body.cus_name,
    cus_email : req.body.cus_email,
    cus_phone : req.body.cus_phone
};
// console.log('check='+(postData))
    var headers1 = {   
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    request.post({
        uri: config.payment_ssl.paymenturl,
        headers:{'content-type': 'application/x-www-form-urlencoded'},
        body:require('querystring').stringify(postData),
        },function(error,responseStatus,body){
            var response = {};
            var resp = JSON.parse(body);
            if (!error && responseStatus.statusCode == 200) {
                response.GatewayPageURL = resp.GatewayPageURL;
                response.status = resp.status;
               // response.total_amount = bookingResp._price;
               // console.log('rep='+response)
                res.send(response);
            }
            else {
                response.status = 'FAILED';
                response.failedreason = resp.failedreason;
                res.send(response)
            }
            
    });
}

}



function Bookingee_bookingHotelDetails(req, res){
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
       logger.error("hotel booking search error:", err);
   });
}

function Bookingee_issueVoucher(req, res){

    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
    
       var headers1 = {   
         'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
         'WBE-Api-Key': config.bookingee.WBE_Api_Key,
         'Content-Type': 'application/json'
     }
   
       fetch(config.bookingee_org_Api.issueVoucher + req.params.bookingReferenceNo, {
         method: 'post',
         headers: headers1,
     })
     .then(res => res.json())
     .then(vdata => {
      
       if(vdata.Success == true){
        saveVoucher(vdata.Data.VoucherData, vdata)
       } else {
        res.send(vdata);
       }
      // res.send(data)
     }).catch(err => {
       logger.error("hotel booking search error:", err);
   });
//***************** save voucher */
function saveVoucher(data, vdata){
   var voucherData= [];
   var l = data.length;
   for(let i=0; i<l; i++){
    voucherData.push({
        Leader: data[i].Leader,
        HotelConfirmationNumber: data[i].HotelConfirmationNumber,
        DateOfIssue: data[i].DateOfIssue,
        EmergencyInfo: data[i].EmergencyInfo,
        Remarks: data[i].Remarks,
        BookingReference: req.params.bookingReferenceNo
    }
    )
   }
  voucher.create(voucherData).then(data => {
    res.send(vdata);
    updateBooking(); //need to check
}).catch(err => {
    logger.error("booking issue create error:", err);
    var resp = new Resp(err, "400 Bad Request");
     res.status(400).json(resp);
});

}

function updateBooking(){
  booking.findOneAndUpdate({BookingReference:req.params.bookingReferenceNo},{BookingStatus:'BOOKING_VOUCHERED'}).then(data => {
}).catch(err => {
    logger.error("voucher update error:", err);
    var resp = new Resp(err, "400 Bad Request");
     res.status(400).json(resp);
});
}

}

function Bookingee_cancelBooking(req, res){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
     var headers1 = {   
         'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
         'WBE-Api-Key': config.bookingee.WBE_Api_Key,
         'Content-Type': 'application/json'
     }
       fetch(config.bookingee_org_Api.cancelBooking + req.params.bookingReferenceNo, {
         method: 'post',
         headers: headers1,
     })
     .then(res => res.json())
     .then(data => {
       res.send(data)
     }).catch(err => {
       logger.error("hotel booking search error:", err);
   });

   //
function deleteBooking(){
    booking.deleteOne({BookingReference:req.params.bookingReferenceNo}).then(data => {
      deleteVoucher()
     //res.send({'response':'Country deleted successfully'})
  }).catch(err => {
      logger.error("booking delete error:", err);
      var resp = new Resp(err, "400 Bad Request");
       res.status(400).json(resp);
  });
}

      //
function deleteVoucher(){
        voucher.deleteOne({BookingReference:req.params.bookingReferenceNo}).then(data => {
          // res.send();
      }).catch(err => {
          logger.error("voucher delete error:", err);
          var resp = new Resp(err, "400 Bad Request");
           res.status(400).json(resp);
      });
       }
}





exports.paymentApi= function (req, res){

  var postData={
      store_id : config.payment_ssl.store_id,
      store_passwd : config.payment_ssl.store_passwd,
      total_amount : req.body.total_amount,
      currency : req.body.currency,
      tran_id : req.body.tran_id, 
      success_url : config.payment_ssl.success_url,
      fail_url : config.payment_ssl.fail_url,
      cancel_url : config.payment_ssl.cancel_url,
      cus_name : req.body.cus_name,
      cus_email : req.body.cus_email,
      cus_phone : req.body.cus_phone
  };
  // console.log('check='+(postData))
      var headers1 = {   
          'Content-Type': 'application/x-www-form-urlencoded'
      }

      request.post({
          uri: config.payment_ssl.paymenturl,
          headers:{'content-type': 'application/x-www-form-urlencoded'},
          body:require('querystring').stringify(postData),
          },function(error,responseStatus,body){
              var resp = JSON.parse(body);
              if (!error && responseStatus.statusCode == 200) {
                  response.GatewayPageURL = resp.GatewayPageURL;
                  response.status = resp.status;
                 // response.total_amount = bookingResp._price;
                 // console.log('rep='+response)
                  res.send(response);
              }
              else{
                  response.status = 'FAILED';
                  response.failedreason = resp.failedreason;
                  res.send(response)
              }
              
      });

}
