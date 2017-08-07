import React from 'react';
import Win from './Win';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let wins = this.props.userWins.map((w, i) => {
            return <Win key={i} {...w} mine={true} del={this.props.del}/>;
        });

        return (
            <div className="container">
                <h1>My Wins:</h1>
                <hr/>
                <div className="wrapper">
                    <div className="tableau">
                        {wins}
                    </div>
                </div>
            </div>
        );
    }
}
