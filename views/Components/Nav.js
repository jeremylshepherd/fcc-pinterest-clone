import React from "react";

const Nav = (props) => {
    return (
        <nav className="navbar navbar-inverse">
          <div className="container">
            <span className="navbar-brand">
                React Universal Template
            </span>
            <a href="/logout" className="btn btn-danger navbar-btn navbar-right"><span className="fa fa-eject"/> logout</a>
          </div>
        </nav>
    );
}
export default Nav;