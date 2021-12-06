//Enviroment variobles
require("dotenv").config();

//Dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")
var app = express();

//Routers
var indexRouter = require("./routes/index");
var usersRouter = require('./routes/users/usersRouter');
// var collectionRouter = require('./routes/movie/movieRouter')

var userJWTLoginStrategy = require('./routes/lib/passport/user-passport');
const passport = require('passport');

//Invoke middleware
app.use(cors("*"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
passport.use("jwt-user", userJWTLoginStrategy)

//Invoke routing middleware
app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;
