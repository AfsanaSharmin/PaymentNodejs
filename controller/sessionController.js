var Request = require("request");
var nationality = require('../model/nationality');
var config = require('../config/config');
var Resp = require('../model/Resp');
// var logger = require('logger').createLogger('development.log'); // logs to a file
var session = require('../service/sessionCreateService');
const logger = require('../config/winstonLogger');

 exports.session_create = function(req, res){
    session.sessionCreate(req, res);
 }


 
 function sessionCreateBookingee(){
     var sresult;
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password
    var options = {
        method: 'POST',
        json: true,
        url:config.bookingee_org_Api.sessionCreateApi,
        headers: {   
            'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
            'WBE-Api-Key': config.bookingee.WBE_Api_Key
        }
      };

      Request.post( options, (error, response, body) => {
        if(error) {
             logger.error("session get error from bookingee:", error);
        } else {
            this.sresult = body;
            test(body)
            
        }
       
    });

    function test(body){
    return body;
    }
 }
 module.exports.sessionCreateBookingee = sessionCreateBookingee;