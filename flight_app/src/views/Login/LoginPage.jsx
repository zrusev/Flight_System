import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AuthenticationService from '../../services/AuthenticationService';
import { UserConsumer } from '../../components/contexts/UserContext';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    static service = new AuthenticationService();

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { updateUser } = this.props;
        const { email, password } = this.state;

        const credentials = { email, password }

        this.setState({
            error: ''
        }, async () => {
            try {
                const result = await Login.service.login(credentials);
                
                if (!result.success) {
                    let errors = '';
                    if(result.message) {
                        errors = result.message
                    }

                    if (result.errors) {                       
                        errors = Object.values(result.errors).join('');                        
                    }

                    throw new Error(errors);
                }

                window.localStorage.setItem('auth_token', result.token);
                window.localStorage.setItem('user', JSON.stringify({
                    ...result.user,
                    isLoggedIn: true,
                }));

                updateUser({
                    isLoggedIn: true,
                    updateUser,
                    ...result.user
                });
                
            } catch (error) {
                this.setState({
                    error: error.message
                })
            }
        });
    }

    render() {
        const { email, password, error } = this.state;
        const { isLoggedIn } = this.props;

        if (isLoggedIn) {
            return <Redirect to='/' />
        }

        return (
            <Container>
                {
                    error.length
                        ? <>
                            <Row>
                                <Col>
                                    Something went wrong: {error}
                                </Col>
                            </Row>
                        </>
                        : null
                }
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                    value={email}
                                    onChange={this.handleChange} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <br />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const LoginWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, updateUser }) => (
                    <Login 
                        {...props} 
                        isLoggedIn={isLoggedIn} 
                        updateUser={updateUser} />
                )
            }
        </UserConsumer>
    )
}

export default LoginWithContext;