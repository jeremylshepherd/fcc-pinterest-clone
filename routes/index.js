'use strict';

require('babel-register')({
    presets: ['es2015', 'react', 'stage-2']
});

var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var Book = require('../models/Books');
var mongoose = require("mongoose");
var passport = require('passport');
var books = require('google-books-search');

require('../config/passport');

/******************************************************************************
******************________AUTHENTICATION ROUTES_________***********************
******************************************************************************/

// Authentication middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('You are logged in!');
        return next();
    }
    req.flash('login', 'You must first log in or register!');
    res.redirect('/login');
}

/*****************
*******LOCAL******
*****************/

router.post('/signup', (req, res) => {
    User.findOne({'local.email': req.body.email}, (err, user) => {
        if(err) { console.log(err); }

        if(!user) {
            var newUser = new User();

            User.find({}, (err, users) => {
                if(err) { console.log(err); }
                newUser.local.email = req.body.email;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.local.username = req.body.username;
                newUser.local.firstName = req.body.firstName;
                newUser.local.lastName = req.body.lastName;
                newUser.local.fullName = req.body.firstName + ' ' + req.body.lastName;
                newUser.local.created = Date.now();

                newUser.save((err) => {
                    if(err) { console.log(err); }
                });

                req.flash('usercreated', 'New user created');
                req.login(newUser, (err) => {
                    if(err) { console.log(err); }
                    return res.redirect('/');
                });
            });
        }else{
            req.flash('signupMessage', 'Sorry, that user already exists.');
            res.redirect('/login');
        }
    });
});

router.post('/signon', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

/******************************************************************************
*****************____________Page Routing____________**************************
******************************************************************************/

router.get('/', isLoggedIn, (req, res) => {
    res.render('index.ejs', {flash: {message: 'Thanks for signing in', type: 'success'}});
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('logout', 'You have successfully logged out!');
    res.redirect('/');
});


/******************************************************************************
****************______________API Routing______________************************
******************************************************************************/

router.post('/test', (req, res) => {
    res.json(req);
});

router.get('/api/me', isLoggedIn, (req, res) => {
    if(req.user === undefined) {
        res.json({});
    }else{
        User.findOne({_id: req.user._id})
            .populate('requests.book')
            .populate('requests.borrower', 'local.fullName')
            .populate('trades.book')
            .populate('trades.owner', 'local.fullName')
            .exec((err, user) => {
            if(err) {return res.json(err);}
            Book.find({owner: req.user._id}, (err, books) => {
                if(err) {console.log(err);}
                let obj = {};
                obj.local = {
                    email: req.user.local.email,
                    firstName: req.user.local.firstName,
                    lastName: req.user.local.lastName,
                    fullName: req.user.local.fullName,
                    userName: req.user.local.username
                };
                obj._id = req.user._id;
                obj.auth = true;
                obj.books = books;
                obj.requests = user.requests;
                obj.trades = user.trades;
                res.json(obj);
            });
        });
    }
});

router.get('/api/book/:title', (req, res) => {
    let options = {
            key: null,
            field: null,
            offset: 0,
            limit: 40,
            type: 'books',
            order: 'relevance',
            lang: 'en'
    };
    books.search(req.params.title, options, (err, results) => {
        if(err) { res.json(err); }
        if(!results) { res.json({message: 'No results found. Please refine your search.'}); }
        
        //Pull and format the API data into a simplfied form
        let only = results.map((b) => {
            let obj = {
                title: b.title ? b.title : '',
                cover: b.thumbnail ? b.thumbnail: '',
                author: b.authors ? b.authors.join(', ') : '',
                status: 'Available',
                description: b.description ? b.description : '',
                ISBN: b.industryIdentifiers ? b.industryIdentifiers : []
            };
            return obj;
        });
        
        //Eliminate books without an ISBN
        let filter = only.filter((r) => {
            let ISBN = r.ISBN.length === 0 ? [{type: 'null'}] : r.ISBN;
            return ISBN[0].type == 'ISBN_10' ||
                   ISBN[0].type == 'ISBN_13';
        });
        
        res.json(filter);
    });
});

router.get('/api/books', (req, res) => {
    Book.find({}, (err, results) => {
        if(err) { console.log(err); }
        res.json(results);
    });
});

router.post('/api/addBook', isLoggedIn, (req, res) => {
    User.findOne({'_id': req.user._id}, (err, user) => {
        if(err) { console.log(err); }
        Book.findOne({'ISBN.identifier' : req.body.ISBN}, (err, result) => {
            if(err) {console.log(err);}
            if(result && result.owner === req.user._id) {
                return res.json({flash:{'message' : 'This book is already in your collection!', type:'danger'}});
            }else{
                let book = new Book();
                book.title = req.body.title;
                book.owner = req.user._id;
                book.cover = req.body.cover;
                book.author = req.body.author;
                book.ISBN = [{type: "ISBN_10", identifier: req.body.ISBN}];
                book.description = req.body.description;
                book.save((err) => {
                    if(err) console.log(err);
                    console.log('Book saved!');
                });
                console.log(book._id);
                return res.json({flash:{message: 'New Book saved!', type: 'success'}});
            }
        });
    });
});

router.post('/user/update', isLoggedIn, (req, res) => {
    User.findOne({'_id' : req.user._id}, (err, user) => {
        if(err) {return res.json();}
        if(!user) {return res.json({flash:{message: 'That user does not exist', type: 'danger'}});}
        user.local.fullName = req.body.fullName;
        user.local.city = req.body.city;
        user.local.state = req.body.state;
        user.local.zip = req.body.zip;
        user.save((err) => {
            if(err) console.log(err);
            console.log('User saved');
        });
        return res.json({flash:{message: 'User updated!', type: 'success'}});
    });
});

router.post('/user/change', isLoggedIn, (req, res) => {
    User.findOne({'_id' : req.user._id}, (err, user) => {
        if(err) {return res.json();}
        if(!user) {return res.json({flash:{message: 'That user does not exist', type: 'danger'}});}
        if(user.validPassword(req.body.oldPassword)) {
            user.local.password = user.generateHash(req.body.newPassword);
            user.save((err) => {
                if(err) console.log(err);
                console.log('User saved');
            });
            return res.json({flash:{message: 'Password updated!', type: 'success'}});
        }else{
            return res.json({flash:{message: 'Password does not match', type: 'danger'}});
        }
        
    });
});

router.post('/api/book/request', isLoggedIn, (req, res) => {
    User.findOne({'_id' : req.body.owner}, (err, owner) => {
        if(err) {return res.json(err);}
        User.findOne({'_id': req.user._id}, (err, borrower) => {
            if(err) {return res.json(err);}
            let request = {book: req.body._id, borrower: req.user._id, status: 'Pending'};
            let trade = {book: req.body._id, owner: owner._id, status: 'Pending'};
            owner.requests.push(request);
            borrower.trades.push(trade);
            borrower.save((err) => {
                if(err) console.log(err);
                console.log('Trade saved to borrower!');
            });
            owner.save((err) => {
                if(err) console.log(err);
                return res.json({flash:{message: 'Request sent', type: 'success'}});
            });
        });
    });
});

router.post('/api/request/accept', isLoggedIn, (req, res) => {
    User.update(
        {_id: req.body.owner_id, 'requests.book': req.body.book_id},
        {'$set': {
            'requests.$.status': 'Accepted', 
            'requests.$.due': Date.now() + 1209600000
            }
        },
        (err) => {
            if(err) { console.log(err); }
    });
    User.update(
        {_id: req.body.borrower_id, 'trades.book': req.body.book_id},
        {'$set': {
            'trades.$.status': 'Accepted', 
            'trades.$.due': Date.now() + 1209600000
            }
        },
        (err) => {
            if(err) { console.log(err); }
    });
    
    Book.findOne({_id: req.body.book_id, owner: req.body.owner_id}, (err, book) => {
        if(err) {return res.json(err);}
        book.status = 'Unavailable';
        book.due = Date.now() + 1209600000;
        book.save((err) => {
            if(err) console.log(err);
            console.log('Book status update!');
        });
    });
            
    res.json({flash: {message: 'Request Approved', type: 'success'}});
});

router.post('/api/request/reject', isLoggedIn, (req, res) => {
    User.update(
        {_id: req.body.borrower_id, 'trades.book': req.body.book_id},
        {'$set': {
                'trades.$.status': 'Rejected'
            }
        },
        (err) => {
            if(err) { console.log(err); }
    });
    
    User.update(
        {_id: req.body.owner_id},
        {'$pull': {
                requests: {
                    book: req.body.book_id,
                    borrower: req.body.borrower_id
                }
            }
        },
        (err) => {
            if(err) { console.log(err); }
    });
    res.json({flash: {message: 'Request Rejected', type: 'danger'}});
});

router.post('/api/request/ack', isLoggedIn, (req, res) => {
    User.update(
        {_id: req.user._id},
        {'$pull': {
                trades: {
                    book: req.body.book_id,
                    owner: req.body.owner_id,
                    status: 'Rejected'
                }
            }
        },
        (err) => {
            if(err) { console.log(err); }
    });
    res.json({flash: {message: 'Rejection acknowledged', type: 'danger'}});
});

router.post('/api/request/ret', isLoggedIn, (req, res) => {
    User.update(
        {_id: req.user._id,},
        {'$pull': {
                trades: {
                    book: req.body.book_id,
                    owner: req.body.owner_id
                }
            }
        },
        (err) => {
            if(err) { console.log(err); }
    });
    User.update(
        {_id: req.body.owner_id,},
        {'$pull': {
                requests: {
                    book: req.body.book_id,
                    borrower_id: req.user._id
                }
            }
        },
        (err) => {
            if(err) { console.log(err); }
    });
    Book.findOne({_id: req.body.book_id}, (err, book) => {
        if(err) {return res.json(err);}
        book.status = 'Available';
        book.due = null;
        book.save((err) => {
            if(err) console.log(err);
            console.log('Book status update!');
        });
    });
    res.json({flash: {message: 'Trade Returned', type: 'success'}});
});


router.get('*', (req, res) => {
    res.render('index.ejs');
});

module.exports = router;
