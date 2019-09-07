module.exports =  class SearchDestination {
    constructor(SessionID, DestinationId, CheckInDate,CheckOutDate,CurrencyCode,NationalityCode, Rooms){  
        this.SessionID = SessionID;
        this.DestinationId = DestinationId;
        this.CheckInDate = CheckInDate;
        this.CheckOutDate = CheckOutDate;
        this.CurrencyCode = CurrencyCode;
        this.NationalityCode = NationalityCode;
        this.Rooms = Rooms;

    }
  
}

