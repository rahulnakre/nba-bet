import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Navbar from "./components/navigation/Navbar"
import Dashboard from "./components/dashboard/Dashboard"
import SignIn from "./components/authentication/SignIn"
import SignUp from "./components/authentication/SignUp"
import GameDetails from "./components/games/GameDetails"
import socketIOClient from "socket.io-client";
/*
import ReactTable from "react-table";
import "react-table/react-table.css";
import { getInitialFlightData } from "./DataProvider";*/



class App extends React.Component {
  
    state = {
        response: null,
        endpoint: "http://127.0.0.1:5000"
    }

    componentDidMount() {
        const socket = socketIOClient(this.state.endpoint)
        socket.on("ping", data => {
            console.log(data)
            this.setState({
                response: data
            })
        })
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <Route path="/signin" component={SignIn} />
                            <Route path="/signup" component={SignUp} />
                            <Route path="/games/:game_id" component={GameDetails} />

                        </Switch>
                    </div>
                </BrowserRouter>

            </div>
        );
    }
}

export default App;

  
        /*return (
            <div className="App">
                <button onClick={this.stopUpdates}>Stop Updates</button>
                <ReactTable data={this.state.data} columns={this.columns} />
            </div>
        );*/
  
    /*constructor(props) {
        super(props);
        this.state = {
          data: getInitialFlightData()
        };

        this.columns = [
          {
            Header: "Origin",
            accessor: "origin"
          },
          {
            Header: "Flight",
            accessor: "flight"
          },
          {
            Header: "Arrival",
            accessor: "arrival"
          },
          {
            Header: "State",
            accessor: "state"
          }
        ];
        // creates an object that initilizes communcation channel between client and server
        // its unidirectional (flows from server to client)
        this.eventSource = new EventSource("http://localhost:5000/events")
    }

    componentDidMount() {
        // onmessage points to an event handler that will be called
        // when an event comes from the server

        this.eventSource.addEventListener("flightStateUpdate", event => {
            this.updateFlightState(JSON.parse(event.data))
        })

        this.eventSource.addEventListener("flightRemoval", event => {
            this.removeFlight(JSON.parse(event.data))
        })

        this.eventSource.addEventListener("closedConnection", event => {
            this.stopUpdate()
        })
    }

    removeFlight(flightInfo) {
        const newData = this.state.data.filter( item => {
                if (item.flight !== flightInfo.flight) {
                    return item
                }
            }
        )
        this.setState(Object.assign({}, { data: newData }))
    }

    updateFlightState(flightState) {
        console.log(this.state)
        let newData = this.state.data.map( item => {
            if (item.flight === flightState.flight) {
                item.state = flightState.state
            }
            return item
        })

        this.setState(Object.assign({}, { data: newData }))
    }

    stopUpdate() {
        console.log("client closing")
        this.eventSource.close()
    }*/