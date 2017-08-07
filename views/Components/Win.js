import React from 'react';
import { Link } from 'react-router';

export default class Win extends React.Component {
    constructor(props) {
        super(props);

        this.incLove = this.incLove.bind(this);
        this.del = this.del.bind(this);
        this.useDummy = this.useDummy.bind(this);
    }

    incLove() {
        this.props.inc({win_id: this.props._id});
    }

    del() {
        this.props.del({win_id: this.props._id});
    }

    useDummy(e) {
        e.target.src = 'https://raw.githubusercontent.com/jeremylshepherd/jeremylshepherd.github.io/master/assets/Image_not_available.gif';
    }

    render() {
        let icon = this.props.mine
            ? <i className="fa fa-trash-o fa-2x card-items-center-flex" onClick={this.del}/>
            : null;
        let func = this.props.mine ? () => { console.log('Can\'t love yer owns'); } : this.incLove;
        return (
            <div className="grid-item card">
                <img onError={this.useDummy} className="card-hero" src={this.props.img} alt={this.props.title} />
                <div className="card-body">
                    <span className="lead card-title">{this.props.title}</span>
                    <div className="card-content">
                        <Link className="no-link" to={`/${this.props.owner.twitter.username}`}><img className="img-rounded card-items-center-flex" src={this.props.owner.twitter.avatar}/></Link>
                        {icon}
                        <div className="card-items-center-flex">
                            <i className="fa fa-heart" onClick={func}/>
                            <span style={{marginLeft: 10}}>{` ${this.props.loves}`}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
