import React from "react"
import { connect } from "react-redux"
import { signIn } from "../../store/actions/authActions"
import { Redirect } from "react-router-dom"

class SignIn extends React.Component {

	state = {
		email:  "",
		password: ""
	}

	handleChange = (event) => {
		const { id, value } = event.target
		this.setState({
			[id]: value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		//console.log(this.props)
		const { authError } = this.props
		this.props.signIn(this.state)

	}

	render() {
		//console.log(this.props)
		const { auth, authError } = this.props

		if (auth.uid) {
			return(
				<Redirect to="/" />
			)
		}

		return(
			<div className="container">
				<form className="white" onSubmit={this.handleSubmit}>
					<h5 className="white">Sign In</h5>

					<div className='input-field'>
						<label htmlFor="email">Email</label>
						<input type="email" id="email" onChange={this.handleChange}/>
					</div>

					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={this.handleChange}/>
					</div>

					<div className="input-field">
						<button>Sign In</button>
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
	//console.log(state)
	return {
		auth: state.firebase.auth,
		authError: state.auth.authError
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (credentials) => dispatch(signIn(credentials))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)