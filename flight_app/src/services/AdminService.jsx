import { get, post } from '../data/crud.js';

class AdminService {
    constructor() {
        this.serverBaseURL = 'http://localhost:9999/auth';
        this.users = `${this.serverBaseURL}/users`
    }

    getUsers() {
        return get(`${this.users}`);
    }

    removeUser(userId) {
        return post(`${this.users}/delete/${encodeURIComponent(userId)}`);
    }

}

export default AdminService;