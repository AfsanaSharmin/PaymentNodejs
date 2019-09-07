module.exports =  class SearchHotel {
    constructor(SessionID, HotelCode, CheckInDate,CheckOutDate,CurrencyCode,NationalityCode, Rooms){  
        this.SessionID = SessionID;
        this.HotelCode = HotelCode;
        this.CheckInDate = CheckInDate;
        this.CheckOutDate = CheckOutDate;
        this.CurrencyCode = CurrencyCode;
        this.NationalityCode = NationalityCode;
        this.Rooms = Rooms;

    }
  
}