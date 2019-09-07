var country = require('../model/country');
var Request = require("request");
var Resp = require('../model/Resp');
var config = require('../config/config');
const https = require('https');
// var rootCas = require('ssl-root-cas/latest').create();
// require('https').globalAgent.options.ca = rootCas;
const logger = require('../config/winstonLogger');
const fetch = require("node-fetch");
//require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();
//
// var logger = require('logger').createLogger('development.log'); // logs to a file
// insert country
exports.country_create = function (req, res) {
    country.create(req.body).then(data => {
        var resp = new Resp( data , "200 OK");
        res.status(200).json(resp);
    }).catch(err => {
       // logger.error(err);
        logger.error("country create error:", err);
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    
    });
};

// get all country information
exports.country_getall = function (req, res) {
    country.find({}).then(data => {
       // res.send(data)
       var resp = new Resp(data, "200 OK");
       res.status(200).json(resp);
    }).catch(err => {
        logger.error("country get error:", err);
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    });
};

// delete country by _id
exports.country_deleteone = function (req, res) {
    country.findByIdAndDelete({_id:req.params.id}).then(data => {
        var resp = new Resp( data, "200 OK");
        res.status(200).json(resp);
       //res.send({'response':'Country deleted successfully'})
    }).catch(err => {
        logger.error("country delete error:", err);
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    });
};

//update country by _id
exports.country_update = function (req, res) {
    country.findByIdAndUpdate({_id:req.params.id},{
        Name: req.body.Name,
        CountryId: req.body.CountryId,
        ISO: req.body.ISO,
        isActive: req.body.isActive,
    }).then(data => {
        var resp = new Resp( data, "200 OK");
        res.status(200).json(resp);
       // res.send({'response':'Country updated successfully'})
    }).catch(err => {
        logger.error("country update error:", err);
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    });
};


// Bookingee.com api call and save our own database
// exports.getAndSaveCountry = function(req, res){
  
//     var options = {
//         method: 'GET',
//         json: true,
//         // host: 'http://static.uat.wbe.travel',
//         // path: '/api/hotel/countries',
//          url: 'http://static.uat.wbe.travel/api/hotel/countries',
       
//         headers: {   
//             'Authorization': 'Basic ' + new Buffer("XMLOUTUSER:XMLOUTPWD").toString('base64'),
//             'WBE-Api-Key':'F967E236-7CDC-4B62-BA3F-9586D5F26E11'
//         }
//       };
      
//         Request.get( options, (error, response, body) => {
//             if(error) {
//                 return console.dir(error);
//             } else {
//                 savecountry(body, res)
//             }
           
//         });

// }


// get all static currency data from bookingee.com 
 exports.getSavedataApi = function(){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
    var options = {
        method: 'GET',
        json: true,
        url: 'http://static.uat.wbe.travel/api/hotel/countries',
       
        headers: {   
            'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
            'WBE-Api-Key': config.bookingee.WBE_Api_Key
        }
      };
      
        Request.get( options, (error, response, body) => {
            if(error) {
                logger.error("country get error from bookingee:", err);
            } else {
                savecountry(body)
            }
           
        });
}

// delete previous collection data and save new data to language collection
function savecountry(countryList) {
 
    country.deleteMany({}).then(data => {
    }).catch(err => {
        logger.error("country collection delete error:", err);
       // console.log(err);
    });
    country.create(countryList.Data).then(data => {
      //   res.status(200).send({'response':'Counrtry created successfully'});
     }).catch(err => {
        logger.error("country create error:", err);
     });
 }

 exports.country_create_from_booking = function(req, res){
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password;
    var options = {
        method: 'GET',
        json: true,
        url: config.bookingee_org_Api.countryApi,
       
        headers: {  
            'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
           'WBE-Api-Key': config.bookingee.WBE_Api_Key
        }
      };
      
        Request.get( options, (error, response, body) => {
            if(error) {
                logger.error("country get error from bookingee:", err);
            } else {     
                savecountry(body)
            }
           
        });


        function savecountry(countryList) {
 
            country.deleteMany({}).then(data => {
            }).catch(err => {
                logger.info("country collection delete error:", err);
            });
            country.create(countryList.Data).then(data => {
                res.status(200).send({'response':'Counrtry created successfully'});
             }).catch(err => {
                 logger.error("country create error:", err);
                 res.status(500).send({
                     message: err.message || "Error while Saving Server Data"
                 });
             });
         }
}

/////////////////////////// country get with limit offset//////////////////////
// get all country information
exports.country_get_with_limit_offset = function (req, res) {
    var l = Number(req.params.limit);
    var offset = Number(req.params.offset);
    country.find({}).skip(offset).limit(l).then(data => {
       var resp = new Resp(data, "200 OK");
       res.status(200).json(resp);
    }).catch(err => {
         logger.error("country get error ",err);
         var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    });
};

exports.checkconversion = function(req, res){
    console.log('check')
    var options = {
        method: 'GET',
        json: true,
        url: 'https://stage.navigatortourism.com:4000/currency/BDT/USD',
       
        // headers: {  
        //     'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
        //    'WBE-Api-Key': config.bookingee.WBE_Api_Key
        // }
      };
    // Request(options, (error, response, body) => {
    //     console.log(body);
    //     console.log(response)
    //     if(error) {
    //         logger.error("country get error from bookingee:", err);
    //     } else {     
    //         res.send(body);
    //       //  savecountry(body)
    //     }
       
    // });

    
    const options1 = {
        //hostname: 'stage.navigatortourism.com',
      //  url: 'https://stage.navigatortourism.com:4000/currency/BDT/USD',
       // port: 4000,
       // path: '/currency/BDT/USD',
        url: config.currency.currency_convertApi+req.params.fromCurrency+'/'+req.params.toCurrency,
        method: 'GET',
        strictSSL: false,
        rejectUnauthorized: false
       }
       Request(options1, (error, response, result) => {
        //  console.log(body);
          console.log(result)
        //   var l = responsedata.Data.length;
        //   console.log(l);
         // console.log(result.body)
          var convresult = JSON.parse(result);
          console.log(convresult)
          var conversionrate = convresult.body[0].conversionRate;
          console.log(conversionrate);
          res.send(result)
      })
        //console.log(`statusCode: ${res.statusCode}`)

// https.get('https://stage.navigatortourism.com:4000/currency/BDT/USD', (resp) => {
//       console.log(resp);
//       res.send(resp)
//     });

// }

// fetch('https://stage.navigatortourism.com:4000/currency')
//     .then(res => res.json())
//     .then(json => console.log(json));
}