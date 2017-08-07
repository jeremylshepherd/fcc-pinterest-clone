import React from 'react';

export default class AddWinModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            img: '',
            title: ''
        };

        this.handleInput = this.handleInput.bind(this);
        this.addWin = this.addWin.bind(this);
    }

    handleInput(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
    }

    addWin() {
        const win = {};
        win.img = this.state.img;
        win.title = this.state.title;
        this.props.add(win);
        this.setState({
            img: '',
            title: ''
        });
    }

    render() {
        let img = this.state.img ? <img className="img-responsive" src={this.state.img} /> : null;
        return (
            <div className="modal fade" id="addWinForm">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="text-primary text-center">AddWin</span>
                            <span className="glyphicon glyphicon-remove pull-right" data-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                            <div>
                                {img}
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" id="inputImage" placeholder="Image" name="img" value={this.state.img}onChange={this.handleInput}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <input type="text" className="form-control" id="inputTitle" placeholder="Title" name="title" value={this.state.title} onChange={this.handleInput}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <button type="button" className="btn btn-primary" onClick={this.addWin} data-dismiss="modal">Add Win</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
