import React from 'react';

export default class NewPasswordForm extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: ''
        };

        this.input = this.input.bind(this);
        this.change = this.change.bind(this);
    }
    
    change() {
        const obj = {};
        obj.oldPassword = this.state.oldPassword;
        obj.newPassword = this.state.newPassword;
        
        this.props.change(obj);
        
        this.setState({
            oldPassword: '',
            newPassword: ''
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
        return (
            <form>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Current Password" 
                        name="oldPassword"
                        value={this.state.oldPassword}
                        onChange={this.input}/>
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="New Password" 
                        name="newPassword"
                        value={this.state.newPassword}
                        onChange={this.input}/>
                </div>
                <span className="btn btn-danger" onClick={this.change}>Change</span>
            </form>
        );
    }
}
