import { post } from '../data/crud.js';

class AuthenticationService {
    constructor() {
        this.serverBaseURL = 'http://localhost:9999/auth';
        this.loginURL = `${this.serverBaseURL}/signin`;
        this.signupURL = `${this.serverBaseURL}/signup`;
    }

    login(credentials) {
        return post(this.loginURL, credentials);
    }

    signup(credentials) {
        return post(this.signupURL, credentials);
    }
}

export default AuthenticationService;