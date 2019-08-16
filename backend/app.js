var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var serviceAccount = require("./serviceAccountKey.json");
const firebase = require("firebase");
var admin = require("firebase-admin");
const functions = require('firebase-functions');
const cron = require("node-cron");
const socketIo = require("socket.io");
const server = require("./bin/www");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://sports-bet-eb9fa.firebaseio.com"
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const io = socketIo(server);
io.on("connection", socket => {
	console.log("a user connected");
});

const db = admin.firestore();
db.collection("users").doc("FqROjYcLUbUBGRQH9rXj5dp2BvJ3").get()
.then( doc => {
	console.log(doc.data());
})
.catch( err => {
	console.log(err);
});

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
