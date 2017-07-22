var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require("passport-twitter");
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/Users');
var configAuth = require('./auth');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

/*********************
*GITHUB***************
*********************/

    passport.use(new GitHubStrategy({
        clientID: configAuth.githubAuth.clientID,
        clientSecret: configAuth.githubAuth.clientSecret,
        callbackURL: configAuth.githubAuth.callbackURL
    },
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            User.findOne({ 'github.id': profile.id }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();
                    
                    console.log(JSON.stringify(profile, null, 2));

                    newUser.github.id = profile.id;
                    newUser.github.token = profile.token;
                    newUser.github.username = profile.username;
                    newUser.github.displayName = profile.displayName;
                    newUser.github.publicRepos = profile._json.public_repos;
                    newUser.github.created = Date.now();

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    
/*********************
*GOOGLE***************
*********************/
    
    passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err){return done(err);}

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    // set all of the relevant information
                    newUser.google.id = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value;
                    newUser.google.created = Date.now();
                    
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    
/*********************
*TWITTER**************
*********************/
    
    passport.use(new TwitterStrategy({

        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        includeEmail: true

    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err){return done(err);}

                if (user) {
                    return done(null, user);
                } else {
                    var newUser = new User();

                    // set all of the user data that we need
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;
                    newUser.twitter.created = Date.now();

                    // save our user into the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    
/*********************
*FACEBOOK*************
*********************/

    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL

    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                if (err){return done(err);}

                if (user) {
                    return done(null, user);
                } else {
                    console.log(JSON.stringify(profile, null, 2));
                    var newUser            = new User();

                    newUser.facebook.id    = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name  = profile.displayName;
                    newUser.facebook.created = Date.now();
                    
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    
/*********************
*LOCAL-LOGIN**********
*********************/
    
    passport.use(new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user, req.flash("loggedin", "Who's awesome? You're awesome! Thanks for logging in."));
        });

    }));
};


