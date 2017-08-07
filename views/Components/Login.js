import React from 'react';

const Login = (props) => {
    return (
        <div>
            <ul className="nav navbar-nav navbar-right">
                <li><span className="navbar-text col-xs-12 text-center">Login or Register with:</span></li>
                <li><a href="/auth/twitter" className="twitter"><span className="fa fa-twitter" alt="twitter logo"></span> Twitter</a></li>
            </ul>
        </div>
    );
};

export default Login;
