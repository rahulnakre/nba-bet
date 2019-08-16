const functions = require('firebase-functions');
// to talk to auth service, firebase, firestore, etc
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const express = require("express");
const app = express();
const fs = require("fs");
const cron = require("node-cron");
const morgan = require("morgan");

//app.use(morgan("dev"));

/*app.use("/yes", (req, res, next) => {
	console.log("yes")
});*/

app.get("/", (req, res) => {
	res.send("home")
});

app.get("/timestamp", (req, res) => {
	res.send("timestamp: " + `${Date.now()}`);
});

app.get("/timestamp-cached", (req, res) => {
	// public means we can cache the content on a server
	// if it was private, we could only cache on users' browser
	// max-age is how long can we store this in user browser (in seconds)
	// s-maxage is how long we can store it on the cdn (server)
	res.set("Cache-Control", "public, max-age=300, s-maxage=600");
	res.send(`${Date.now()}`);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.app = functions.https.onRequest(app);

//module.exports = app;


