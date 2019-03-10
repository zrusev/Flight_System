import React, { Component } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import FlightDetails from './FlightDetails';

class Flight extends Component {    
    render() {
        const { flights } = this.props; 
        
        let active = 2;
        let items = [];
        for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
            )
        }

        return (
            <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>TIME</th>
                        <th>TO</th>
                        <th>FLIGHT</th>
                        <th>TERMINAL</th>
                        <th>STATUS</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        flights.map(flight => (
                            <FlightDetails key={flight.id} details={flight} />
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