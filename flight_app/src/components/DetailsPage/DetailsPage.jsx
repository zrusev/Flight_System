import React, { Component } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { } from 'react-bootstrap/ModalHeader';
import { Container, Row, Col } from 'react-bootstrap';
const QRCode = require('qrcode.react');

class DetailsPage extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.flight === null) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            FLIGHT DETAILS
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            this.props.show
              ?
              <>
                <Container>
                  <Row>
                    <Col sm={6}>

                      <Table className="table table-borderless">
                        <tbody>
                          <tr className="d-flex">
                            <td className="col-6">
                              <p><b>Flight ID: </b> {!this.props.flight.flight.id ? 'TBA' : this.props.flight.flight.id}</p>
                              <p><b>Flight Name: </b> {!this.props.flight.flight.flightName ? 'TBA' : this.props.flight.flight.flightName}</p>
                              <p><b>Destination: </b> {!this.props.flight.flight.destinationName ? 'TBA' : this.props.flight.flight.destinationName}</p>
                              <p><b>Schedule Time: </b> {!this.props.flight.flight.scheduleTime ? 'TBA' : this.props.flight.flight.scheduleTime}</p>
                              <p><b>Terminal: </b> {!this.props.flight.flight.terminal ? 'TBA' : this.props.flight.flight.terminal}</p>
                              <p><b>Gate: </b> {!this.props.flight.flight.gate ? 'TBA' : this.props.flight.flight.gate}</p>
                              <p><b>Expected Time Gate Open: </b> {!this.props.flight.flight.expectedTimeGateOpen ? 'TBA' : this.props.flight.flight.expectedTimeGateOpen}</p>
                              <p><b>Expected Time Boarding: </b> {!this.props.flight.flight.expectedTimeBoarding ? 'TBA' : this.props.flight.flight.expectedTimeBoarding}</p>
                              <p><b>Expected Time Boarding: </b> {!this.props.flight.flight.expectedTimeBoarding ? 'TBA' : this.props.flight.flight.expectedTimeBoarding}</p>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                    <Col sm={6}>
                      {
                        !this.props.flight.flight.flightName
                          ? null
                          :
                          <>
                            <Row>
                                <p><b>MORE INFO</b></p>
                            </Row>
                            <Row>
                                <QRCode value={`https://www.schiphol.nl/en/arrivals/?search=${this.props.flight.flight.flightName}`} />
                            </Row>
                            <Row>
                                <br />
                                <p><b>OR</b></p>
                            </Row>
                            <Row>
                                <Button variant="primary" size="lg" block onClick={this.props.onHide}>BUY</Button>
                            </Row>
                          </>
                      }
                    </Col>
                  </Row>
                </Container>

              </>
              : null
          }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DetailsPage;