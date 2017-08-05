import React from 'react';
import Book from './Book';
import Request from './Request';
import Trade from './Trade';
import AddBookForm from './AddBookForm';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let books = this.props.userBooks.map((b, i) => {
            return <Book key={i} {...b} mine={true}/>;
        });
       
        let requests = this.props.userRequests.length !== 0 ? 
            this.props.userRequests.map((r, i) => {
                return <Request 
                            key={i} 
                            {...r}
                            owner_id={this.props.user._id}
                            accept={this.props.accept} 
                            reject={this.props.reject}/>;
            }):
            <h3 className="text-primary">No requests</h3>;
            
        let trades = this.props.userTrades.length !== 0 ? 
            this.props.userTrades.map((r, i) => {
                return <Trade 
                            key={i} 
                            {...r}
                            ack={this.props.ack} 
                            ret={this.props.ret}/>;
            }):
            <h3 className="text-primary">No trades</h3>;
            
        return (
            <div>
                <div>
                    <h1 className="text-center"><i className="fa fa-dashboard fa-2x"></i> Dashboard</h1>
                    <div className="container">
                        <h2>Trades & Requests:</h2>
                        <hr />
                    </div>
                    <div className="container" >
                        <div className="col-xs-6 pull-left">{requests}</div>
                        <div className="col-xs-6">{trades}</div>
                    </div>
                </div><br />
                <AddBookForm add={this.props.add}/>
                <div className="container">
                    <h2>My Books:</h2>
                    <hr />
                </div>
                <div className="flex-container">
                    {books}
                </div>
            </div>
        );
    }
}
