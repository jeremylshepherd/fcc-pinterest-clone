import React from 'react';

export default class Trade extends React.Component {
    constructor(props) {
        super(props);
        
        this.ack = this.ack.bind(this);
        this.ret = this.ret.bind(this);
    }
    
    ack() {
        const obj = {owner_id: this.props.owner._id, book_id: this.props.book._id};
        this.props.ack(obj);
    }
    
    ret() {
        const obj = {owner_id: this.props.owner._id, book_id: this.props.book._id};
        this.props.ret(obj);
    }
    
    render() {
        const decision = this.props.status === 'Accepted' 
            ? 'approved' : this.props.status === 'Pending'
            ? 'not decided' :'declined';
        const icon = this.props.status === 'Accepted' 
            ? 'fa fa-reply fa-2x' : this.props.status === 'Pending' 
            ? 'fa fa-spinner fa-2x fa-spin' : 'fa fa-frown-o fa-2x';
        const func = this.props.status === 'Accepted' ? this.ret :this.props.status === 'Pending' ? null : this.ack;
        const funcName = this.props.status === 'Accepted' 
            ? 'Return' : this.props.status === 'Pending' 
            ? 'Waiting' : 'Acknowledge';
        const style = this.props.status === 'Accepted' 
            ? {color: 'green'} : this.props.status === 'Pending' 
            ? {color: 'lightblue'} : {color: 'red'};
            
        const due = this.props.status === 'Accepted' 
            ? ` and is due ${new Date(this.props.due)} `
            : '';
        
        return (
            <div className ="col-xs-12 reqs bg-success">
                <img className="img-responsive  col-xs-1 pull-left" src={this.props.book.cover} alt={this.props.book.title} />
                <div className="col-xs-11 pull-right">
                    <div className="col-xs-8 pull-left">
                        <span>
                            <i className="fa fa-share fa-2x" style={{color: '#888'}} /> 
                            <strong>{` ${this.props.owner.local.fullName} `}</strong>
                            {` has ${decision} your request to borrow ${this.props.book.title} ${due}`}
                        </span>
                    </div>
                    <div className="col-xs-4">
                        <span onClick={func}>
                            {`  ${funcName}  `}<i className={icon} style={style} />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

