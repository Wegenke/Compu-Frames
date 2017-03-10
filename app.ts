// import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
// import * as mongoose from 'mongoose';
let passport = require('passport');
let jwt = require('jsonwebtoken');
let mongoose = require('mongoose');
let express = require('express');
let LocalStrategy = require('passport-local').Strategy;
let router = express.Router();
let FacebookStrategy = require('passport-facebook').Strategy;

import routes from './routes/index';
import users from './routes/users';
import Frame from './models/frame';
import frames from './api/frames';
let User = require('./models/user');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/ngApp', express.static(path.join(__dirname, 'ngApp')));
app.use('/api', express.static(path.join(__dirname, 'api')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/frames', frames);

// Connect to Database on MLAB
// Database.connect().then(() => {});

// Mongoose Database
require("./routes/users");
const connectionString:string = 'mongodb://wegs:wegs@ds147599.mlab.com:47599/compuframes';
mongoose.connect(connectionString).then(() => {});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if(err) return done(err);
      if(!user) return done(null, false, { message: 'Incorrect username.' });
      if(!user.validatePassword(password)) return done(null, false, { message: 'Password does not match.' });
      return done(null, user);
    });
}));
passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(obj, done){
    done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: "facebook id",
    clientSecret: "facebook secret",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
function(req, accessToken, refreshToken, profile, done) {
    User.findOne({ facebookId: profile.id }, function (err, user) {
      if(err) return done(err, null);
      if(user) {
        req['tempUser'] = user;
        return done(null, user);
      }
      var userModel = new User();
      userModel.email = profile.username + "@facebook.com";
      userModel.facebookId = profile.id;
      userModel.save(function(err, userSaved) {
        if(err) {
            return err;
        }
        req['tempUser'] = userSaved;
        return(err, userSaved);
      })
    });
  }
));

router.post('/Register', function(req, res, next) {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function(err, user) {
    if(err) return next(err);
    res.send("Registration Complete. Please login.");
  });
});

router.post('/Login/Local', function(req, res, next) {
  if(!req.body.username || !req.body.password) return res.status(400).send("Please fill out every field");
  passport.authenticate('local', function(err, user, info) {
    console.log(user);
    if(err) return next(err);
    if(user) return res.json({ token : user.generateJWT() });
      return res.status(400).send(info);
  })(req, res, next);
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email' ] }));

router.get("/auth/facebook/callback", passport.authenticate('facebook', { failureRedirect: "/#/"}), function(req, res) {
    if(req['tempUser']) {
        res.redirect(`/#/auth/token/${ req['tempUser'].generateJWT() }`);
    } else {
        res.send("You are not authenticated");
    }
});

// redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message: 'Not Found' });
  } else {
    return res.render('index');
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:Error, req, res, next) => {
    res.status(err['status'] || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

export = app;
