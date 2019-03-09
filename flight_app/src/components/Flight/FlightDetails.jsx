import React, { Component } from 'react';

class FlightDetails extends Component {
    render() {
        const { time, to, flight, terminal, status } = this.props.details;
        
        return (
            <>
                <div>                  
                  {flight}
                  <br />
                  To: {to}
                  <br />
                  {time} {terminal} {status}
                </div>
            </>
        )
    }
}

export default FlightDetails;