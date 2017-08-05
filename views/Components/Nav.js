import React from 'react';
import Login from './Login';
import Logout from './Logout';
import { Link } from 'react-router';

const Nav = (props) => {
    let auth = props.auth ? <Logout {...props} /> : <Login />;
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <span className="navbar-brand">
                    <a href="/" className="no-link">
                        <i className="fa fa-book" aria-hidden="true"/>
                        BookClub
                    </a>
                </span>
                <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target="#bookclub-menu"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                { auth }
            </div>
        </nav>
    );
};
export default Nav;
