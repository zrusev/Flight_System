import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { UserConsumer } from '../../contexts/UserContext';

class NavBarLayout extends Component {
    render() {
        const { isLoggedIn, full_name } = this.props;
        return (
            <header>
                <link rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
                    integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                    crossOrigin="anonymous"
                />
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Schiphol Airport</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Navbar.Text><NavLink to='/'>INFORMATION</NavLink></Navbar.Text>
                        {
                            !isLoggedIn
                                ? <Navbar.Text><NavLink to='/signup'>SIGN UP</NavLink></Navbar.Text>
                                : null
                        }
                        {
                            isLoggedIn 
                                ? <Navbar.Text><NavLink to='/logout'>LOG OUT</NavLink></Navbar.Text>
                                : <Navbar.Text><NavLink to='/login'>LOG IN</NavLink></Navbar.Text>
                        }
                        {
                            isLoggedIn
                                ? <span>`Hello, {full_name}`</span>
                                : null
                        }
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

const NavBarLayoutWithProps = (props) => {
    return (
        <UserConsumer>
            {
                ({isLoggedIn, full_name}) => (
                    <NavBarLayout 
                        {...props} 
                        isLoggedIn={isLoggedIn} 
                        full_name={full_name} 
                    />
                )
            }
        </UserConsumer>
    )
}

export default NavBarLayoutWithProps;