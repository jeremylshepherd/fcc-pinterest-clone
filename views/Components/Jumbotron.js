import React from 'react';

export default class Jumbotron extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="jumbotron hero">
                <div className="container text-center" >
                    <h1>Book Club</h1>
                    <h3>The first rule of book club is... you don't talk about book club.</h3>
                    <span className="center-block">
                        <i className="fa fa-3x fa-user-secret" aria-hidden="true"/>
                        <i className="fa fa-3x fa-book" aria-hidden="true"/>
                        <i className="fa fa-3x fa-book" aria-hidden="true"/>
                        <i className="fa fa-3x fa-book" aria-hidden="true"/>
                        <i className="fa fa-3x fa-user-secret" aria-hidden="true"/>
                    </span>
                </div>
            </div>

        );
    }
};
