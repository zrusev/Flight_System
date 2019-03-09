import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class Flight extends Component {
    render() {
        const { _id, time, to, flight, terminal, status } = this.props.details;
        
        return (
            <>
              <Card id={`card-id-${_id}`} style={{ width: '18rem' }}>
              <Card.Body>
                  <Card.Title>{flight}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">To: {to}</Card.Subtitle>
                  <Card.Text>
                      {time} {terminal} {status}
                  </Card.Text>
                  <Card.Link href="#">Card Link</Card.Link>
                  <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
              </Card>
            </>
        )
    }
}

export default Flight;