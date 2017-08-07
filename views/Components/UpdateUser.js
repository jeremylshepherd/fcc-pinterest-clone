import React from 'react';
import UpdateUserForm from './UpdateUserForm';

const UpdateUser = (props) => {
    return (
        <div className="container">
            <h2>Update Your Information:</h2>
            <hr />
            <UpdateUserForm update={props.update}/>
        </div>
    );
};

export default UpdateUser;
