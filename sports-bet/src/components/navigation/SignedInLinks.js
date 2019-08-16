import React from "react"
import { NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { signOut } from "../../store/actions/authActions"

function SignedInLinks(props) {

	//console.log(props)

	return(
		<ul className="right">
			<li><NavLink to="">Explore</NavLink></li>
			<li><NavLink to="">My Games</NavLink></li>
			<li><NavLink onClick={props.signOut} to='/'>Sign Out</NavLink></li>
			<li>
				<NavLink to="/" className="btn btn-floating black lighter-1">
					RN
				</NavLink>
			</li>
		</ul>
		
	)

}

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	}
}

export default connect(null, mapDispatchToProps)(SignedInLinks)