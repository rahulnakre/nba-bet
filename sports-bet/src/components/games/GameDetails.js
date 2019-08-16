import React from "react"
//import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux"
import { firestoreConnect } from "react-redux-firebase"
//import { getFirestore } from "redux-firestore"
import firebase from "firebase/app"
import * as dbServices from "./services/gameDetailsServices"
import GameDetailsComponent from "./GameDetailsComponent"

class GameDetails extends React.Component {

	state = {
		betAmount: 0,
		betTeam: "",
		invalidbetAmount: false,
	}

	handleSubmit = (event) => {
		event.preventDefault()
		if(this.state.betAmount > this.props.userPoints) {
			console.log("u bet too much")
			this.setState({
				invalidbetAmount: true
			})
			return
		}
		this.setState({
			invalidbetAmount: false
		})
		dbServices.updatePoints(this.props.uid, this.state.betAmount)
		dbServices.checkIfUserBetOnGame(this.props.uid, this.props.match.params.game_id)
		.then( (bet) => {
			console.log(bet)
			if (bet !== undefined) {
				dbServices.updateBetAmount(bet, this.state.betAmount)
				return

			}
			//console.log(this.state.userAlreadyBet)
			else {
				dbServices.addBetToAllBetList(this.props.uid, this.props.match.params.game_id, this.state.betAmount)
				.then( (betID) => {
					dbServices.addGameToUserGameList(this.props.uid, this.props.match.params.game_id, betID)
				})
				
			}
		})
	}
	
	handleChange = (event) => {
		const { id, value } = event.target
		if (isNaN(Number(value))) {
			this.setState({
				[id]: 0
			})
			return
		}
		this.setState({
			[id]: Number(value)
		})
	}

	render() {
		const { game } = this.props
		//console.log(this.props)

		if (game === null) {
			return(
				<div>
					<p>Loading...</p>
				</div>
			)
		} 
		return(
			<GameDetailsComponent 
				game={game}
				userPoints={this.props.userPoints}
				handleSubmit={this.handleSubmit}
				handleChange={this.handleChange}
				invalidbetAmount={this.state.invalidbetAmount}
			/>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const gameID = ownProps.match.params.game_id
	const nbaGames = state.firestore.data.nbaGames
	const game = nbaGames ? nbaGames[gameID] : null
	const currentUID = state.firebase.auth.uid 

	var userPoints = null
	if (state.firestore.data.users !== undefined && currentUID !== undefined) {
		userPoints = state.firestore.data.users[currentUID]["points"]
	}
	return {
		gameID: gameID,
		game: game,
		uid: currentUID,
		userPoints: userPoints,
		isLogged: true
	}
}


export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: "nbaGames" },
		{ collection: "users" }
	])
)(GameDetails)