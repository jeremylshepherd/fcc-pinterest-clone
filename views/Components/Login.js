import React from 'react';
import { Link } from 'react-router';

const Login = (props) => {
    return (
        <div className="collapse navbar-collapse" id="bookclub-menu">
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/login" className="navbar-right" data-target="#loginForm">Login</Link></li>
                <li><Link to="/signup" className="navbar-right" data-target="#registerForm">Register</Link></li>
            </ul>
        </div>
    );
};

export default Login;
