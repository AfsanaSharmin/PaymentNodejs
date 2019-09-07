var Request = require("request");
var language = require('../model/language');
var config = require('../config/config');
var Resp = require('../model/Resp');
const logger = require('../config/winstonLogger');
//var logger = require('logger').createLogger('development.log'); // logs to a file
// get all static languages from bookingee.com 
exports.getAndSaveLanguage = function(){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
    var options = {
        method: 'GET',
        json: true,
         url:  config.bookingee_org_Api.languageApi,
        headers: {   
            'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
            'WBE-Api-Key': config.bookingee.WBE_Api_Key
        }
      };
      
        Request.get( options, (err, response, body) => {
            if(err) {
                logger.error("language get error from bookingee:", err);
            } else {
                saveLanguage(body);
            }
           
        });

}

// delete previous collection data and save new data to language collection
function saveLanguage(languageList) {
    language.deleteMany({}).then(data => {
    }).catch(err => {
        logger.error("language collection delete error:", err);
    });

    language.create(languageList.Data).then(data => {
    }).catch(err => {
        logger.error("language save error", err);
    });
}

exports.language_get_with_limit_offset = function (req, res) {
    var limitValue = Number(req.params.limit);
    var offset = Number(req.params.offset);
    language.find({}).skip(offset).limit(limitValue).then(data => {
       // res.send(data)
       var resp = new Resp(data, "200 OK");
       res.status(200).json(resp);
    }).catch(err => {
        logger.error("language get error:", err);
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    });
};