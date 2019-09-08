var Request = require("request");
var Resp = require('../model/Resp');
var config = require('../config/config')
const fetch = require("node-fetch");
var request = require("request");
const logger = require('../config/winstonLogger');
exports.paymentApi= function (req, res){
console.log('ok')
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
    console.log(postData)
        var headers1 = {   
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        request.post({
            uri: config.payment_ssl.paymenturl,
            headers:{'content-type': 'application/x-www-form-urlencoded'},
            body:require('querystring').stringify(postData),
            },function(error,responseStatus,body){
                var response = {};
                console.log(body);
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




// exports.listen_ipn = function (req, res) {

//     Payment.listen_ipn(req, function (err, response) {

//         if (err) {
//             var resp = new Resp("error occured while processing", "400 Bad Request");
//             res.status(400).json(resp);
//         }
//         else {
//             var resp = new Resp({ "msg": response }, "200 OK");
//             res.status(200).json(resp);
//         }
//     });
// };


exports.listen_ipn_call= function(req, res) {
    logger.info("ipn post result:", req.body);
    //logger.info("ipn post result:", req.body);
    console.log("listen ipn called" + req.body['verify_key']);
    var i = 0;
    var store_passwd = md5(config.payment_ssl.store_passwd);
    // JSON.stringify(req.body);
    var verify_key = req.body['verify_key'];
    var verify_key_arr = verify_key.split(',');
    verify_key_arr[verify_key_arr.length] = 'store_passwd';
    verify_key_arr.sort();
    var hash_string = '';
    var query;
    for (i = 0; i < verify_key_arr.length; i++) {
        if(verify_key_arr[i] == 'store_passwd') {
            hash_string = hash_string + verify_key_arr[i] + "=" + store_passwd + '&';
        }
        else{
            hash_string = hash_string + verify_key_arr[i] + "=" + req.body[verify_key_arr[i]] + '&';
        }
    }
    hash_string = hash_string.substring(0, hash_string.length - 1);
    console.log(hash_string);
    console.log(md5(hash_string));
    console.log(req.body['verify_sign']);
    if (md5(hash_string) == req.body['verify_sign']) {
        console.log("match");
        logger.info("matched on hash string");
        var url = config.payment_ssl.validation_api + '?val_id=' + req.body['val_id'] + '&store_id=' + config.payment_ssl.store_id + '&store_passwd=' + config.payment_ssl.store_passwd + '&format=json';
        request.get(url, function (error, response, body) {
            console.log(url);
            console.log(response.statusCode);
            if (!error && response.statusCode == 200) {
                logger.info("ipn validation result:", body);
                console.log(body);
                var resp = JSON.parse(body);
                res.send(body);
                // query = "SELECT * FROM fixed_packages f, booking b, transactions t WHERE f.id = b.package_id AND t.booking_ref = b.booking_ref AND b.booking_ref ='" + resp.tran_id + "'";
                // sql.sql_query(query)
                //     .then(rows => {
                //         console.log("query = "+ query + "length = "+rows.length);
                //         if (rows.length == 0) {
                //             return;
                //         }
                //         // booking_ref = rows[0].booking_ref;
                //         query = "update transactions set status = '" + resp.status + "' where tran_id='" + resp.tran_id + "'";
                //         console.log(query);

                //         return sql.sql_query(query);
                //     })
                //     .then(rows => {
                //         query = "update booking set booking_status = '" + resp.status + "' where booking_ref='" + resp.tran_id + "'";
                //         console.log(query);

                //         return sql.sql_query(query);
                //     })
                //     .then(rows => {
                //         console.log("successful");
                //         return;
                //     }, err => {
                //         throw err;
                //     })
                //     .catch(err => {
                //         console.log("exception handled" + err);
                //     });
            }
            else{
                console.log("error in validation" + error);
            }
        }
        );
        result(null, '200 OK');
    }
    else {
        console.log("match failed");
        result(null, '200 OK');
    }
    console.log();
}