import React from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux" 

function GameSummaryCard(props) {
	const { game_id } = props
	const handleSubmit = (event) => {
		//event.preventDefault()
		//props.history.push("/games/69")
	}

	return(
		<div className="row">
			<div className="col s12 m6">
				<div className="card blue-grey darken-1">
					<div className="card-content white-text text-darken-3">
						<span className="card-title">{props.title}</span>
						<p>{props.content}</p>
					</div>
					<div className="card-action">
						<form style={{display: "inline"}} onSubmit={handleSubmit}>
                			<Link to={"/games/" + game_id}>
                				<button className="waves-effect waves-light btn">Bet</button>
                			</Link>
                		</form>
                		<a href="/gamepopup">More Info</a>
					</div>
				</div>

			</div>
		</div>
	)
}

export default withRouter(connect()(GameSummaryCard))