import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class About extends Component {
    static defaultProps = {
        center: {
            lat: 52.3105,
            lng: 4.7683
        },
        zoom: 11
    };

    render() {
        return (
            <Container>
                <h1>Find us here</h1>
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'YOUR API KEY' }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                    >
                        <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="Schiphol Airport"
                        />
                    </GoogleMapReact>
                </div>
            </Container>
        );
    }
}

export default About;