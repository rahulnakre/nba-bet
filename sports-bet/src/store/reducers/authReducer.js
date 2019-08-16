const initState = {
	authError: null
}

const authReducer = (state=initState, action) => {
	switch(action.type) {
		case "SIGNIN_SUCCESS":
			console.log("login success")
			return {
				...state,
				authError: null
			}

		case "SIGNIN_ERROR":
			console.log("login error")
			return {
				...state,
				authError: "Login failed"
			}

		case "SIGNOUT_SUCCESS":
			console.log("signout success")
			return {
				...state,
				authError: null
			}

		case "SIGNOUT_ERROR":
			console.log("signout error")
			return {
				...state,
				authError: "signout error"
			}

		case "SIGNUP_SUCCESS":
			console.log("signup success")
			return {
				...state,
				authError: null
			}

		case "SIGNUP_ERROR":
			console.log("signup error")
			console.log(action.err.message)
			return {
				...state,
				authError: action.err.message
			}

		default:
			return state
	}
}

export default authReducer