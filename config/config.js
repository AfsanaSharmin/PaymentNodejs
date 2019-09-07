const config = {
    app: {
      port: 4000,
      ip: "148.72.212.173"
    },
    serverapp:{
      port: 4003,
      //ip: "148.72.212.173"
    },
    db: {
/*        connectionLimit:10,*/
        host: "148.72.212.173",
        username: "traveler",
        port: 33173,
        password:"tr@vel3r@2019",
        database:"travel_db"
    },

    nosqldb:{
      url: 'mongodb://148.72.212.173:27173/hotel_db',
     // url: 'mongodb://localhost:27017/hotelServerDb',
      port: 27173
    },
// mongodb connection
   mongodbServer: {
    authsource:'admin',
    username:'dbadmin',
    password:'db@dm!n@2019#',

   },
    //////////////////
    organization_Api: {
       orgname: 'Bookingee',
      //  orgname: 'Booking',
      //  orgname: 'Agoda',
    },
  

    // booking.com api access
    bookingee : {
      username:'XMLOUTUSER',
      password:'XMLOUTPWD',
      WBE_Api_Key: 'F967E236-7CDC-4B62-BA3F-9586D5F26E11'
    },

    bookingee_org_Api:{
    // static api
    countryApi: 'http://static.uat.wbe.travel/api/hotel/countries',
    currencyApi: 'http://static.uat.wbe.travel/api/hotel/currencies',
    languageApi: 'http://static.uat.wbe.travel/api/hotel/languages',
    nationalityApi: 'http://static.uat.wbe.travel/api/hotel/nationalities',
    destinationApi: 'http://static.uat.wbe.travel/api/hotel/destinations?CountryId=',
    hoteldetailsApi: 'http://static.uat.wbe.travel/api/hotel/details?hotelCode=',
    //dynamic api
    sessionCreateApi: 'http://webapi.uat.wbe.travel/api/security/CreateSessionID',
    destinationSearch: 'http://webapi.uat.wbe.travel/api/hotel/searchminprice',
    hotelSearchApi: 'http://webapi.uat.wbe.travel/api/hotel/search',
    bookingOptionApi: 'http://webapi.uat.wbe.travel/api/hotel/optionDetails',
    HotelBookApi: 'http://webapi.uat.wbe.travel/api/hotel/book',
    hotelBookingDetails: 'http://webapi.uat.wbe.travel/api/hotel/bookingDetails?bookingReference=',
    issueVoucher: 'http://webapi.uat.wbe.travel/api/hotel/issueVoucher?bookingReference=',
    cancelBooking: 'http://webapi.uat.wbe.travel/api/hotel/cancelBooking?bookingReference='

   },
   currency:{
   currency_convertApi:"https://stage.navigatortourism.com:4000/currency/"
   },
    payment_ssl: {
        paymenturl : "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
        success_url : "http://148.72.212.173:3000/payment/success",
        fail_url : "http://148.72.212.173:3000/payment/fail",
        cancel_url : "http://148.72.212.173:3000/payment/cancel",
        session_api: "https://sandbox.sslcommerz.com/gwprocess/v3/api.php",
        validation_api : "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
        store_id : "navig5cb6cb7bde769",
        store_passwd : "navig5cb6cb7bde769@ssl"

    },
    notification: {
        email : "https://dwwp1.api.infobip.com/email/1/send",
        sms : "https://dwwp1.api.infobip.com/sms/2/text/single",
        dispatcher:"http://148.72.212.173:4000/notification/dispatcher",
        file_base_path:"/var/www/html/stage/services/triptionary-server/",
        from_email:"navigator@sd1.emailtesthub.com",
        /* from_email:"info@navigatortourism.com",
         */
    }
   };

   module.exports = config;
