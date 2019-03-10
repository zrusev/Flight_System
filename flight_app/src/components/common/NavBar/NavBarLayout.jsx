import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Schiphol Airport</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">FLIGHT INFORMATION</Nav.Link>
                    <Nav.Link href="#pricing">SIGN UP</Nav.Link>
                    <Nav.Link href="#pricing">LOGIN</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search flight</Button>
                </Form>
            </Navbar>
        )
    }
}

export default NavBar;