import React from 'react';

export default class Request extends React.Component {
    constructor(props) {
        super(props);
        
        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
    }
    
    accept() {  
        this.props.accept({
            owner_id: this.props.owner_id, 
            borrower_id: this.props.borrower._id, 
            book_id: this.props.book._id
        });
    }
    
    reject() {
        this.props.reject({
            owner_id: this.props.owner_id, 
            borrower_id: this.props.borrower._id, 
            book_id: this.props.book._id
        });
    }
    
    render() {
        const actions = this.props.status === 'Accepted' 
            ? <p>{`Due: ${new Date(this.props.due)}`}</p>
            : (
                <div>
                    <span onClick={this.accept}>
                        {`  Accept  `}<i className="fa fa-check fa-2x" style={{color: 'green'}} />
                    </span>
                    <span onClick={this.reject}>
                        {`  Reject  `}<i className="fa fa-close fa-2x" style={{color: 'red'}} />
                    </span>
                </div>
            );
        
        return (
            <div className ="col-xs-12 reqs bg-info">
                <img className="img-responsive  col-xs-1 pull-left" src={this.props.book.cover} alt={this.props.book.title} />
                <div className="col-xs-11 pull-right">
                    <div className="col-xs-8 pull-left">
                        <span>
                            <i className="fa fa-share fa-2x" style={{color: '#888'}} /> 
                            <strong>{` ${this.props.borrower.local.fullName} `}</strong>
                            {` would like to borrow your copy of ${this.props.book.title}. `}
                        </span>
                    </div>
                    <div className="col-xs-4">
                        {actions}
                    </div>
                </div>
            </div>
        );
    }
}

