export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase()

		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		)
		.then( () => {
			dispatch({ type: "SIGNIN_SUCCESS" })
		})
		.catch( err => {
			dispatch({ type: "SIGNIN_ERROR", err: err })
		})
	}
}

export const signOut = () => {
	return (dispatch, getState, { getFirebase }) => {
		//console.log("peace out")
		const firebase = getFirebase()

		firebase.auth().signOut()
		.then( () => {
			dispatch({ type: "SIGNOUT_SUCCESS"})
		})
		.catch( err => {
			dispatch({ type: "SIGNOUT_ERROR", err: err })
		})
	}
}

export const signUp = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		//console.log("signing up rn...")
		//dispatch({ type: "SIGNUP_SUCCESS" })
		const firebase = getFirebase()
		const firestore = getFirestore()	

		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		)
		.then( res => {
			// we return so we can use a promise thing and tack on another .then()
			return firestore.collection("users").doc(res.user.uid).set({
				email: newUser.email,
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				gamesProfileUID: "", //id ike to make a game_profile table
				points: 100,
				gamesList: {},
				betList: {}
			})
			.then( () => {
				return firestore.collection("gameProfiles").doc(res.user.uid).set({
					pastBets: {},
					pendingBets: {},
					currentBets: {}
				})
			})
		})
		.then( res => {
			console.log(res)
		})
		.then( res => {
			dispatch({ type: "SIGNUP_SUCCESS", res: res})
		})
		.catch( err => {
			dispatch({ type: "SIGNUP_ERROR", err: err})
		})
	}
}