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
                    <h1><i>WIN</i>terest</h1>
                </div>
            </div>

        );
    }
};
