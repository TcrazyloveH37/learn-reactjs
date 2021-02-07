import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/common/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/common/loginForm';
import RegisterForm from './components/common/registerForm';

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<main className='container'>
					<Switch>
						<Route path='/register' component={RegisterForm} />
						<Route path='/login' component={LoginForm} />
						<Route exact path='/movies/:id' component={MovieForm} />
						<Route exact path='/movies' component={Movies} />
						<Route path='/customers' component={Customers} />
						<Route path='/rentals' component={Rentals} />
						<Route path='/not-found' component={NotFound} />
						<Redirect exact from='/' to='/movies' />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</React.Fragment>
		);
	}
}

export default App;
