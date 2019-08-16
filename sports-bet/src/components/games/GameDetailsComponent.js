import React from "react"


function GameDetailsComponent(props) {
	return(
		<div className="container section game-details">
			<div className="card z-depth-0">
				<div className="card blue-grey darken-1">
					<div className="card-content white-text text-darken-3">
						<span className="card-title">
							{`${props.game.home_team} vs ${props.game.visitor_team}`}
						</span>
						<p>More info here hopefully...</p>
						{props.userPoints ? "Your balance: " + props.userPoints :
							<p>Loading...</p>}
					</div>
					<div className="card-action">
						<form  onSubmit={props.handleSubmit}>
                			
                			<button className="waves-effect waves-light btn">Bet</button>
                			<input onChange={props.handleChange} type="number" 
                				min="0" id="betAmount"
                			/>
								<select>
									<option value="volvo">Volvo</option>
									<option value="saab">Saab</option>
								</select>
                		</form>
					</div>
					<div className="red-text center">
						{props.invalidbetAmount ? <p>You don't have enough points to
						make this bet </p> : null}
					</div>
				</div>
			</div>
		</div>
	)

}

export default GameDetailsComponent