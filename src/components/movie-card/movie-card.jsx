import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

export function MovieCard(props) {

  const { movie } = props; //extracts movie data from parent, which the component is about to use

  return (
    <Card style={{ marginTop: 20, marginBottom: 20, maxWidth: '30rem', minHeight: '15rem' }}>
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="danger">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({ // shape object {}
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};

//props act as API for your components, prop Types validate the data types based on the app's configurations
// when .isRequired comes after type the key must be present and must'nt be = 0 or undefined