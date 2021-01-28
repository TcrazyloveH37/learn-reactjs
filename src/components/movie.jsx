import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';


class Movie extends Component {

    state = {
        IsLiked: true
    }

    handleActiveLike = () => {
        if (this.state.IsLiked) {
            this.setState({ IsLiked: false });
            return;
        }
        this.setState({ IsLiked: true });
    };

    render() {

        const { movie, onDelete } = this.props;
        const { IsLiked } = this.state;

        let heart;

        if (IsLiked) {
            heart = <FontAwesomeIcon onClick={this.handleActiveLike} icon={faHeart} style={{ color: 'pink' }} />
        }
        else {
            heart = <FontAwesomeIcon onClick={this.handleActiveLike} icon={faHeartBroken} />
        }

        return (
            <tr>
                <th scope="row">{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                    {heart}
                </td>
                <td>
                    <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">Delete </button>
                </td>
            </tr>
        );
    }
}

export default Movie;
