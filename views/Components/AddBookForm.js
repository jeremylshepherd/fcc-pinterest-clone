import React from 'react';
import Book from './Book';
import $ from 'jquery';

export default class AddBookForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            book: ''
        };

        this.find = this.find.bind(this);
        this.input = this.input.bind(this);
    }

    find() {
        $.ajax({
            url: `/api/book/${this.state.book}`,
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({
                    results: data
                });
                this.setState({book: ''});
            },
            error: (xhr, status, err) => {
                console.error(`/api/book/${this.state.book}`, status, err.toString());
            }
        });
    }
    
    input(e) {
        const t = e.target;
        const name = t.name;
        const value = t.value;
        
        this.setState({
            [name] : value
        });
    }

    render() {
        let books = this.state.results.length <= 0 ? null : this.state.results.map((b, i) => {
            return <Book {...b} key={i} add={this.props.add}/>;
        });
        return (
            <div>
                <div className="container">
                    <h2>Add a book:</h2>
                    <hr/>
                    <form>
                        <div className="form-group">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Find your book." 
                                    name="book" 
                                    value={this.state.book}
                                    onChange={this.input}/>
                                <span className="input-group-addon bg-danger" onClick={this.find}>Find</span>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex-container">
                    {books}
                </div>
            </div>
        );
    }
}
