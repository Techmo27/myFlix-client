import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card style={{ marginTop: 20, marginBottom: 20, maxWidth: '30rem', minHeight: '15rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button variant="danger" onClick={() => onMovieClick(movie)}>Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

// all movie properties which the app pulls from the api
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};