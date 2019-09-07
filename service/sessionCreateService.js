const express = require('express');
const fetch = require("node-fetch");
var config = require('../config/config');
var apiOrg = require ('../config/apiOrganization');
var Request = require("request");
var Resp = require('../model/Resp');
const logger = require('../config/winstonLogger');
//var logger = require('logger').createLogger('development.log'); // logs to a file
exports.sessionCreate = function(req, res){
    switch(config.organization_Api.orgname)
    {
    case (apiOrg.Name.orgname1):
        Bookingee_sessionCreate(req, res)
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
function Bookingee_sessionCreate(req, res){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password
    var options = {
        method: 'POST',
        json: true,
        url: config.bookingee_org_Api.sessionCreateApi,
       // url: 'http://webapi.uat.wbe.travel/api/security/CreateSessionID',
        headers: {   
            'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
            'WBE-Api-Key': config.bookingee.WBE_Api_Key
        }
      };

      Request.post( options, (error, response, body) => {
        if(error) {
             logger.error("session get error from bookingee:", error);
        } else {
            var resp = new Resp( body , "200 OK");
            res.status(200).json(resp);
        }
       
    });
}