import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BoardingPass from '../BoardingPass/BoardingPass';
import Cart from '../Cart/Cart';
import { Container, Row, Col } from 'react-bootstrap';
import { UserConsumer } from '../contexts/UserContext';

class CheckOut extends Component {
    checkout = (event) => {
        event.preventDefault();
    }

    render() {
        if (!this.props.location.flight) {
            return <Redirect to='/' />
        }

        const { full_name } = this.props;
        const seats = Object.values(this.props.location.seats);
        
        return (
            <div>
                <h1>CHECKOUT</h1>
                <Container fluid>
                    <Row>
                        <Col md={10}>
                            {
                                seats.map((seat, ind) => 
                                    <BoardingPass key={`${seat}-${ind}`} {...this.props.location.flight} full_name={full_name} seat={seat} number={ind + 1} />
                                )
                            }
                        </Col>
                        <Col md={2}>
                            <Cart flight={this.props.location.flight} handleClick={this.checkout.bind(this)} message='Checkout' />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const CheckOutWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({full_name}) => (
                    <CheckOut {...props} full_name={full_name} />
                )
            }
        </UserConsumer>
    )
}

export default CheckOutWithContext;