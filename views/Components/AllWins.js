import React from 'react';
import Win from './Win';

const AllWins = (props) => {
    let wins = props.wins.map((b, i) => {
        let mine = props.user._id === b.owner._id;
        let del = mine ? props.del : null;
        return <Win key={i} {...b} mine={mine} inc={props.inc} del={del}/>;
    });
    return (
        <div className="container">
            <div className="wrapper">
                <div className="tableau">
                    {wins}
                </div>
            </div>
        </div>
    );
};

export default AllWins;
