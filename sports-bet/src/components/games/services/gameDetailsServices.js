import firebase from "firebase/app"


export const updateBetAmount = (betID, newAmount) => {
	var db = firebase.firestore()
	db.collection("betList").doc(betID)
	.update({
		amount: firebase.firestore.FieldValue.increment(newAmount)
	})
	.then( doc => {
		console.log("updated bet value")
	})
	.catch( err => {
		console.log('bet update error')
		console.log(err)
	})
}

export const checkIfUserBetOnGame =  (userID, gameID) => new Promise((resolve, reject) => {
	var db = firebase.firestore()
	console.log(gameID)
	db.collection("users").doc(userID)
	.get()
	.then(doc => {
		console.log(doc.data())
		resolve(doc.data().gamesList[gameID])
	})
})

export const addGameToUserGameList = (userID, gameID, betID) => {
	var db = firebase.firestore()
	db.collection("users").doc(userID).update({
		[`gamesList.${gameID}`]: betID
	})
	.then( doc => {
		console.log("added game to user's gameList if it was a new game")
	})
	.catch( err => {
		console.log("error")
		console.log(err)
	})
}

export const addBetToAllBetList = (userID, gameID, betAmount) => new Promise((resolve, reject) => {
	var db = firebase.firestore()

	db.collection("betList").add({
		userID: userID,
		gameID: gameID,
		team: "Chicago Bulls",
		amount: betAmount
	})
	.then( bet => {
		// here we add betId to the game's betList
		console.log(bet.id)
		console.log("i added bet to bet list")
		db.collection("nbaGames").doc(gameID).update({
			[`betList.${bet.id}`]: userID
		})
		return bet.id
	})
	.then( betID => {
		// here we add betId to the user's betList
		console.log(betID)
		console.log("i added bet to bet list")
		db.collection("users").doc(userID).update({
			[`betList.${betID}`]: gameID
		})
		resolve(betID)
	})
})

export const updatePoints = (userID, betPoints) => {
	var db = firebase.firestore()
	db.collection("users").doc(userID)
	.get()
	.then(doc => {
		return doc.data().points
	})
	.then( points => {
		db.collection("users").doc(userID)
		.set({
			points: points-betPoints
		}, { merge: true})
		.then( (doc) => {
			console.log("i wrote data")
		})
		.catch( err => {
			console.log("error", err)
		})
	})
	.catch( err => {
		console.log("error")
		console.log(err)
	})
}