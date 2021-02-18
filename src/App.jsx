// dependencies
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// component
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/common/navBar';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';
// css
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;

		return (
			<React.Fragment>
				<ToastContainer />
				<NavBar user={user} />
				<main className='container'>
					<Switch>
						<Route path='/register' component={RegisterForm} />
						<Route path='/login' component={LoginForm} />
						<Route path='/logout' component={Logout} />
						<ProtectedRoute path='/movies/:id' component={MovieForm} />
						<Route path='/movies' render={props => <Movies {...props} user={user} />} />
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
