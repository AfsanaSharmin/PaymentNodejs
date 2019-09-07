const express = require('express');
const router = express.Router();
var country = require('../controller/countryController');
var nationality = require('../controller/nationalityController');
var language = require('../controller/languageController');
var currency = require('../controller/CurrencyController');
var session =  require ('../controller/sessionController');
var hotelSearch = require('../controller/hotelController');
var destination = require('../controller/destinationController');
var booking = require('../controller/bookingController');
var payment = require('../controller/paymentController');

// crud of country
router.route('/country/insert').post(country.country_create);
router.route('/country/getall').get(country.country_getall);
router.route('/country/deleteby/:id').delete(country.country_deleteone);
router.route('/country/updateby/:id').put(country.country_update);

//// data find with limit offset//////
router.route('/country/getdata/with/limitOffset/:limit/:offset').get(country.country_get_with_limit_offset);
router.route('/currency/getdata/with/limitOffset/:limit/:offset').get(currency.currency_get_with_limit_offset);
router.route('/language/getdata/with/limitOffset/:limit/:offset').get(language.language_get_with_limit_offset);
router.route('/nationality/getdata/with/limitOffset/:limit/:offset').get(nationality.nationality_get_with_limit_offset);

//////////////////////////
 router.route('/country/insert/from/bookingee').post(country.country_create_from_booking); // new api for country
 router.route('/destination/all').post(destination.destination_create);
 //router.route('/get/dest').get(destination.destget);
 
 router.route('/static/hotel/details/byHotelCode/:HotelCode').get(hotelSearch.static_hotel);
//*********************  done **************************//
router.route('/sessionCreate').get(session.session_create); // create session

router.route('/destination/findbyKeyWord/:keyword').get(destination.destination_search); // serach by user keyword 

router.route('/destination/minimum/price/hotel').post(destination.destination_search_min_price); // destination serach

//router.route('/hotel/search/byDestinationId').post(hotelSearch.hotel_search_byDestinationId) // hotel search by destinationId

router.route('/hotel/search/byHotelCode').post(hotelSearch.hotel_search_byHotelCode) // hotel search by hotelcode

router.route('/booking/options/details').post(booking.booking_options_details); // booking options details

router.route('/booking/hotel').post(booking.booking_hotels); // booking hotel

router.route('/booking/hotel/details/:bookingReferenceNo').get(booking.Hotel_booking_details); // details of hotel booking

router.route('/hotel/issueVoucher/:bookingReferenceNo').get(booking.issue_Voucher); // hotel issue voucher

router.route('/hotel/cancelBooking/:bookingReferenceNo').get(booking.cancel_Booking); // cancel hotel booking

router.route('/user/booking/records/:role/:user_id').get(booking.user_records); // booking history

//payment api
router.route('/hotel/book/payment').post(payment.paymentApi);

router.route('/hotel/book/payment/ipn').post(payment.listen_ipn_call);
//router.route('/payment/ipn').post(payment.listen_ipn);

router.route('/check/conversion/:fromCurrency/:toCurrency').get(country.checkconversion)

module.exports = router;