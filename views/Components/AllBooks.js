import React from 'react';
import Book from './Book';

const AllBooks = (props) => {
    let books = props.books.map((b, i) => {
        let mine = props.user._id == b.owner ? true : false;
        return <Book key={i} {...b} mine={mine} request={props.request}/>;
    });
    return (
        <div className="wrapper">
            <div className="tableau">
                {books}
            </div>
        </div>
    );
};

export default AllBooks;
