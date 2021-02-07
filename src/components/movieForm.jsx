import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';
import { saveMovie, getMovie } from '../services/fakeMovieService';

class MovieForm extends Form {
	state = {
		data: { title: '', genre: '', stock: '', rate: '' },
		genres: [],
		errors: {}
	};

	schema = {
		title: Joi.string().required().label('title'),
		genre: Joi.string().required().label('Genre'),
		stock: Joi.number().integer().min(0).max(100).required().label('stock'),
		rate: Joi.number().min(0).max(10).required().label('rate')
	};

	doSubmit = () => {
		// Call the server
		const { match, history } = this.props;
		const { data, genres } = this.state;
		const genreId = genres.filter(g => g._id === data.genre)[0]._id;

		const movie = {
			_id: match.params.id === 'new' ? undefined : match.params.id,
			title: data.title,
			genreId,
			numberInStock: data.stock,
			dailyRentalRate: data.rate
		};

		saveMovie(movie);

		history.push('/movies');
		// console.log('Submitted');
	};

	componentDidMount() {
		this.getGenres();
		this.mapToViewModel();
	}

	getGenres() {
		const genres = [ ...getGenres() ];

		this.setState({ genres });
	}

	mapToViewModel() {
		const { match, history } = this.props;

		if (match.params.id === 'new') return;

		const getDataMovie = getMovie(match.params.id);

		if (getDataMovie === undefined) {
			history.replace('/not-found');
			return;
		}

		const data = {
			title: getDataMovie.title,
			genre: getDataMovie.genre._id,
			stock: getDataMovie.numberInStock,
			rate: getDataMovie.dailyRentalRate
		};

		this.setState({ data });
	}

	render() {
		const { genres } = this.state;
		return (
			<div>
				<h1>Movie Form</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('title', 'Title')}
					{this.renderSelect('genre', 'Genre', genres)}
					{this.renderInput('stock', 'Number in Stock', 'number')}
					{this.renderInput('rate', 'Rate')}
					{this.renderButton('Save')}
				</form>
			</div>
		);
	}
}

export default MovieForm;
