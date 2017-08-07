import React from 'react';

export default class UpdateUserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            selectedBook: '',
            fullName: '',
            city: '',
            state: '',
            zip: ''
        };

        this.input = this.input.bind(this);
        this.update = this.update.bind(this);
    }

    update() {
        const obj = {};
        obj.fullName = this.state.fullName;
        obj.city = this.state.city;
        obj.state = this.state.state;
        obj.zip = this.state.zip;

        this.props.update(obj);

        this.setState({
            results: [],
            selectedBook: '',
            fullName: '',
            city: '',
            state: '',
            zip: ''
        });
    }

    input(e) {
        const t = e.target;
        const name = t.name;
        const value = t.value;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <form>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        name="fullName"
                        value={this.state.fullName}
                        onChange={this.input}/>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        name="city"
                        value={this.state.city}
                        onChange={this.input}/>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="State"
                        name="state"
                        value={this.state.state}
                        onChange={this.input}/>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Zip Code"
                        name="zip"
                        value={this.state.zip}
                        onChange={this.input}/>
                </div>
                <span className="btn btn-danger" onClick={this.update}>Update</span>
            </form>
        );
    }
}
