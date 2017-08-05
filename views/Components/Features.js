import React from 'react';
import { Link } from 'react-router';

const Features = (props) => {
    return (
        <div className="container">
            <h1 className="text-center">Features:</h1>
            <ul className="list-group-horizontal">
                <li className="list-group-item col-xs-6"><Link to="/dashboard" >Catalogue your books</Link></li>
                <li className="list-group-item col-xs-6"><Link to="/settings" >Update your personal information</Link></li>
                <li className="list-group-item col-xs-6"><Link to="/all" >See books from all users</Link></li>
                <li className="list-group-item col-xs-6"><Link to="/dashboard" >Easily manage books and requests from the Dashboard!</Link></li>
            </ul>
        </div>
    );
};

export default Features;
