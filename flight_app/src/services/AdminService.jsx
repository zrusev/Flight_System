import { get } from '../data/crud.js';

class AdminService {
    constructor() {
        this.serverBaseURL = 'http://localhost:9999/auth';
        this.users = `${this.serverBaseURL}/users`
    }

    getUsers() {
        return get(`${this.users}`);
    }

}

export default AdminService;