var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const masterusersRouter = require('./routes/masterusers');
const vehicletypesRouter = require('./routes/vehicletype');
const transmissionsRouter = require('./routes/transmission');
const rentalsRouter = require('./routes/rental');
const vehiclesRouter = require('./routes/vehicle');
const roleMangementRouter = require('./routes/rolemanagement');
const transactionRouter = require('./routes/transaction');

var app = express();

//setup monggose and mongoDB
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const mongoDB = "mongodb+srv://andrewthe88:dWUXRjexaWgfjGA1@cluster0.wpqbesp.mongodb.net/backend_oscar?retryWrites=true&w=majority";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB");
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/masterusers', masterusersRouter);
app.use('/vehicletypes', vehicletypesRouter);
app.use('/transmissions', transmissionsRouter);
app.use('/rentals', rentalsRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/rolemanagement', roleMangementRouter);
app.use('/transaction', transactionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
