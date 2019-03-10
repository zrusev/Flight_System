import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Flight from '../Flight/Flight';
import loadingBar from '../../style/loadingBar.gif';

class HomePage extends Component {
  render() {
    const { arrivals, departures, pageLoader } = this.props;

    if (!arrivals.flights && !departures.flights) {
      return <img src={loadingBar} alt="loadingBar"/>
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
          {
            <Flight flights={arrivals.flights} pageLoader={pageLoader} pagination={arrivals.pagination} />
          }
          </Col>
          <Col offset={3} sm={6}>
          {
            <Flight flights={departures.flights} pageLoader={pageLoader} pagination={departures.pagination} />
          }            
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HomePage;