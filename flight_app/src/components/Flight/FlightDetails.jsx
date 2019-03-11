import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

class FlightDetails extends Component {
    handleClick = (id, flightName) => {
        alert(`${id}-${flightName}`);
    }
    render() {
        library.add(faPlaneArrival, faPlaneDeparture);
        
        const directions = {
            arrivals: 'plane-arrival',
            departures: 'plane-departure'
        }

        const { id, scheduleTime, scheduleDate, flightName, terminal, route, publicFlightState } = this.props.details;
        const { section } = this.props;

        return (
            <tr>
                <td>{scheduleTime}</td>
                <td>{scheduleDate}</td>
                <td>{route.destinations[0]}</td>
                <td>{flightName}</td>
                <td>{terminal === null ? 'TBA': terminal}</td>
                <td>{publicFlightState.flightStates[0]}</td>
                <td>
                    <Button size="sm" onClick={() => this.handleClick(id, flightName)} >
                        <FontAwesomeIcon icon={directions[section]} />
                    </Button>
                </td>
            </tr>
        )
    }
}

export default FlightDetails;