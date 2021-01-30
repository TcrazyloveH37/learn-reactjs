import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 3,
		sortColumn: { path: 'title', order: 'asc' }
	};

	componentDidMount() {
		const genres = [{ name: 'All Genres', _id: 'allGenres' }, ...getGenres()];

		this.setState({ movies: getMovies(), genres, selectedGenre: genres[0] });
	}

	componentDidUpdate(prevProps, prevState) {}

	handleLike = movie => {
		const movies = [...this.state.movies];

		const index = movies.indexOf(movie);

		movies[index].liked = movies[index].liked === true ? false : true;

		this.setState({ movies });
	};

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	handleDeleteMovie = movie => {
		let movies = [...this.state.movies];

		movies = movies.filter(m => m !== movie);

		this.setState({ movies });
	};

	handleGenreSelect = genre => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = path => {
		this.setState({ sortColumn: path });
	};

	getPageData = () => {
		const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state;

		const filtered =
			selectedGenre && selectedGenre._id !== 'allGenres'
				? allMovies.filter(m => m.genre._id === selectedGenre._id)
				: allMovies;

		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
	};

	render() {
		const { pageSize, currentPage, sortColumn } = this.state;

		const { totalCount, data: movies } = this.getPageData();

		return (
			<div className="row">
				<div className="col-3 m-2">
					<ListGroup
						items={this.state.genres}
						onItemSelect={this.handleGenreSelect}
						selectedItem={this.state.selectedGenre}
					/>
				</div>
				<div className="col">
					<p
						type="button"
						className="btn btn-success m-2"
						data-bs-toggle="tooltip"
						data-bs-placement="top"
						title="Tooltip on top"
					>
						Showing {totalCount} movies
					</p>
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
