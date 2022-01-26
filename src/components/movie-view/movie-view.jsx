import React from 'react';
import PropTypes from 'prop-types';

import { Container, Button } from 'react-bootstrap';
import { useParams, NavLink } from 'react-router-dom';

export function MovieView(props) {

  const { movieId } = useParams()
  const { movies } = props;

  const movie = movies.find(movie => movie._id == movieId);

  if (!movie) {
    return <div>Movie not found</div>
  }

  return (
    <Container style={{ marginTop: 20, width: 500 }}>
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className='mt-3'>
          <NavLink className={"btn btn-danger"} to={"/"}>Back</NavLink>

          <NavLink className={"btn btn-danger"} to={`/directors/${movie.Director.Name}`}>Director
          </NavLink>

          <NavLink to={`/genres/${movie.Genre.Name}`} className={"btn btn-danger"}>
            Genre
          </NavLink>
        </div>
      </div>
    </Container>

  );
}
