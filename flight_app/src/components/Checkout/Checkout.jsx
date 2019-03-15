import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BoardingPass from '../BoardingPass/BoardingPass';
import Cart from '../Cart/Cart';
import { Container, Row, Col } from 'react-bootstrap';

class CheckOut extends Component {
    render() {
        if (!this.props.location.flight) {
            return <Redirect to='/' />
        }

        return (
            <Container fluid>
                <Row>
                    <Col md={10}>
                        <BoardingPass {...this.props.location.flight} />
                    </Col>
                    <Col md={2}>
                        <Cart flight={this.props.location.flight} />
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default CheckOut;