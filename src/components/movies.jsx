import React, { Component } from 'react';
import Movie from './movie';
import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 3,
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres', _id: 'allGenres' }, ...getGenres()];

    this.setState({ movies: getMovies(), genres, selectedGenre: genres[0] });
  }

  componentDidUpdate(prevProps, prevState) {}

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

  render() {
    const { pageSize, currentPage, movies: allMovies, selectedGenre } = this.state;
    const filtered = selectedGenre && selectedGenre._id !== 'allGenres' ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3 m-2">
          <ListGroup items={this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre} />
        </div>
        <div className="col">
          <p type="button" className="btn btn-success m-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
            Showing {filtered.length} movies
          </p>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">numberInStock</th>
                <th scope="col">dailyRentalRate</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <Movie movie={movie} key={movie._id} onDelete={this.handleDeleteMovie} />
              ))}
            </tbody>
          </table>
          <Pagination itemsCount={filtered.length} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
        </div>
      </div>
    );
  }
}

export default Movies;
