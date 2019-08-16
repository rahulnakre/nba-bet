import React from "react"
import GamesList from "../games/GamesList"
//import axios from "axios"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
import { getGames } from "../../store/actions/gameActions"

class Dashboard extends React.Component {
	state={
		isLoading: false,
		games_data: []
	}
	componentDidMount() {
		if (this.props.dashboardAPICall === 0) {
			this.props.getGames()
		}
	}

	render() {
		//console.log(this.props)
		//const games_data = []
		//console.log(this.props.isLoading)
		// const games_data = this.props.games_store
		const { nbaGames } = this.props 
		//console.log(this.props)
		//console.log(games_data)
		const display = this.props.isLoading ? <p>Loading...</p> 
			: <GamesList nbaGames={nbaGames}/>
		return(
			<div>
				{display}
			</div>
		)
	}

}

const mapStateToProps = (state) => {
	//console.log(state)
	return {
		//games_store: state.gamesInfo.games_store,
		isLoading: state.gamesInfo.isLoading,
		dashboardAPICall: state.gamesInfo.dashboardAPICall,
		nbaGames: state.firestore.ordered.nbaGames
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getGames: (params) => dispatch(getGames(params))
	}
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{collection: "nbaGames"}
	])

)(Dashboard)