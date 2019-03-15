import { get, post } from '../data/crud.js';

class FlightService {
    constructor() {
        this.serverBaseURL = 'http://localhost:9999/feed';
        this.allFlights = `${this.serverBaseURL}/flights`;
    }

    getAllFlights(page, direction) {
        return get(`${this.allFlights}/page/${encodeURIComponent(page)}/direction/${encodeURIComponent(direction)}`);
    }

    getFlightByIdName(id, flightName) {
        return get(`${this.allFlights}/${encodeURIComponent(id)}/codeshares/${encodeURIComponent(flightName)}`);
    }

    postTicket(flightId,userId) {
        return post(``);
    }
}

export default FlightService;