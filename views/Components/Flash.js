import React from 'react';

const Flash = (props) => {
    return (
        <div className={`alert alert-${props.type} alert-dismissible text-center`} role="alert">
            <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close">
                <span aria-hidden="true">×</span>
            </button>
            <strong>{props.message}</strong>
        </div>
    );
};

export default Flash;
