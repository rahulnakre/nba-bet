import { combineReducers } from "redux"
import authReducer from "./authReducer"
import gameInfoReducer from "./gameInfoReducer"  
// made for syncing firestore data w state
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"

const rootReducer = combineReducers({
	auth: authReducer,
	gamesInfo: gameInfoReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer
})




export default rootReducer