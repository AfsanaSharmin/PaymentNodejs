
module.exports = class BookingActionRequest {
    constructor(SessionID, TID, HotelCode) {
        this.SessionID = SessionID;
        this.TID = TID;
        this.HotelCode = HotelCode;
    }
 

    // display() {
    //     console.log(this.status + " " + this.body);
    // }
 }

 module.exports = class BookingRequest {
    constructor(SessionID, TID, HotelCode,PaymentOption,AgencyReference,CarbonCopyMail, Rooms){
        this.SessionID = SessionID;
        this.TID = TID;
        this.HotelCode = HotelCode;

        this.PaymentOption = PaymentOption;
        this.AgencyReference = AgencyReference;
        this.CarbonCopyMail = CarbonCopyMail;
        this.Rooms = Rooms;
    }
 }
