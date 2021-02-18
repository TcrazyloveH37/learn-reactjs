import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import SearchBox from './common/searchBox';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 3,
		sortColumn: { path: 'title', order: 'asc' },
		searchQuery: '',
		selectedGenre: null
	};

	async componentDidMount() {
		const { data } = await getGenres();
		const { data: movies } = await getMovies();

		const genres = [ { name: 'All Genres', _id: 'allGenres' }, ...data ];

		this.setState({
			movies,
			genres,
			selectedGenre: genres[0]
		});
	}

	handleLike = movie => {
		const movies = [ ...this.state.movies ];

		const index = movies.indexOf(movie);

		movies[index].liked = movies[index].liked === true ? false : true;

		this.setState({ movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleDeleteMovie = async movie => {
		const originalMovies = this.state.movies;

		const movies = originalMovies.filter(m => m._id !== movie._id);

		this.setState({ movies });

		try {
			await deleteMovie(movie._id);
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				toast.error('This movie has already been deleted');
			this.setState({ movies: originalMovies });
		}
	};

	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = path => {
		this.setState({ sortColumn: path });
	};

	getPageData = () => {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedGenre,
			sortColumn,
			searchQuery
		} = this.state;

		const filtered =
			selectedGenre && selectedGenre._id !== 'allGenres'
				? allMovies.filter(m => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(
			filtered,
			[ sortColumn.path ],
			[ sortColumn.order ]
		);

		if (searchQuery) {
			const regex = new RegExp(searchQuery, 'i');
			const searched = sorted.filter(m => regex.test(m.title));
			const movies = paginate(searched, currentPage, pageSize);

			return { totalCount: searched.length, data: movies };
		}

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	handleSearch = searchQuery => {
		this.setState({ searchQuery, currentPage: 1 });
	};

	render() {
		const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
		const { totalCount, data: movies } = this.getPageData();
		const { user } = this.props;

		return (
			<div className='row'>
				<div className='col-3 m-2'>
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className='col'>
					{user && (
						<Link
							to='/movies/new'
							className='col-3 btn btn-primary'
						>
							New Movie
						</Link>
					)}
					<p
						type='button'
						className='btn btn-success m-2'
						data-bs-toggle='tooltip'
						data-bs-placement='top'
						title='Tooltip on top'
					>
						Showing {totalCount} movies
					</p>
					<SearchBox
						className='form-control my-3'
						onChange={this.handleSearch}
						value={searchQuery}
					/>
					<MoviesTable
						onLike={this.handleLike}
						onDelete={this.handleDeleteMovie}
						movies={movies}
						onSort={this.handleSort}
						sortColumn={sortColumn}
					/>
					<Pagination
						itemsCount={totalCount}
						pageSize={pageSize}
						onPageChange={this.handlePageChange}
						currentPage={currentPage}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
