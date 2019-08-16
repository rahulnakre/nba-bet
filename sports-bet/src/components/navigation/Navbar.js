import React from "react"
import { Link } from "react-router-dom"
import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"
import { connect } from "react-redux"


function Navbar(props) {
	const { isLogged } = props
	const navbarLinks = isLogged ? <SignedInLinks /> : <SignedOutLinks />
	return(
		<nav className="nav-wrapper grey darken-3">
			<div className="container">
				<Link to="/" className="brand-logo">Sports Bet</Link>
				{navbarLinks}
			</div>
		</nav>
	)
}

const mapStateToProps = (state) => {
	//console.log(state)
	return {
		isLogged: !state.firebase.auth.isEmpty
	}
}

export default connect(mapStateToProps)(Navbar)