
const SearchDestReq = require('../model/searchDestReq');
const fetch = require("node-fetch");
var Resp = require('../model/Resp');
var config = require('../config/config')
var logger = require('logger').createLogger('development.log'); // logs to a file

exports.destination_search = function (req, res) {
   
  var desReqData = new SearchDestReq(req.body.SessionID,req.body.DestinationId, req.body.CheckInDate,req.body.CheckOutDate ,req.body.CurrencyCode,req.body.NationalityCode, req.body.Rooms);

      var headers1 = {   
        'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
        'WBE-Api-Key': config.bookingee.WBE_Api_Key,
        'Content-Type': 'application/json'
    }
    // 'http://webapi.uat.wbe.travel/api/hotel/searchminprice'
  
      fetch(config.bookingee_org_Api.destinationSearch, {
        method: 'post',
        body:    JSON.stringify(desReqData),
        headers: headers1,
    })
    .then(res => res.json())
    .then(data => {
      res.send(data)
    }).catch(err => {
      logger.info("destination search error:", err);
  });
};
//

