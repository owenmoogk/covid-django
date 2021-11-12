import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'
import './style.css'
import Homepage from './components/Homepage'
import Health from './components/Health'
import Points from './components/Points'
import Nav from './components/Nav';

export default function App() {

	return (
		<Router>
			<h1>COVID-19 Health</h1>
			<Nav />
			<Switch>
				<Route path='/health'>
					<Health />
				</Route>
				<Route path='/points'>
					<Points />
				</Route>
				<Route exact path="">
					<Homepage />
				</Route>
			</Switch>
		</Router>
	);
}