import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserConsumer } from '../contexts/UserContext';

class AuthorizedRoute extends Component {
    render() {
        const { isLoggedIn, allowedRoles = [], roles = [], ...otherProps } = this.props;
        
        const inRole = (allowedRoles.length === 0) ||
            (roles
                .map(role => role.toLowerCase())
                .some(role => allowedRoles.includes(role)));
        
        if(!isLoggedIn || !inRole) {
            if(allowedRoles.length !== 0) {
                return <Redirect to="/login" />;
            }
        }

        return <Route {...otherProps} />;
    }
}

const AuthorizedRouteWithContext = (props) => {
    return (
        <UserConsumer>
            {
                ({ isLoggedIn, roles }) => (
                    <AuthorizedRoute 
                    {...props}
                    roles={roles}
                    isLoggedIn={isLoggedIn} />
                )
            }
        </UserConsumer>
    )
}


export {
    AuthorizedRoute
}
export default AuthorizedRouteWithContext;