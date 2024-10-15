export class Auth {
    constructor(email, isLoggedIn, userName, token) {
        this.email = email
        this.isLoggedIn = isLoggedIn
        this.userName = userName
        this.token = token
    }
}

export class AppConfig {
    constructor(isDevEnvironment, tokenExpiryMinutes) {
        this.isDevEnvironment = isDevEnvironment;
        this.tokenExpiryMinutes = tokenExpiryMinutes;
    }
}

export class LocalStorageItem {
    constructor(key, val,expires){
        this.key = key
        this.val = val
        this.expires = expires
    }
}
