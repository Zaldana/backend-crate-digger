require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")
var app = express();
var mongoose = require("mongoose")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/usersRouter');
var vinylCollectionRouter = require('./routes/vinylCollection/vinylCollectionRouter');
var wishlistRouter = require('./routes/wishlist/wishlistRouter');

var userJWTLoginStrategy = require('./routes/lib/passport/user-passport');
const passport = require('passport');

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
  console.log("MONGODB CONNECTED");
  })
  .catch((e) => {
  console.log(e);
  })


app.use(cors("*"));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
passport.use("jwt-user", userJWTLoginStrategy)


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/collection', vinylCollectionRouter);
app.use('/api/wishlist', wishlistRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {


  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render({ message: "error", errorMessage: err.message, err });
});

module.exports = app;
