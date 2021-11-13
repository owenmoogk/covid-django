import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'
import './style.css'
import Homepage from './components/Homepage'
import Health from './components/Health'
import Nav from './components/Nav';
import Login from './components/accounts/Login'
import Signup from './components/accounts/Signup'

export default function App() {

	const [username, setUsername] = useState()
	const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') ? true : false)

	function handleLogout() {
		localStorage.removeItem('token');
		setLoggedIn(false)
		setUsername('')
	};

	useEffect(() => {
		if (loggedIn) {
			fetch('/users/current_user/', {
				headers: {
					Authorization: `JWT ${localStorage.getItem('token')}`
				}
			})
				.then(response => response.json())
				.then(json => {
					if (json.username) {
						setUsername(json.username)
					}
					else {
						handleLogout()
					}
				});
		}
	})

	return (
		<Router>
			<h1>COVID-19 Health</h1>
			<Nav username={username} logout={handleLogout} loggedIn={loggedIn} />
			<Switch>
				<Route path="/login">
					<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />
				</Route>
				<Route path="/signup">
					<Signup setLoggedIn={setLoggedIn} setUsername={setUsername} />
				</Route>
				{loggedIn ?
					<Route path='/health'>
						<Health />
					</Route>
					: null
				}
				<Route exact path="">
					<Homepage />
				</Route>
			</Switch>
		</Router>
	);
}