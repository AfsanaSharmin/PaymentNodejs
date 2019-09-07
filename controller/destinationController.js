var country = require('../model/country');
var Request = require("request");
var config = require('../config/config')
var destination = require('../model/destination')
var Resp = require('../model/Resp');
var destinationService = require('../service/destinationService')
// for scheduler

exports.destination_get_and_create = function () {
    country.find({}).then(data => { 
        saveCountryToDestination(data)
       
    }).catch(err => {
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    
    });
};

//
// exports.destget = function(req, res){
//     destination.find({'destinationType':'Region'}).then(data => { 
//        res.send(data);
       
//     }).catch(err => {
//         var resp = new Resp(err, "400 Bad Request");
//          res.status(400).json(resp);
    
//     });
// }


// for api
exports.destination_create = function (req, res) {
    var destinationNestedChildren = [];

    country.find({}).then(data => { 
        saveCountryToDestination(data)
       
    }).catch(err => {
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    
    });

//
function saveCountryToDestination(data){
  //  console.log(data)
    var countrylist = [];
    var l = data.length;
    for(let i= 0; i<l; i++){
        countrylist.push(
            {
                DestinationId:data[i].CountryId,
                Name: data[i].Name,
                ParentDestinationId:0,
                Label:data[i].Name,
                destinationType:'Country',
                Depth: 0

            }
        )
    }

    destination.create(countrylist).then(res => {
        findDestinationsAndSave(data);
  
    }).catch(err => {
        console.log(err);
       
    });

}

function findDestinationsAndSave(countrylist){
    var l = countrylist.length;

    //for(let i= 0; i<l; i++){
    // 202, 135
            destinationApiget(countrylist[135].CountryId,countrylist[135]);
        

  // }

}


function destinationApiget(countryid,countrydata ){
    console.log('ok'+countryid)
    var usernamePassword = config.bookingee.username + ':' + config.bookingee.password
    var options = {
        method: 'GET',
        json: true,
        url: 'http://static.uat.wbe.travel/api/hotel/destinations?CountryId='+countryid,
        headers: {   
            'Authorization': 'Basic ' + new Buffer(usernamePassword).toString('base64'),
            'WBE-Api-Key': config.bookingee.WBE_Api_Key
        }
      };

      Request.get( options, (error, response, body) => {
        if(error) {
            return console.dir(error);
        } else {
            console.log(body);
          // destinationProcess(countrydata, body)
          destinationNestedChildren = [];
          var result = destination_Children(body.Data,countrydata.Name);
          destination_save(result);
        }
       
    });
}


// nested children parse dynamically
function destination_Children(data, labeldata){
    var l = data.length;
   
    for(let i= 0; i<l; i++){
       
        if(data[i].Children.length > 0){
            destinationNestedChildren.push(
                {
                   DestinationId:data[i].DestinationId,
                   Name: data[i].Name,
                   ParentDestinationId: data[i].ParentDestinationId,
                   Label:  data[i].Name+ ',' + labeldata,
                   destinationType:'Region',
                }
            )
            lab =  data[i].Name+','+labeldata;
            destination_Children(data[i].Children,lab )
        } else {
         
            destinationNestedChildren.push(
                {
                    DestinationId:data[i].DestinationId,
                    Name: data[i].Name,
                    ParentDestinationId: data[i].ParentDestinationId,
                    Label:  data[i].Name+ ',' + labeldata,
                   destinationType:'Region',
                }
            )
           // lab = ''
        }
    }
  
        return destinationNestedChildren;
  
}


function destination_save(desData){
    destination.create(desData).then(data => { 
       // saveCountryToDestination(data)
       res.send('ok')
    }).catch(err => {
        var resp = new Resp(err, "400 Bad Request");
         res.status(400).json(resp);
    
    });
}

};


 // ******* destination search by keyword *******************//
 exports.destination_search = function(req, res){
     var badRequest = "400 Bad Request";
     var keyword = req.params.keyword;
     //console.log(keyword);
     if(keyword == 'null'){
         console.log('ok');
        destination.find({'destinationType':'Region'}, ('Name Region destinationType DestinationId')).then(data => { 
            var resp = new Resp( data, "200 OK");
            res.status(200).json(resp);
               }).catch(err => {
                var resp = new Resp(err,badRequest );
                res.status(400).json(resp);
               });
     } else {
        destination.find({'Name':{ $regex:'.*'+keyword+'.*'}, 'destinationType':'Region'}, ('Name Region destinationType DestinationId')).then(data => { 
            var resp = new Resp( data, "200 OK");
            res.status(200).json(resp);
               }).catch(err => {
                var resp = new Resp(err,badRequest );
                res.status(400).json(resp);
               });
     }
   
 }

// destination search and find minimum price hotels
exports.destination_search_min_price = function (req, res) {
    destinationService.destination_Search_MinimunPrice(req, res);
}
