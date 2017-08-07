import React from 'react';

const Logout = (props) => {
    return (
        <div>
            <ul className="nav navbar-nav navbar-right">
                <li className="hidden-xs hidden-sm"><img src={props.avatar} className="img-rounded profile-image"/></li>
                <li><span className="navbar-text col-xs-12">{props.displayName}</span></li>
                <li><a href="/logout"><span className="fa fa-sign-out"/></a></li>
            </ul>
        </div>
    );
};

export default Logout;
