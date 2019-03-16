import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import BoardingPass from '../BoardingPass/BoardingPass';
import Cart from '../Cart/Cart';
import { Container, Row, Col } from 'react-bootstrap';
import { UserConsumer } from '../contexts/UserContext';
import FlightService from '../../services/FlightService';

class CheckOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: '',
            flightId: '', 
            flightName: '',
            seats: []
        }
    }

    static service = new FlightService();

    checkout = async (event) => {
        event.preventDefault();

        const result = await CheckOut.service.postTicket(this.state); 
        console.log(result);

        this.props.location.flight = null;
        this.setState({
            userId: '',
            flightId: '', 
            flightName: '',
            seats: []
        });       
    }

    componentWillMount() {
        if (this.props.location.flight) {            
            const { id, flightName } = this.props.location.flight;
            const userId = this.props.userId;
            
            this.setState({
                seats: Object.values(this.props.location.seats),
                flightId: id, 
                flightName: flightName,
                userId
            })
        }
    }

    render() {
        if (!this.props.location.flight) {
            return <Redirect to='/' />
        }

        const { full_name } = this.props;
        
        return (
            <div>
                <h1>CHECKOUT</h1>
                <Container fluid>
                    <Row>
                        <Col md={10}>
                            {
                                this.state.seats.map((seat, ind) => 
                                    <BoardingPass 
                                        key={`${seat}-${ind}`} 
                                        {...this.props.location.flight} 
                                        full_name={full_name} 
                                        seat={seat} 
                                        number={ind + 1} />
                                )
                            }
                        </Col>
                        <Col md={2}>
                            <Cart 
                                flight={this.props.location.flight} 
                                handleClick={this.checkout.bind(this)} 
                                message='Checkout' />
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
                ({id, full_name}) => (
                    <CheckOut {...props} userId={id} full_name={full_name} />
                )
            }
        </UserConsumer>
    )
}

export default CheckOutWithContext;