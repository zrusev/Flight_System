import React, { Component } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';

class Cart extends Component {
    render() {
        const { flightName, destinationName, scheduleTime, terminal, gate } = this.props.flight;

        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://image.freepik.com/free-vector/airplane-flying-leave-blue-dashed-trace_1270-169.jpg" />
                <Card.Body>
                    <Card.Title>Schiphol Airport</Card.Title>
                    <Card.Text>
                        Your current destination:
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Flight Name: <b>{flightName || 'TBA'}</b></ListGroupItem>
                    <ListGroupItem>Destination Name: <b>{destinationName || 'TBA'}</b></ListGroupItem>
                    <ListGroupItem>Schedule Time: <b>{scheduleTime || 'TBA'}</b></ListGroupItem>
                    <ListGroupItem>Terminal: <b>{terminal || 'TBA'}</b></ListGroupItem>
                    <ListGroupItem>Gate: <b>{gate || 'TBA'}</b></ListGroupItem>
                </ListGroup>
                <Card.Body>
                    <Button variant="primary" onClick={this.props.handleClick}>Proceed to Checkout</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Cart;