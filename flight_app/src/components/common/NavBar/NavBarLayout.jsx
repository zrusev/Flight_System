import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { UserConsumer } from '../../contexts/UserContext';
import FlightSerice from '../../../services/FlightService';
import DetailsPage from '../../DetailsPage/DetailsPage';

class NavBarLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            flight: null,
            modalShow: false
        }
    }

    static service = new FlightSerice();

    modalClose = () => this.setState({ 
        modalShow: false
    });
    
    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const flight = await NavBarLayout.service.getFlightByName(this.state.searchValue);
            
            this.setState({
                flight,
                modalShow: true
            })
        } catch (error) {
            console.dir(error);            
        }
    }

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
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        {
                            isLoggedIn
                                ? <Navbar.Text>Signed in as: {full_name}</Navbar.Text>
                                : null
                        }                        
                    </Navbar.Collapse>
                    <Form inline onSubmit={this.handleSubmit}>
                        <FormControl 
                            type="text" 
                            placeholder="Search" 
                            className="mr-sm-2" 
                            name="searchValue" 
                            onChange={this.handleChange} />
                        <Button variant="outline-info" type="submit">Search flight</Button>
                    </Form>
                </Navbar>
                <br />
                <DetailsPage 
                    show={this.state.modalShow}
                    flight={this.state.flight}
                    onHide={this.modalClose.bind(this)}
                />
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