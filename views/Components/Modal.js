import React from 'react';

const Modal = (props) => {
    let img = props.img ? <img className="img-responsive" src={props.img} /> : null;
    return (
        <div className="modal fade" id="addWinForm">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">AddWin</h4>
                        <span className="glyphicon glyphicon-remove pull-right" data-dismiss="modal" />
                    </div>
                    <div className="modal-body">
                        <div>
                            {img}
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" id="inputImage" placeholder="Image" name="img" onChange={this.handleInput}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <input type="text" className="form-control" id="inputTitle" placeholder="Title" name="title" onChange={this.handleInput}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-12">
                                        <button type="button" className="btn btn-primary" onClick={this.addWin}>Register</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
