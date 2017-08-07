import React from 'react';
import Nav from './Nav';
import Modal from './AddWinModal';
import Flash from './Flash';
import $ from 'jquery';

class ReactApp extends React.Component {
    constructor() {
        super();

        this.state = {
            user: {},
            wins: [],
            userWins: [],
            displayName: '',
            username: '',
            avatar: '',
            auth: false,
            flash: null
        };

        this.getUser = this.getUser.bind(this);
        this.getWins = this.getWins.bind(this);
        this.addWin = this.addWin.bind(this);
        this.delWin = this.delWin.bind(this);
        this.love = this.love.bind(this);
        this.clearFlash = this.clearFlash.bind(this);
    }

    getUser() {
        $.ajax({
            url: '/api/me',
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({
                    user: {
                        twitter: data.twitter,
                        _id: data._id
                    },
                    userWins: data.wins,
                    avatar: data.twitter.avatar,
                    displayName: data.twitter.displayName,
                    username: data.twitter.username,
                    auth: true
                });
            },
            error: (xhr, status, err) => {
                console.error('/api/me', status, err.toString());
            }
        });
    }

    getWins() {
        $.ajax({
            url: '/api/wins',
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({
                    wins: data
                });
            },
            error: (xhr, status, err) => {
                console.error('/api/wins', status, err.toString());
            }
        });
    }

    addWin(obj) {
        $.ajax({
            url: '/api/win/add',
            method: 'POST',
            data: obj,
            success: data => {
                this.setState({
                    flash: data.flash
                });
                this.getWins();
                this.getUser();
            },
            error: (xhr, status, err) => {
                console.log('/api/win/add', status, err.toString());
            }
        });
    }

    delWin(obj) {
        $.ajax({
            url: '/api/win/del',
            method: 'POST',
            data: obj,
            success: data => {
                this.setState({
                    flash: data.flash
                });
                this.getWins();
                this.getUser();
            },
            error: (xhr, status, err) => {
                console.log('/api/win/del', status, err.toString());
            }
        });
    }

    love(obj) {
        $.ajax({
            url: '/api/win/love',
            method: 'POST',
            data: obj,
            success: data => {
                this.setState({
                    flash: data.flash
                });
                this.getWins();
            },
            error: (xhr, status, err) => {
                console.log('/api/win/love', status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.getUser();
        this.getWins();
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
            add: this.addWin,
            del: this.delWin,
            inc: this.love
        };
        const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, props)
        );
        const flash = this.state.flash !== null ? <Flash {...this.state.flash}/> : '';
        return (
            <div>
                {flash}
                <Nav auth={this.state.auth} displayName={this.state.displayName} username={this.state.username} avatar={this.state.avatar}/>
                <Modal add={this.addWin} />
                {childrenWithProps}
            </div>
        );
    }
}

export default ReactApp;
