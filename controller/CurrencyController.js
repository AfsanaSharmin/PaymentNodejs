var Request = require("request");
var currency = require('../model/currency');
var config = require('../config/config')
const logger = require('../config/winstonLogger');
//var logger = require('logger').createLogger('development.log'); // logs to a file
var Resp = require('../model/Resp');
// get all static currency data from bookingee.com 
exports.getAndSaveCurrency = function(){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
    var options = {
        method: 'GET',
        json: true,
        url:  config.bookingee_org_Api.currencyApi,
        headers: {   
            'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
            'WBE-Api-Key': config.bookingee.WBE_Api_Key
        }
      };
      
        Request.get( options, (err, response, body) => {
            if(err) {
                logger.error("currency get error from bookingee:", err);
            } else {
                saveCurrencies(body);
            }
           
        });

}
// delete previous collection data and save new data to currency collection
function saveCurrencies(currencyList) {

    currency.deleteMany({}).then(data => {
    }).catch(err => {
        logger.info("currency collection delete error:", err);
    });

    currency.create(currencyList.Data).then(data => {
    }).catch(err => {
        logger.error("currency save error:", err);
    });
}

exports.currency_get_with_limit_offset = function (req, res) {
    var limitValue = Number(req.params.limit);
    var offset = Number(req.params.offset);
    currency.find({}).skip(offset).limit(limitValue).then(data => {
       // res.send(data)
       var resp = new Resp(data, "200 OK");
       res.status(200).json(resp);
    }).catch(err => {
        logger.error("country get error:", err);
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    });
};