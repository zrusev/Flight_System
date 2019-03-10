import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Flight from '../Flight/Flight';

class HomePage extends Component {
  render() {
    const { flights } = this.props;

    if (!flights) {
      return <h1>No movies at the moment</h1>
    }

    return (
      <Container>
        <Row>
          <Col offset={3} sm={6}>
            <h5>ARRIVALS</h5>
          </Col>
          <Col offset={3} sm={6}>
            <h5>DEPARTURES</h5>            
          </Col>
        </Row>
        <Row>
          <Col offset={3} sm={6}>
            <Flight flights={flights} />
          </Col>
          <Col offset={3} sm={6}>
            <Flight flights={flights} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;