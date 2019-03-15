import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Table } from 'react-bootstrap';

class BoardingPass extends Component {
    render() {
        const { destinationName: to, scheduleDate: date, scheduleTime: time, flightName: flight, seat, gate, airlineCode, number } = this.props;
        const { full_name } = this.props;
        return (
            <Container>
                <Navbar>
                    <Navbar.Brand><h5>Ticket #{number}</h5></Navbar.Brand>
                </Navbar>
                <Row className="border">
                    <Col sm={8}>
                        <Table className="p-3 mb-2 bg-light text-dark">
                            <thead>
                                <tr>
                                    <th colSpan={3}>
                                        <h5>Boarding Pass</h5>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Passenger Name: {full_name || 'TBA'}</th>
                                    <th>Date: {date || 'TBA'}</th>
                                    <th>Time: {time || 'TBA'}</th>
                                </tr>
                                <tr>
                                    <th>From: Schiphol</th>
                                    <th>Flight: {flight || 'TBA'}</th>
                                    <th>Seat: {seat || 'TBA'}</th>
                                </tr>
                                <tr>
                                    <th>To: {to || 'TBA'}</th>
                                    <th>Gate: {gate || 'TBA'}</th>
                                    <th>Airline Code: {airlineCode || 'TBA'}</th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>
                                        <img className="img-responsive center-block" src="https://beautifullives.com/wp-content/uploads/2018/05/logo-schiphol-amsterdam-airport.png" alt="logo" width="35%" />
                                    </th>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm={4}>
                        <Table className="p-3 mb-2 bg-light text-dark">
                            <thead>
                                <tr>
                                    <th colSpan={3}>
                                        <h5>Boarding Pass</h5>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th colSpan={3}>
                                        Passanger Name: {full_name || 'TBA'}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>
                                        From: Schiphol
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>
                                        To: {to || 'TBA'}
                                    </th>
                                </tr>
                                <tr>
                                    <th>Date: {date || 'TBA'}</th>
                                    <th>Time: {time || 'TBA'}</th>
                                    <th>Flight: {flight || 'TBA'}</th>
                                </tr>
                                <tr>
                                    <th>Seat: {seat || 'TBA'}</th>
                                    <th colSpan={2}>Gate: {gate || 'TBA'}</th>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default BoardingPass;