import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class NavBarLayout extends Component {
    render() {
        return (
            <header>
                <link rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                    integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                    crossOrigin="anonymous"
                />
                <Navbar bg="dark" variant="dark">
                    <NavLink to='/'><Navbar.Brand>Schiphol Airport</Navbar.Brand></NavLink>
                    <Nav className="mr-auto">
                        <Navbar.Text><NavLink to='/'>INFORMATION</NavLink></Navbar.Text>
                        <Navbar.Text><NavLink to='/signup'>SIGN UP</NavLink></Navbar.Text>
                        <Navbar.Text><NavLink to='/signin'>LOGIN</NavLink></Navbar.Text>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search flight</Button>
                    </Form>
                </Navbar>
                <br />
            </header>
        )
    }
}

export default NavBarLayout;