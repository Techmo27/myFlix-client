import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  render() {

    let { movie, addToFavourites } = this.props;
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const handleAddToFavourites = (e) => {
      e.preventDefault();

      axios.post(`https://myflix-movie-app-ekaterina.herokuapp.com/users/${username}/favorites/${movie._id}`, {},
        {
          headers: { Authorization: `Bearer ${token}` },
        })

        .then(response => {
          const data = response.data;
          console.log(data);
          alert("Movie successfully added to favourites");
          addToFavourites(movie._id);
        })
        .catch(e => {

          alert('movie NOT added to favourites');
        });
    };

    return (
      <Card style={{ marginTop: 20, marginBottom: 20, maxWidth: '30rem', minHeight: '15rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="danger">Open</Button>
          </Link>
          <Button
            style={{ marginLeft: 10 }} className="button" variant="dark" type="submit" onClick={handleAddToFavourites}> Save
          </Button>

        </Card.Body>
      </Card>
    );
  }
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