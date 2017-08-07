import React from 'react';

export default class BSWin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDesc: false
        };

        this.incLove = this.incLove.bind(this);
    }

    incLove() {
        this.props.inc(this.props._id);
    }

    render() {
        return (
            <div className="card" style={{width: '20rem'}}>
                <img className="card-img-top img-fluid" src={this.props.img} alt={this.props.title}/>
                <div className="card-block">
                    <h4 className="card-title">{this.props.title}</h4>
                    <div className="col-xs-6 pull-left">
                        <img className="card-img" src={this.props.owner.twitter.avatar}/>
                    </div>
                    <div className="col-xs-6">
                        <i className="fa fa-heart" onClick={this.incLove}>{` ${this.props.loves}`}</i>
                    </div>
                </div>
            </div>
        );
    }
}
