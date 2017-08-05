import React from 'react';
import { Link } from 'react-router';

const Logout = (props) => {
    return (
        <div className="collapse navbar-collapse" id="bookclub-menu">
            <ul className="nav navbar-nav navbar-right">
                <li><span className="navbar-text">{props.displayName}</span></li>
                <li><Link to="/" className="nav nav-link">Home</Link></li>
                <li ><Link href="/all" >All Books</Link></li>
                <li ><Link href="/dashboard" >Dashboard</Link></li>
                <li ><Link href="/settings"><span className="fa fa-cogs"/></Link></li>
                <li ><a href="/logout" ><span className="fa fa-sign-out"/></a></li>
            </ul>
        </div>
    );
};

export default Logout;
