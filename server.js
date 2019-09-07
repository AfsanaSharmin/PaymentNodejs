const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Configuring the database
const mongoose = require("mongoose");
const config = require('./config/config');
const winston = require('./config/winstonLogger');
 var appRoutes = require('./routes/approutes');
 const  scheduler = require('./Scheduler/bookingStaticScheduler');
 var morgan  = require('morgan');
 const https = require('https');
const fs = require('fs');
//set upp express app
const app=express();

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers',
        'Origin,X-Requested-With, Content-Type, Accept, Authorization'
    )
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

mongoose.Promise=global.Promise;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined', { stream: winston.stream }));

mongoose.connect(config.nosqldb.url, {
    "auth": { "authSource": config.mongodbServer.authsource },
    "user": config.mongodbServer.username,
    "pass": config.mongodbServer.password,
    "useNewUrlParser": true
    
}).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...');
        process.exit();
    });


var port = process.env.PORT || config.serverapp.port
//listen for requests
// var ipaddress = '148.72.212.173';

/*app.listen(port,function(){
    console.log("listening for request");
});*/
// routes of api
app.use('/hotel/api', appRoutes);
var cert = fs.readFileSync('/home/navigatortourism/ssl/certs/stage_navigatortourism_com_abe6b_b78df_1590918854_a124e308a70386107bd2b3442bf6aabc.crt');
var key = fs.readFileSync('/home/navigatortourism/ssl/keys/abe6b_b78df_68b8c5cc0d9789acbdb952d6aed0ec04.key');
var options = {
  key: key,
  cert: cert
};
var server = https.createServer(options, app);
server.listen(port, () => {
  console.log("server starting on port : " + port)
});
module.exports = app;