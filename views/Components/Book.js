import React from 'react';

export default class Book extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDesc: false
        };

        this.request = this.request.bind(this);
        this.add = this.add.bind(this);
    }

    request() {
        let obj = {};
        obj._id = this.props._id;
        obj.owner = this.props.owner;
        this.props.request(obj);
    }
    
    add() {
        let ISBN;
        for(let i = 0; i < this.props.ISBN; i++) {
            if(this.props.ISBN[i].type === "ISBN_10") {
                ISBN = [{format: "ISBN_10", identifier: this.props.ISBN[i].identifier}];
            }
        }
        const data = {};
        data.title = this.props.title;
        data.author = this.props.author;
        data.cover = this.props.cover;
        data.description = this.props.description;
        data.ISBN = ISBN;
        this.props.add(data);
    }

    render() {
        let addButton = <span className="btn btn-primary btn-block" onClick={this.add}>Add</span>;
        let reqButton = <span className="btn btn-primary btn-block" onClick={this.request}>Request</span>;
        let outButton = <span className="btn btn-primary btn-block disabled" >{`Due ${new Date(this.props.due).toLocaleDateString('en-US')}`}</span>;
        let button = this.props.mine ? null : this.props.add 
            ? addButton
            : this.props.status === 'Available'
            ? reqButton
            : outButton;
        let cover = this.props.cover ? this.props.cover : "https://raw.githubusercontent.com/jeremylshepherd/jeremylshepherd.github.io/master/assets/no_cover.jpg";
        return (
            <div className="card">
                <img src={cover} alt={this.props.title} />
                <div className="btn-block">
                    {button}
                </div>
            </div>
        );
    }
}