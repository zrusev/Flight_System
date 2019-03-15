import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { UserConsumer, defaultUserState } from '../../components/contexts/UserContext';

class Logout extends Component {
    constructor(props) {
        super(props);

        window.localStorage.removeItem('user');
        window.localStorage.removeItem('auth_token');
        props.updateUser(defaultUserState);
    }

    render() {
        return <Redirect to='/' />
    }
}

const LogoutWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({updateUser}) => (                    
                    <Logout {...props} updateUser={updateUser} />
                )   
            }
        </UserConsumer>
    )
}

export default LogoutWithContext;