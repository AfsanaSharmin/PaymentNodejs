const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Configuring the database
const mongoose = require("mongoose");
const config = require('./config/config');

 var appRoutes = require('./routes/approutes');
 const  scheduler = require('./Scheduler/bookingStaticScheduler');
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





// mongoose.connect(config.nosqldb.url, {
//     "auth": { "authSource": "admin" },
//     "user": "dbadmin",
//     "pass": "db@dm!n@2019#",
//     "useNewUrlParser": true
    
// }).then(() => {
//         console.log("Successfully connected to the database");
//     }).catch(err => {
//         console.log('Could not connect to the database. Exiting now...');
//         process.exit();
//     });





// plz change according to your database
// Connecting to the database
mongoose.connect('mongodb://localhost:27017/hotelServerDb', { useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.use(function(err,req,res,next){
    res.status(422).send({error:err.message});
})

var port = process.env.PORT || 27173
//listen for requests
var ipaddress = '148.72.212.173';

app.listen(4000,function(){
    console.log("listening for request");
});
// routes of api
app.use('/hotel/api', appRoutes);

module.exports = app;