import React, { Component } from 'react';

class FlightDetails extends Component {
    render() {
        const { scheduleTime, flightName, terminal, route, publicFlightState } = this.props.details;
        
        return (
            <tr>
                <td>{scheduleTime}</td>
                <td>{route.destinations[0]}</td>
                <td>{flightName}</td>
                <td>{terminal === null ? 'TBA': terminal}</td>
                <td>{publicFlightState.flightStates[0]}</td>
                <td>Action</td>
            </tr>
        )
    }
}

export default FlightDetails;