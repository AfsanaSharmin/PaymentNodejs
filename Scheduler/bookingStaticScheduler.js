const cron = require('node-cron');
var CronJob = require('cron').CronJob;
var country = require('../controller/countryController');
var language = require('../controller/languageController');
var currency = require('../controller/CurrencyController');
var nationality = require('../controller/nationalityController');
var destination = require('../controller/destinationController');
///////////////////////
//....... meaning of * .................//
// 1st * =second, 2nd* = minute, 3rd* =hour, 4th* = day of month, 5th * = month, 6th* = day of week
// new CronJob('*/10 * * * * *', function() {
//   currency.getAndSaveCurrency();
//   }, null, true, '');

// //
//   new CronJob('*/20 * * * * *', function() {
//     country.getSavedataApi();
//     }, null, true, '');

// // //
//   new CronJob('*/30 * * * * *', function() {
//     language.getAndSaveLanguage();
//  }, null, true, '');
//  //
//  new CronJob('*/40 * * * * *', function() {
//     nationality.getAndSaveNationality();
//  }, null, true, '');

 // destination
//  new CronJob('* */8 * * * *', function() {
//     destination.destination_get_and_create();
//  }, null, true, '');


