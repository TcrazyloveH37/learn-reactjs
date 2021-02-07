import Joi from 'joi-browser';
import Form from './form';

class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {}
	};
	schema = {
		username: Joi.string().required().label('username'),
		password: Joi.string().required().label('password')
	};

	doSubmit = () => {
		// Call the server
		console.log('Submitted');
	};

	render() {
		return (
			<div>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}

export default LoginForm;
