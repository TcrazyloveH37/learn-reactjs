import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/common/navBar';
import MovieForm from './components/movieForm';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<main className="container">
					<Switch>
						<Route path="/movies/:id" component={MovieForm} />
						<Route path="/movies" component={Movies} />
						<Route path="/customers" component={Customers} />
						<Route path="/rentals" component={Rentals} />
						<Route path="/not-found" component={NotFound} />
						<Redirect exact from="/" to="/movies" />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
