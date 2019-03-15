import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import AvailableList from './AvailableList';
import ReservedList from './ReservedList';
import SelectedList from './SelectedList';
import Cart from '../Cart/Cart';

class DrawGrid extends Component {
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={10}>
                        <Row>
                            <Col md={4}>
                                <Row>
                                    <ReservedList reserved={this.props.reserved} />
                                </Row>
                                <Row>
                                    <AvailableList available={this.props.available} />
                                </Row>
                            </Col>
                            <Col md={4}>
                                <Table className="grid">
                                    <thead>
                                        <tr>
                                            <th>
                                                <b>Business Class</b>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {this.props.seat.map((row, ind) =>
                                                <td className={this.props.reserved.indexOf(row) > -1 ? 'reserved' : 'available'}
                                                    key={`seat-${row}`}
                                                    onClick={e => this.onClickSeat(row)}>
                                                    {row} </td>
                                            )}
                                        </tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md={4}>
                                <Row>
                                    <SelectedList selected={this.props.selected} />
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={2}>
                        <Cart flight={this.props.flight} handleClick={this.props.handleClick} message='Proceed to Checkout' />
                    </Col>
                </Row>
            </Container>
        )
    }

    onClickSeat(seat) {
        this.props.onClickData(seat);
    }
}

export default DrawGrid;