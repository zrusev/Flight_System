import React, { Component } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import FlightDetails from './FlightDetails';

class Flight extends Component {
    handleClick = (e) => {
        this.props.pageLoader(e.target.id, 'D');
    }

    render() {
        const { flights, pagination } = this.props;

        let items = [];
        if (pagination) {  
            pagination.forEach(page => {
                const id = Object.keys(page)[0];
                const val = Object.values(page)[0];

                items.push(
                    <Pagination.Item 
                        key={id} 
                        id={val} 
                        onClick={this.handleClick}>
                        {id}
                    </Pagination.Item>,
                )
            });
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