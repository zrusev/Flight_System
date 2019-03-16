import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import AdminService from '../../services/AdminService';
import { Container, Row, Col, Button } from 'react-bootstrap';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            selectedOption: null,
            redirectTo: false
        }

        this.handleClick.bind(this);
    }

    static service = new AdminService();

    handleClick = () => {
        const { value: userId } = this.state.selectedOption;

        Users.service.removeUser(userId)
            .then((result) => {
                if (!result.success) {
                    let errors = '';
                    if (result.message) {
                        errors = result.message
                    }

                    if (result.errors) {
                        errors = Object.values(result.errors).join('');
                    }

                    throw new Error(errors);
                }

                this.setState({
                    redirectTo: true
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleChange = (selectedOption) => {
        this.setState({
            selectedOption
        });
        console.log(`Option selected:`, selectedOption);
    }

    async componentWillMount() {
        try {
            const result = await Users.service.getUsers();

            if (!result.success) {
                let errors = '';
                if (result.message) {
                    errors = result.message
                }

                if (result.errors) {
                    errors = Object.values(result.errors).join('');
                }

                throw new Error(errors);
            }

            this.setState({
                users: result.users
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if(this.state.redirectTo) {
            return <Redirect to='/' />
        }

        return (
            <Container>
                {
                    <Row>
                        <Col>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.users.map(u => ({ value: u._id, label: u.email }))}
                            />
                        </Col>
                        <Col>
                            <Button block>Edit</Button>
                        </Col>
                        <Col>
                            <Button block onClick={() => this.handleClick()}>Remove</Button>
                        </Col>
                    </Row>
                }
                <br />
            </Container>
        )
    }
}

export default Users;