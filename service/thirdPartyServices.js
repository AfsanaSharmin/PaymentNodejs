const express = require('express');
const router = express.Router();
var country = require('../controller/countryController');
var nationality = require('../controller/nationalityController');
var language = require('../controller/languageController');
var currency = require('../controller/CurrencyController');
var session =  require ('../controller/sessionController');
// var destinationSearch = require('../controller/destinationSearchController');
var hotelSearch = require('../controller/hotelController');
var destination = require('../controller/destinationController');
var bookingAction = require('../controller/bookingController');
var config = require('../config/config');

// session create
exports.tp_sessionCreate = function (req, res){
    if(config.organization_Api.orgname == 'Bookingee'){
        session.session_create(req, res);
    } else if(config.organization_Api.orgname == 'Booking'){

    }  
}

// search destination with minimum hotel price
// exports.tp_destinationSearch = function (req, res){
//     if(config.organization_Api.orgname == 'Bookingee'){
//         destinationSearch.destination_search(req, res);
//     } else if(config.organization_Api.orgname == 'Booking'){

//     }
    
// }

// serach hotel by destinationId
exports.tp_hotelSearchByDestinationId = function (req, res){
    if(config.organization_Api.orgname == 'Bookingee'){
        hotelSearch.hotel_search_byDestinationId(req, res);
    } else if(config.organization_Api.orgname == 'Booking'){

    }
    
}

// serach hotel by hotelCode
exports.tp_hotelSearchByHotelCode = function (req, res){
    if(config.organization_Api.orgname == 'Bookingee'){
        hotelSearch.hotel_search_byHotelCode(req, res);
    } else if(config.organization_Api.orgname == 'Booking'){

    }  
}

// serach booking options details
exports.tp_bookingOptionsDetails = function (req, res){
    if(config.organization_Api.orgname == 'Bookingee'){
        bookingAction.booking_options_details(req, res);
    } else if(config.organization_Api.orgname == 'Booking'){

    }  
}


//  booking hotels
exports.tp_bookingHotels = function (req, res){
    if(config.organization_Api.orgname == 'Bookingee'){
        bookingAction.booking_hotels(req, res);
    } else if(config.organization_Api.orgname == 'Booking'){

    }  
}

// get booking hotel details
exports.tp_hotelBookingDetails = function (req, res){ 
    if(config.organization_Api.orgname == 'Bookingee'){
        bookingAction.Hotel_booking_details(req, res);
    } else if(config.organization_Api.orgname == 'Booking'){

    }  
}

// destination search by keyword
exports.tp_destinationSearchByKeyword= function (req, res){
    if(config.organization_Api.orgname == 'Bookingee'){
        destination.destination_search(req, res);
    } else if(config.organization_Api.orgname == 'Booking'){

    }  
}

//
exports.tp_destinationCreate = function (req, res){
    if(config.organization_Api.orgname == 'Bookingee'){
        destination.destination_create(req, res);
    } else if(config.organization_Api.orgname == 'Booking'){

    }  
}

// country create from bookingee
exports.tp_countryCreateBookingee = function (req, res){ 
    if(config.organization_Api.orgname == 'Bookingee'){
        country.country_create_from_booking(req, res);
    } else if(config.organization_Api.orgname == 'Booking'){

    }  
}
