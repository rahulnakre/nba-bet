import axios from "axios" 
import * as actionTypes from "./actionTypes"

export const getGames = () => {

	return (dispatch, getState, { getFirebase, getFirestore }) => {
		
		const firestore = getFirestore()

		dispatch({ type: actionTypes.GET_GAME_DATA_REQUEST })
		axios.get("https://www.balldontlie.io/api/v1/games/")
			.then( res => {
				//console.log(res.data.data)
				return res.data.data
			})
			.then( games => {
				dispatch({ 
					type: actionTypes.GET_GAME_DATA_SUCCESS, 
					data: games	
				})
				return games
			})
			.then( games => {
				//console.log(games)
				/*games.forEach(game => {
					//console.log(game);
					dispatch({ type: actionTypes.POST_GAME_TO_FIRESTORE_REQUEST});
					firestore.collection("nbaGames").add({
						game_id: game.id,
						date: game.date,
						home_team: game.home_team.full_name,
						home_team_score: game.home_team_score,
						visitor_team: game.visitor_team.full_name,
						visitor_team_score: game.visitor_team_score,
						betList: []
					})
					.then( res => {
						dispatch({ type: actionTypes.POST_GAME_TO_FIRESTORE_SUCCESS, res: res})
					})
					.catch( err => {
						dispatch({ type: actionTypes.POST_GAME_TO_FIRESTORE_ERROR, err: err})
					})
				})*/
			})
			.catch( err => {
				//console.log("error getting api data")
				//console.log(err)
				dispatch({ type: actionTypes.GET_GAME_DATA_ERROR, err: err })
			})

	}
}