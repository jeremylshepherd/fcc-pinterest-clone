import React from 'react';
import Win from './Win';

export default class UserWall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wins: [],
            displayName: ''
        };

        this.getPerson = this.getPerson.bind(this);
    }

    getPerson() {
        console.log(this.props.params.username);
        $.ajax({
            url: `/api/user/${this.props.params.username}`,
            dataType: 'json',
            success: data => {
                this.setState({
                    wins: data,
                    displayName: data[0].owner.twitter.displayName
                });
            },
            error: (xhr, status, err) => {
                console.log(`/api/user/${this.props.params.username}`, status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.getPerson();
    }

    render() {
        let wins = this.state.wins.map((w, i) => {
            return <Win key={i} {...w}/>;
        });

        return (
            <div className="container">
                <h1>{this.state.displayName}:</h1>
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
