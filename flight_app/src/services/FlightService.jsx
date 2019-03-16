import { get, post } from '../data/crud.js';

class FlightService {
    constructor() {
        this.serverBaseURL = 'http://localhost:9999/feed';
        this.allFlights = `${this.serverBaseURL}/flights`;
        this.allTickets = `${this.serverBaseURL}/tickets`
    }

    getAllFlights(page, direction) {
        return get(`${this.allFlights}/page/${encodeURIComponent(page)}/direction/${encodeURIComponent(direction)}`);
    }

    getFlightByIdName(id, flightName) {
        return get(`${this.allFlights}/${encodeURIComponent(id)}/codeshares/${encodeURIComponent(flightName)}`);
    }

    getFlightByName(searchValue) {
        return get(`${this.allFlights}/flightName/${encodeURIComponent(searchValue)}`);
    }

    postTicket(details) {
        return post(`${this.allTickets}/create`, details);
    }
}

export default FlightService;