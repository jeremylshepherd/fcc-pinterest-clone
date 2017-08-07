import React from 'react';
import Login from './Login';
import Logout from './Logout';

const Nav = (props) => {
    let auth = props.auth ? <Logout {...props} /> : <Login />;
    let nav = props.auth
        ? <ul className="nav navbar-nav">
            <li><a href="/" alt="home" className="col-xs-12">Home</a></li>
            <li><a href="/mywall" alt="home" className="col-xs-12">My Wall</a></li>
            <li><a href='#' data-toggle="modal" data-target="#addWinForm" className="col-xs-12">Add Win</a></li>
        </ul>
        : <ul className="nav navbar-nav">
            <li><a href="/" alt="home" className="col-xs-12">Home</a></li>
        </ul>;
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <div className="navbar-header">
                    <span className="navbar-brand">
                        <a href="/" className="no-link">
                            <i className="fa fa-trophy" aria-hidden="true"></i>
                            {`  `}<i>WIN</i>{`terest`}
                        </a>
                    </span>
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#winclub-menu"
                        aria-expanded="false"
                        aria-controls="navbar">

                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" id="winclub-menu">
                    { nav }
                    { auth }
                </div>
            </div>
        </nav>
    );
};
export default Nav;
