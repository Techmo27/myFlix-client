import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Container, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

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
          <Button style={{ marginTop: 20 }} variant="danger" onClick={() => { onBackClick(null); }}>Back</Button>

        </div>
      </Container>

    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.number.isRequired,
    }),
  }).isRequired,
};