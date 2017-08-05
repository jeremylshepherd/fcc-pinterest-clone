import React from 'react';
import Features from './Features';
import Jumbotron from './Jumbotron';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron displayName={this.props.displayName}/>
                <Features />
            </div>
        );
    }
}
