
var Request = require("request");
var Resp = require('../model/Resp');
var config = require('../config/config')
var logger = require('logger').createLogger('development.log'); // logs to a file
const fetch = require("node-fetch");
const SearchDestReq = require('../model/searchDestReq');
const searchHotelReq = require('../model/searchHotelReq');
const hotelService = require ('../service/hotelService');


exports.hotel_search_byDestinationId = function (req, res) {
  hotelService.hotelSearch_bydestinationId(req, res);
};


exports.hotel_search_byHotelCode = function (req, res) {
  hotelService.hotelSearch_byHotelCode(req, res);
};

/// static hotel api call
exports.static_hotel = function (req, res){
  hotelService.static_hotelSearch(req,res)
}
