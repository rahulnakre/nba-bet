import * as actionTypes from "../actions/actionTypes"

const initState = {
	games_store: null,
	game_data_get_error: null,
	game_data_post_error: null,
	isLoading: false,
	dashboardAPICall: 0
}

const gameInfoReducer = (state=initState, action) => {
	
	switch(action.type) {
		case actionTypes.GET_GAME_DATA_REQUEST:
			console.log(actionTypes.GET_GAME_DATA_REQUEST)
			return {
				...state,
				isLoading: true
			}
		case actionTypes.GET_GAME_DATA_SUCCESS:
			console.log(actionTypes.GET_GAME_DATA_SUCCESS)
			return {
				...state,
				isLoading: false,
				games_store: action.data,
				dashboardAPICall: 1
			}
		case actionTypes.GET_GAME_DATA_ERROR:
			console.log(actionTypes.GET_GAME_DATA_ERROR)
			return {
				...state,
				game_data_get_error: action.err,
				isLoading: false
			}
		case actionTypes.POST_GAME_TO_FIRESTORE_REQUEST:
			console.log(actionTypes.POST_GAME_TO_FIRESTORE_REQUEST)
			return {
				isLoading: true
			}
		case actionTypes.POST_GAME_TO_FIRESTORE_SUCCESS:
			console.log(actionTypes.POST_GAME_TO_FIRESTORE_SUCCESS)
			return {
				isLoading: false,
				game_data_post_error: null
			}
		case actionTypes.POST_GAME_TO_FIRESTORE_ERROR:
			console.log(actionTypes.POST_GAME_TO_FIRESTORE_ERROR)
			return {
				isLoading: false,
				game_data_post_error: action.err
			}
		default:
			return state
	}
}

export default gameInfoReducer