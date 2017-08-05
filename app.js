'use strict';

require('babel-register')({
    presets: ["es2015", "react", "stage-2"]
});

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require("passport");
var session = require("express-session");
var flash = require("express-flash");
var logger = require("morgan");


const app = express();
require('dotenv').load();

require("./config/passport")(passport);

const routes = require('./routes/index');

mongoose.connect(process.env.MONGODB_URI, (err, db) => {
  if(err) {console.log(err);}

  console.log(`Connected to ${process.env.MONGODB_URI}`);
});

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
if(process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.enable('trust proxy');
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// // will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;