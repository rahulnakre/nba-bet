import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { createStore, compose, applyMiddleware }  from "redux"
import { reduxFirestore, getFirestore } from "redux-firestore"
import { reactReduxFirebase, getFirebase } from "react-redux-firebase" 
import rootReducer from "./store/reducers/rootReducer"
import fbConfig from "./config/fbConfig"

const store = createStore(rootReducer,
	// the things in the compose are store enhancers 
	compose(
		applyMiddleware(thunk.withExtraArgument({
			getFirebase, getFirestore
		})),
		reduxFirestore(fbConfig),
		reactReduxFirebase(fbConfig)
	)
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 

	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
