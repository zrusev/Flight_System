import React, { Component } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import FlightDetails from './FlightDetails';
import DetailsPage from '../DetailsPage/DetailsPage';
const serverBaseURL = 'http://localhost:9999';
class Flight extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            modalShow: false,
            flight: null
        };
    }

    modalClose = () => this.setState({ 
        modalShow: false
    });

    modalOpen = (id, flightName) => {
        fetch(`${serverBaseURL}/feed/flights/${encodeURIComponent(id)}/codeshares/${encodeURIComponent(flightName)}`)
        .then((res) => res.json())
        .then((flight) => {
          this.setState({
            flight,
            modalShow: true
          })
        })
    };

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
                            <th>{section === 'arrivals' ? 'FROM' : 'TO'}</th>
                            <th>FLIGHT</th>
                            <th>TERMINAL</th>
                            <th>STATUS</th>
                            <th>INFO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            flights.map(flight => (
                                <FlightDetails 
                                    key={`${flight.id}-${flight.flightName}`} 
                                    details={flight} 
                                    section={section}
                                    modalOpen={this.modalOpen.bind(this)} 
                                />
                            ))
                        }
                    </tbody>
                </Table>
                <Pagination>{items}</Pagination>
                <DetailsPage 
                    show={this.state.modalShow}
                    flight={this.state.flight}
                    onHide={this.modalClose.bind(this)} 
                />
            </>
        )
    }
}

export default Flight;