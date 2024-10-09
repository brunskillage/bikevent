
class club {
    constructor(
        public id: number,
        public nameOf: string,
        public email: string,
        public createdOn: Date,
        public modifiedOn: Date,
        public president?: string,
        public websiteUrl?: string,
        public mainImageUrl?: string,
        public googleMapUrl?: string,
    ) { }
}

class bvEvent {
    constructor(
        public id: string,
        public club_id: number,
        public title: string,
        public description: string,
        public standsUp: Date,
        public createdOn: Date,
        public modifiedOn: Date,
        public endsOnOn?: Date,
        public linklUrl?: string,
        public lat?: unknown,
        public lng?: unknown,
    ) { }
}

class ride {
    constructor(
        public id: string,
        public club_id: number,
        public title: string,
        public startsOn: Date,
        public startLocation: string,
        public createdOn: Date,
        public modifiedOn: Date,
        public description?: string,
        public endsOnOn?: Date,
        public linklUrl?: string,
        public endLocation?: string,
        public mapLink?: string,
        public lat?: unknown,
        public lng?: unknown,
    ) { }
}


class userClub {
    constructor(
        public id: number,
        public clubId: number,
        public createdOn: Date,
        public modifiedOn: Date,
    ) { }
}

class user {
    constructor(
        public id: number,
        public username: string,
        public nickName: string,
        public email: string,
    ) { }
}