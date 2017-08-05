import React from 'react';
import UpdateUserForm from './UpdateUserForm';
import NewPasswordForm from './NewPasswordForm';

const UpdateUser = (props) => {
    return (
        <div className="container">
            <h2>Update Your Information:</h2>
            <hr />
            <UpdateUserForm update={props.update}/>
            <h2>Change Your Password:</h2>
            <hr />
            <NewPasswordForm change={props.change}/>
        </div>
    );
};

export default UpdateUser;
