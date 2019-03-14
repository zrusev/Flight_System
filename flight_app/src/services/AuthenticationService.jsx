import { post } from '../data/crud.js';

class AuthenticationService {
    constructor() {
        this.serverBaseURL = 'http://localhost:9999/auth';
        this.loginURL = `${this.serverBaseURL}/signin`;
    }

    login(credentials) {
        return post(this.loginURL, credentials);
    }

}

export default AuthenticationService;