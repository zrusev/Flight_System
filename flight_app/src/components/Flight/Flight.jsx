import React, { Component } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import FlightDetails from './FlightDetails';

class Flight extends Component {
    handleClick = (e) => {
        this.props.pageLoader(e.target.id.split('-')[1], e.target.name);
    }

    render() {
        const { flights, pagination, section } = this.props;

        let items = [];
        if (pagination) {  
            pagination.forEach(page => {
                const id = Object.keys(page)[0];
                const val = Object.values(page)[0];

                items.push(
                    <Pagination.Item 
                        key={`${section}-${id}-${val}`} 
                        id={`${section}-${val}`} 
                        name={section}
                        onClick={this.handleClick}>
                        {id}
                    </Pagination.Item>,
                )                
            });
        }

        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>TIME</th>
                            <th>DATE</th>
                            <th>TO</th>
                            <th>FLIGHT</th>
                            <th>TERMINAL</th>
                            <th>STATUS</th>
                            <th>INFO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            flights.map(flight => (
                                <FlightDetails key={`${flight.id}-${flight.flightName}`} details={flight} section={section} />
                            ))
                        }
                    </tbody>
                </Table>
                <Pagination>{items}</Pagination>
            </>
        )
    }
}

export default Flight;