import React from "react"
import GameSummaryCard from "./GameSummaryCard"
//import moment from "moment"

function GamesList(props) {
	//console.log(props)
	const { nbaGames } = props
	//console.log(nbaGames)
	const cards = nbaGames && nbaGames.map(game => {
		const team1 = game.home_team
		const team2 = game.visitor_team
		return(
			<GameSummaryCard
				key={game.id}
				game_id={game.id} 
				title={`${team1} vs. ${team2}`}
			/>
		)
	})
	return(
		<div>
			{cards}
		</div>
		/*<div>
			<GameSummaryCard title="Raptors vs GSW" content="lorem feafaef aef aef aef ae fkj"/>
			<GameSummaryCard title="India vs Pakistan" content="noo aront ehah giae aeh fggoeaog aegun"/>
		</div>*/
	)

}

export default GamesList