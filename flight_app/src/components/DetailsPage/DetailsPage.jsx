import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {} from 'react-bootstrap/ModalHeader';

class DetailsPage extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      if(nextProps.flight.flight === null) {
        return false;
      }
      return true;      
    }

    render() {
        return (
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
              </Modal.Title>
            </Modal.Header>            
            <Modal.Body>
              {
                this.props.show 
                ?  
                  <>
                  <h4>Centered Modal</h4>
                   <p>{this.props.flight.flight.id}</p>
                   <p>{this.props.flight.flight.flightName}</p>
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