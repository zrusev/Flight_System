import React, { Component } from 'react';
import { Container, Row, Col, Navbar, Table } from 'react-bootstrap';

class BoardingPass extends Component {
    render() {
        const { passengerName, from, to, date, time, flight, seat, gate, boardTill } = this.props;

        return (
            <Container>
                <Navbar>
                    <Navbar.Brand><h5>Ticket</h5></Navbar.Brand>
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
                                    <th>Passenger Name: {passengerName}</th>
                                    <th>Date: {date}</th>
                                    <th>Time: {time}</th>
                                </tr>
                                <tr>
                                    <th>From: {from}</th>
                                    <th>Flight: {flight}</th>
                                    <th>Seat: {seat}</th>
                                </tr>
                                <tr>
                                    <th>To: {to}</th>
                                    <th>Gate: {gate}</th>
                                    <th>Boarding Till: {boardTill}</th>
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
                                        Passanger Name: {passengerName}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>
                                        From: {from}
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={3}>
                                        To: {to}
                                    </th>
                                </tr>
                                <tr>
                                    <th>Date: {date}</th>
                                    <th>Time: {time}</th>
                                    <th>Flight: {flight}</th>
                                </tr>
                                <tr>
                                    <th>Seat: {seat}</th>
                                    <th colSpan={2}>Gate: {gate}</th>
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