import React from 'react';
import Login from './Login';
import Logout from './Logout';

const Nav = (props) => {
    let auth = props.auth ? <Logout {...props} /> : <Login />;
    return (
        <nav className="navbar navbar-light bg-faded">
            <div className="container">
                <span className="navbar-brand">
                    <a href="/" className="no-link">
                        <i className="fa fa-trophy" aria-hidden="true"></i>
                        {`  `}<i>WIN</i>{`terest`}
                    </a>
                </span>
                <ul className="nav navbar-nav">
                    <li><a href="/" alt="home">Home</a></li>
                    <li><a href={`/${props.username}`} alt="home">My Wall</a></li>
                    <li><a href="#" data-toggle="modal" data-target="#addWinForm">Add Win</a></li>
                </ul>
                <button type="button" className="navbar-toggler" data-toggle="collapse"
                    data-target="#winclub-menu"> <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span
                        className="icon-bar"></span> <span className="icon-bar"></span>
                </button>
                { auth }
            </div>
        </nav>
    );
};
export default Nav;
