import React from 'react';
import Jumbotron from './Jumbotron';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron displayName={this.props.displayName}/>
            </div>
        );
    }
}
