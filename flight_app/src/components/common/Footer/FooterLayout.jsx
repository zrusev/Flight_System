import React, { Component } from 'react';

class FooterLayout extends Component {
    render() {
        return (
            <footer className="footer-copyright text-center py-3">
                <b>&copy; Flight System {(new Date().getFullYear())}</b>
            </footer>
        )
    }
}

export default FooterLayout;