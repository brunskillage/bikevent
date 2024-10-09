"use strict";
var club = /** @class */ (function () {
    function club(id, nameOf, email, createdOn, modifiedOn, president, websiteUrl, mainImageUrl, googleMapUrl) {
        this.id = id;
        this.nameOf = nameOf;
        this.email = email;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.president = president;
        this.websiteUrl = websiteUrl;
        this.mainImageUrl = mainImageUrl;
        this.googleMapUrl = googleMapUrl;
    }
    return club;
}());
var bvEvent = /** @class */ (function () {
    function bvEvent(id, club_id, title, description, standsUp, createdOn, modifiedOn, endsOnOn, linklUrl, lat, lng) {
        this.id = id;
        this.club_id = club_id;
        this.title = title;
        this.description = description;
        this.standsUp = standsUp;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.endsOnOn = endsOnOn;
        this.linklUrl = linklUrl;
        this.lat = lat;
        this.lng = lng;
    }
    return bvEvent;
}());
var ride = /** @class */ (function () {
    function ride(id, club_id, title, startsOn, startLocation, createdOn, modifiedOn, description, endsOnOn, linklUrl, endLocation, mapLink, lat, lng) {
        this.id = id;
        this.club_id = club_id;
        this.title = title;
        this.startsOn = startsOn;
        this.startLocation = startLocation;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
        this.description = description;
        this.endsOnOn = endsOnOn;
        this.linklUrl = linklUrl;
        this.endLocation = endLocation;
        this.mapLink = mapLink;
        this.lat = lat;
        this.lng = lng;
    }
    return ride;
}());
var userClub = /** @class */ (function () {
    function userClub(id, clubId, createdOn, modifiedOn) {
        this.id = id;
        this.clubId = clubId;
        this.createdOn = createdOn;
        this.modifiedOn = modifiedOn;
    }
    return userClub;
}());
var user = /** @class */ (function () {
    function user(id, username, nickName, email) {
        this.id = id;
        this.username = username;
        this.nickName = nickName;
        this.email = email;
    }
    return user;
}());
//# sourceMappingURL=models.js.map