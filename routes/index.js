'use strict';

require('babel-register')({
    presets: ['es2015', 'react', 'stage-2']
});

var express = require('express');
var router = express.Router();
var User = require('../models/Users');
var Win = require('../models/Wins');
var mongoose = require("mongoose");
var passport = require('passport');

require('../config/passport');

let clean = (arr) => {
    const clean = arr.map((w) => {
        let twit = JSON.parse(JSON.stringify(w.owner.twitter));
        delete twit.id;
        delete twit.token;
        const obj = {};
        obj.loves = w.loves;
        obj._id = w._id;
        obj.owner = w.owner;
        delete obj.owner.twitter;
        obj.owner.twitter = twit;
        obj.img = w.img;
        obj.title = w.title;
        return obj;
    });
    return clean;
};

let flash = (message, type) => {
    return {
        flash: {
            message: message,
            type: type
        }
    };
};

/******************************************************************************
******************________AUTHENTICATION ROUTES_________***********************
******************************************************************************/

// Authentication middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("You are logged in!");
        return next(); 
    }
    console.error("You must first log in or register first!");
}

/******************
*TWITTER***********
******************/

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/');
  }
);

/******************************************************************************
*****************____________Page Routing____________**************************
******************************************************************************/

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('logout', 'You have successfully logged out!');
    res.redirect('/');
});


/******************************************************************************
****************______________API Routing______________************************
******************************************************************************/

router.get('/api/me', isLoggedIn, (req, res) => {
    if(req.user === undefined) {
        res.json({});
    }else{
        User.findOne({_id: req.user._id}, (err, user) => {
            if(err) {return res.json(err);}
            Win.find({owner: req.user._id})
                .populate('owner')
                .exec((err, wins) => {
                if(err) {console.log(err);}
                let obj = {};
                obj.twitter = {
                    displayName: req.user.twitter.displayName,
                    avatar: req.user.twitter.avatar,
                    username: req.user.twitter.username
                };
                obj._id = req.user._id;
                obj.auth = true;
                obj.wins = wins;
                res.json(obj);
            });
        });
    }
});

router.get('/api/wins', (req, res) => {
    Win.find({})
        .populate('owner')
        .exec((err, wins) => {
        if(err) { console.log(err); }
        let sanit = clean(wins);
        res.json(sanit);
    });
});

router.post('/api/win/add', (req, res) => {
    const win = new Win();
    win.img = req.body.img;
    win.title = req.body.title;
    win.owner = req.user._id;
    win.save((err) => {
        if(err) console.log(err);
    });
    res.json(flash('Your win has been saved', 'success'));
});

router.post('/api/win/del', (req, res) => {
    Win.remove({_id: req.body.win_id, owner: req.user._id}, (err, win) => {
        if(err) {return res.json(err);}
        if(!win) {return res.json(flash('No matching win found', 'danger'));}
        return res.json(flash('Win removed', 'success'));
    });
});

router.post('/api/win/love', (req, res) => {
    Win.findOne({_id: req.body.win_id}, (err, win) => {
        if(err) { console.log(err); }
        win.loves = win.loves + 1;
        win.save((err) => {
            if(err) console.log(err);
        });
        res.json(flash('Your love has been recorded','success'));
    });
});

router.get('/api/user/:username', (req, res) => {
    User.findOne({"twitter.username": req.params.username}, (err, user) => {
            if(err) {return res.json(err);}
            if(!user) {
                return res.json(flash('No user found', 'danger'));
            }else{
                
                Win.find({owner: user._id})
                    .populate('owner')
                    .exec((err, wins) => {
                    if(err) {console.log(err);}
                    let sanit = clean(wins);
                    res.json(sanit);
                });
            }
        });
});

router.get('*', (req, res) => {
    res.render('index.ejs');
});

module.exports = router;
