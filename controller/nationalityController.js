var Request = require("request");
var nationality = require('../model/nationality');
var config = require('../config/config');
// var logger = require('logger').createLogger('development.log'); // logs to a file
var Resp = require('../model/Resp');
const logger = require('../config/winstonLogger');
// get all static nationalities from bookingee.com 
exports.getAndSaveNationality = function(){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
    var options = {
        method: 'GET',
        json: true,
        url: config.bookingee_org_Api.nationalityApi,
       
        headers: {   
            'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
            'WBE-Api-Key':config.bookingee.WBE_Api_Key
        }
      };
      
        Request.get( options, (err, response, body) => {
            if(err) {
                logger.error("nationality get error from bookingee:", err);
            } else {
                savenationality(body)
            }
           
        });
}

// delete previous collection data and save new data to nationality collection
function savenationality(nationalityList) {

    nationality.deleteMany({}).then(data => {
    }).catch(err => {
        logger.error("nationality collection delete error ", err);
    });

    nationality.create(nationalityList.Data).then(data => {
    }).catch(err => {
        logger.error("nationality save error:", err);
    });
}

exports.nationality_get_with_limit_offset = function (req, res) {
    var limitValue = Number(req.params.limit);
    var offset = Number(req.params.offset);
    nationality.find({}).skip(offset).limit(limitValue).then(data => {
       // res.send(data)
       var resp = new Resp(data, "200 OK");
       res.status(200).json(resp);
    }).catch(err => {
        logger.error("nationality get error:", err);
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    });
};