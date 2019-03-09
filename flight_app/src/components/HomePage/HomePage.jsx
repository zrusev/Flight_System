import React, { Component } from 'react';
import Flight from '../Flight/Flight';
import FlightDetails from '../Flight/FlightDetails';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap';

class HomePage extends Component {  
  render() {
    const flights = [
      {
        _id: 1,
        time: '12:30',
        to: 'SOF',
        flight: 'SF1231',
        terminal: 'T2',
        status: 'Departed'
      },
      {
        _id: 2,
        time: '12:32',
        to: 'SOF',
        flight: 'SF1231',
        terminal: 'T2',
        status: 'Departed'
      },
      {
        _id: 3,
        time: '12:33',
        to: 'MOS',
        flight: 'MS1231',
        terminal: 'T1',
        status: 'Boarding'
      }
    ]

    return (
      <>
        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
          <Row>
            <Col sm={4}>
              <ListGroup>
                {
                  flights.map(fl => (
                    <ListGroup.Item id={fl._id} action href={`#link${fl._id}`}>                  
                      <Flight details={fl} />
                    </ListGroup.Item>                
                  ))
                }
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                {
                  flights.map(fl => (
                    <Tab.Pane id={`tab-pane-id-${fl._id}`} eventKey={`#link${fl._id}`}>
                      <FlightDetails details={fl}/>
                    </Tab.Pane>
                  ))
                }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>;
      </>
    );
  }
}

export default HomePage;