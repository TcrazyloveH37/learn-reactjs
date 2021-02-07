import { Component } from 'react';
import Input from './input';
import Select from './select';
import Joi from 'joi-browser';

class Form extends Component {
	validate = () => {
		const { data } = this.state;
		const options = { abortEarly: false };

		const { error } = Joi.validate(data, this.schema, options);

		if (!error) return null;

		const errors = {};

		for (let item of error.details) {
			errors[item.path[0]] = item.message;
		}

		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const options = { abortEarly: false };
		const { error } = Joi.validate(obj, schema, options);

		return error ? error.details[0].message : error;
	};

	handleSubmit = e => {
		e.preventDefault();

		const errors = this.validate();

		this.setState({ errors: errors || {} });

		if (errors) return;

		this.doSubmit();
	};

	handlechange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);

		if (errorMessage) errors[input.name] = errorMessage;
		else delete errors[input.name];

		const data = { ...this.state.data };
		data[input.name] = input.value;

		this.setState({ data, errors });
	};

	renderButton(label) {
		return (
			<button
				type='submit'
				className='btn btn-primary'
				disabled={this.validate()}
			>
				{label}
			</button>
		);
	}

	renderInput(name, label, type = 'text') {
		const { data, errors } = this.state;

		return (
			<Input
				name={name}
				value={data[name]}
				type={type}
				onChange={this.handlechange}
				label={label}
				error={errors[name]}
			/>
		);
	}

	renderSelect(name, label, options) {
		const { errors, data } = this.state;
		return (
			<Select
				options={options}
				name={name}
				label={label}
				error={errors[name]}
				onChange={this.handlechange}
				value={data[name]}
			/>
		);
	}
}

export default Form;
