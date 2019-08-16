import React from "react"
import { connect } from "react-redux"
import { signUp } from "../../store/actions/authActions"
import { Redirect } from "react-router-dom"

class SignUp extends React.Component {

	state = {
		// change this !!
		email: "",
		password: "",
		firstName: "",
		lastName: ""
	}

	handleChange = (event) => {
		const {id, value} = event.target
		//console.log("id: ", id)
		//console.log("value: ", value)
		this.setState({
			[id]: value
		})
	}

	handleSubmit = (event) => {
		const { authError } = this.props
		event.preventDefault()
		this.props.signUp(this.state)
		if (authError === null) {
			//this.props.history.push("/")
		}
		//console.log(event)
		//this.setState
	}

	render() {
		//console.log(this.props)
		const { auth, authError } = this.props

		if(auth.uid) {
			return(
				<Redirect to="/" />
			)
			
		}
		return(
			<div className="container">
				<form className="white" onSubmit={this.handleSubmit}>
					<h5 className="grey-text text-darken-3">Sign Up</h5>

					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange}/>
					</div>

					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange}/>
					</div>

					<div className="input-field">
						<label htmlFor="email">First Name</label>
						<input type="text" id="firstName" onChange={this.handleChange}/>
					</div>

					<div className="input-field">
						<label htmlFor="email">Last Name</label>
						<input type="text" id="lastName" onChange={this.handleChange}/>
					</div>

					<div className="input-field">
						<button>Sign Up</button>
						<div className="red-text center">
							{authError ? <p>{authError}</p> : null}
						</div>
					</div>

				</form>
			</div>
		)

	}

}

const mapStateToProps = (state) => {
	console.log(state)
	return {
		auth: state.firebase.auth,
		authError: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (newUser) => dispatch(signUp(newUser)) 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)