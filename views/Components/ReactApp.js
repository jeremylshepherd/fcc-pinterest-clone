import React from 'react';
import Nav from './Nav';
import Flash from './Flash';
import $ from 'jquery';

class ReactApp extends React.Component {
    constructor() {
        super();

        this.state = {
            user: {},
            displayName: '',
            auth: false,
            flash: null,
            books: [],
            searchResult: {},
            userRequests: [],
            userTrades: [],
            userBooks: []
        };
        
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.updatePass = this.updatePass.bind(this);
        this.getBooks = this.getBooks.bind(this);
        this.addBook = this.addBook.bind(this);
        this.clearFlash = this.clearFlash.bind(this);
        this.request = this.request.bind(this);
        this.approve = this.approve.bind(this);
        this.reject = this.reject.bind(this);
        this.ack = this.ack.bind(this);
        this.ret = this.ret.bind(this);
    }

    getUser() {
        $.ajax({
            url: '/api/me',
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({
                    user: {
                        local: data.local,
                        books: data.books,
                        loans: data.loans,
                        requests: data.requests,
                        trades: data.trades,
                        _id: data._id
                    },
                    userRequests: data.requests,
                    userTrades: data.trades,
                    userBooks: data.books,
                    displayName: data.local.userName,
                    auth: true
                });
            },
            error: (xhr, status, err) => {
                console.error('/api/me', status, err.toString());
            }
        });
    }
    
    updateUser(obj) {
        console.log('Method invoked');
        $.ajax({
            url: '/user/update',
            data: obj,
            method: 'POST',
            success: data => {
                this.setState({flash: data.flash});
                this.getUser();
            },
            error: (xhr, status, err) => {
                console.error('/user/update', status, err.toString());
            }
        });
    }
    
    updatePass(obj) {
        $.ajax({
            url: '/user/change',
            data: obj,
            method: 'POST',
            success: data => {
                this.setState({flash: data.flash});
                this.getUser();
            },
            error: (xhr, status, err) => {
                console.error('/user/change', status, err.toString());
            }
        });
    }

    getBooks() {
        $.ajax({
            url: '/api/books',
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({
                    books: data
                });
            },
            error: (xhr, status, err) => {
                console.error('/api/books', status, err.toString());
            }
        });
    }

    addBook(obj) {
        $.ajax({
            url: `/api/addBook`,
            data: obj,
            method: 'POST',
            success: data => {
                this.setState({
                    flash: data.flash
                });
                this.getBooks();
                this.getUser();
            },
            error: (xhr, status, err) => {
                console.error('/api/add', status, err.toString());
            }
        });
    }
    
    request(obj) {
        $.ajax({
            url: '/api/book/request',
            data: obj,
            method: 'POST',
            success: data => {
                this.setState({
                    flash: data.flash
                });
            },
            error: (xhr, status, err) => {
                console.log('/api/book/request', status, err.toString());
            }
        });
    }
    
    approve(obj) {
        $.ajax({
            url: '/api/request/accept',
            method: 'POST',
            data: obj,
            success: data => {
                this.setState({
                    flash: data.flash
                });
                this.getUser();
            },
            error: (xhr, status, err) => {
                console.log('/api/request/accept', status, err.toString());
            }
        });
    }
    
    reject(obj) {
        $.ajax({
            url: '/api/request/reject',
            method: 'POST',
            data: obj,
            success: data => {
                this.setState({
                    flash: data.flash
                });
                this.getUser();
            },
            error: (xhr, status, err) => {
                console.log('/api/request/reject', status, err.toString());
            }
        });
    }
    
    ack(obj) {
        $.ajax({
            url: '/api/request/ack',
            method: 'POST',
            data: obj,
            success: data => {
                this.setState({
                    flash: data.flash
                });
                this.getUser();
            },
            error: (xhr, status, err) => {
                console.log('/api/request/ack', status, err.toString());
            }
        });
    }
    
    ret(obj) {
        $.ajax({
            url: '/api/request/ret',
            method: 'POST',
            data: obj,
            success: data => {
                this.setState({
                    flash: data.flash
                });
                this.getUser();
            },
            error: (xhr, status, err) => {
                console.log('/api/request/ret', status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.getUser();
        this.getBooks();
        if(this.state.flash !== null) {
            this.clearFlash();
        }
    }

    componentDidUpdate() {
        if(this.state.flash !== null) {
            this.clearFlash();
        }
    }

    clearFlash() {
        setTimeout(() => {
            console.log('timer activated');
            this.setState({flash: null});
        }, 5000);
    }

    render() {
        const props = {
            ...this.state, 
            request: this.request,
            accept: this.approve,
            reject: this.reject,
            add: this.addBook,
            update: this.updateUser,
            change: this.updatePass,
            ack: this.ack,
            ret: this.ret
        };
        const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props)
        );
        const flash = this.state.flash !== null ? <Flash {...this.state.flash}/> : '';
        return (
            <div>
                {flash}
                <Nav auth={this.state.auth} displayName={this.state.displayName}/>
                {childrenWithProps}
            </div>
        );
    }
}

export default ReactApp;
