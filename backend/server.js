const http = require("http");
const firebase = require("firebase");
var admin = require("firebase-admin");
const fs = require("fs");
const cron = require("node-cron");
const morgan = require("morgan"); //for logging
const express = require("express");
//const functions = require('firebase-functions');
app = express();
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sports-bet-eb9fa.firebaseio.com"
});

const db = admin.firestore();
db.collection("users").get()
.then( res => {
	console.log(res)
})
.catch( err => {
	console.log(err)
})

app.use(morgan("dev"));

db.collection("users");

app.use("/", (req, res, next) => {
	console.log("yes")
});


http.createServer( (req, res) => {
	console.log("requested url: " + req.url);

	req.on("close", () => {
		console.log("got a close")
		if(!res.finished) {
			res.end();
			console.log("stopped sending events");
		}
	});

	if (req.url.toLowerCase() === "/events") {
		// keep alive means to well... keep alive,
		//lets the client know its a permanent connection
		// text/event-stream determins how client should interpet data it receives
		// which is used really for sse protocol here?
		// and cache-control asks client to not store in local cache
		res.writeHead(200, {
			"Connection": "keep-alive",
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			// to enable cors, so our react app can talk to this server
			// for now, we use * so any domain can acces, but for production maybe no
			"Access-Control-Allow-Origin": "*"
			//"Access-Control-Expose-Headers": "*",
			//"Access-Control-Allow-Credentials": "true"
		});
		
		checkConnectionToRestore(res,)
		sendEvents(res, eventHistory);
	} else {
		res.writeHead(404);
		res.end();
	}

})
.listen(5000, () => {
	console.log("server running at http://127.0.0.1:5000");
});


// we're also gona send id, so we can make use of the last-event-id header
// whihc helps us if client lost connection, and we wana pick up where we left off
function sendEvents(res, eventHistory) {
	setTimeout(() => {
		if (!res.finished) {
			// respose must end with \n\n for theh event source i think
			// event lets us know what event this is duh
			const eventString = 'id: 1\nevent: flightStateUpdate\ndata: {"flight": "I768", "state": "landing"}\n\n'
			//res.write("event: flightStateUpdate\n");
			//res.write('data: {"flight": "I768", "state": "landing"}');
			//res.write("\n\n");
			res.write(eventString);
			eventHistory.push(eventString);
			//res.end();
		}
		}, 3000);

	setTimeout(() => {
		if (!res.finished) {
			const eventString = 'id: 2\nevent: flightStateUpdate\ndata: {"flight": "I768", "state": "landed"}\n\n'
			res.write(eventString);
			eventHistory.push(eventString);
			//res.end();
		}
	}, 6000);

	setTimeout( () => {
		if (!res.finished) {

			res.write("event: flightRemoval\n");
			res.write('data: {"flight": "I768"}');
			res.write("\n\n");
			//res.end();
		}
	}, 9000);

	setTimeout( () => {
		if(!res.finished) {
			res.write("event: closedConnection\n");
			res.write("data:");
			res.write("\n\n");
		}
	}, 3000);
}

//module.export = server;