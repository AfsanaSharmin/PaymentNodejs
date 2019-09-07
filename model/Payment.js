module.exports =  class Payment {
    constructor(store_id, store_passwd, total_amount,currency,tran_id,success_url, fail_url,cancel_url, 
        cusn_ame , cus_email, cus_add1, cus_add2, cus_city, cus_state,cus_postcode, cus_country){  
        this.store_id = store_id;
        this.store_passwd = store_passwd;
        this.total_amount = total_amount;
        this.currency = currency;
        this.tran_id = tran_id;
        this.success_url = success_url;
        this.fail_url = fail_url;
        this.cancel_url = cancel_url;
        this.cusn_ame = cusn_ame;
        this.cus_email = cus_email;
        this.cus_add1 = cus_add1;
        this.cus_add2 = cus_add2;
        this.cus_city = cus_city;
        this.cus_state = cus_state;

        this.cus_postcode = cus_postcode;
        this.success_url = success_url;
        this.fail_url = fail_url;
        this.cancel_url = cancel_url;
        this.cusn_ame = cusn_ame;
        this.cus_email = cus_email;
        this.cus_add1 = cus_add1;
        this.cus_add2 = cus_add2;
        this.cus_city = cus_city;
        this.cus_state = cus_state;

    }
  
}

// "cus_state":"Dhaka",
// "cus_postcode":1000,
// "cus_country":"Bangladesh",
// "cus_phone":01711111111,
// "cus_fax": 01711111111,
// "ship_name":"CustomerName",
// "ship_add1" :"Dhaka",
// "ship_add2":"Dhaka",
// "ship_city":"Dhaka",
// "ship_state":"Dhaka",
// "ship_postcode":1000,
// "ship_country":"Bangladesh",
// "multi_card_name":"mastercard,visacard,amexcard",
// "value_a":"ref001_A",
// "value_b":"ref002_B",
// "value_c":"ref003_C",
// "value_d":"ref004_D"