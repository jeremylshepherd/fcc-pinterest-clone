'use strict';

require('babel-register')({
    presets: ["es2015", "react", "stage-2"]
});

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users');
var Poll = require('../models/Polls');
var React = require("react");
var ReactDOMServer = require("react-dom/server");
var ReactApp = require("../views/Components/ReactApp");
var passport = require("passport");

require("../config/passport");

/******************************************************************************
******************________AUTHENTICATION ROUTES_________***********************
******************************************************************************/

//Authentication middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        console.log("You are logged in!");
        return next(); 
    }
    req.flash("login", "You must first log in or register first!");
    res.redirect('/login');
}

/******************
*GITHUB************
******************/

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      req.flash('loggedin', "Who's awesome? You're awesome! Thanks for logging in.");
      res.redirect('/');
  }
);


/******************
*GOOGLE************
******************/

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      req.flash('loggedin', "Who's awesome? You're awesome! Thanks for logging in.");
      res.redirect('/');
  }
);

/*****************
*TWITTER**********
*****************/

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
      req.flash('loggedin', "Who's awesome? You're awesome! Thanks for logging in.");
      res.redirect('/');
  }
);

/*****************
*FACEBOOK*********
*****************/

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      req.flash('loggedin', "Who's awesome? You're awesome! Thanks for logging in.");
      res.redirect('/');
  }
);

/*****************
*******LOCAL******
*****************/

router.post('/signup', (req, res) => {
    User.findOne({"local.email" : req.body.email}, (err, user) => {
        if(err) {console.log(err);}
        
        if(!user) {
            var newUser = new User();
            
            User.find({}, (err, users) => {
                if(err) {console.log(err);}
                console.log(users.length);
                newUser.local.email = req.body.email;
                newUser.local.password = newUser.generateHash(req.body.password);
                newUser.local.firstName= req.body.firstName;
                newUser.local.lastName = req.body.lastName;
                newUser.local.fullName = req.body.firstName + " " + req.body.lastName;
                newUser.local.created = Date.now();
                newUser.local.id = +(users.length) + 1; 
                
                newUser.save((err) => {
                    if(err) {console.log(err);}
                });
                
                req.flash('usercreated', 'New user created');
                req.login(newUser, (err) => {
                    if(err) {console.log(err);}
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
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));

/******************************************************************************
*****************____________Page Routing____________**************************
******************************************************************************/


router.get('/', isLoggedIn, (req, res) => {
    var reactString = ReactDOMServer.renderToString(
        React.createElement(ReactApp)
    );
    res.render('index.ejs');
});

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/users/:username', isLoggedIn, (req, res) => {
   User.findOne({'github.username' : req.params.username}, (err, user) => {
       if(err) {res.json(err);}
       let obj = {};
       obj.username = user.github.username;
       obj.name = user.github.displayName;
       obj.repos = user.github.publicRepos;
       res.json(obj);
   });
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('logout', 'You have successfully logged out!');
    res.redirect('/');
});

router.post('/poll', isLoggedIn, (req, res) => {
    User.findOne({'_id': req.user._id}, (err, user) => {
       if(err)  {console.log(err);}
       
       var obj = {};
       obj.title = req.body.title;
       
    });
});

/******************************************************************************
****************______________API Routing______________************************
******************************************************************************/


router.post('/test', function(req, res) {
   res.json(req); 
});

router.get('/api/me', isLoggedIn, (req, res) => {
    if(req.user === undefined) {
        res.json({});
    }else{
        res.json(req.user);
    }
});

router.get('/api/polls', (req, res) => {
    Poll.find({}, (err, results) => {
       if(err){console.log(err);}
       res.json(results);
    });
});

router.get('*', (req, res) => {
    var reactString = ReactDOMServer.renderToString(
        React.createElement(ReactApp)
    );
    res.render('index.ejs');
});

module.exports = router;