import React from 'react';

import { Container, Card, Col, Row, Button } from 'react-bootstrap';
import { useParams, NavLink } from 'react-router-dom';

export function MovieView(props) {

  const { movieId } = useParams()
  const { movies } = props; // MovieView will use all properties in the movies object which are passed as a prop here(Title, Description...)

  const movie = movies.find(movie => movie._id == movieId); //loops through the movies array (using the find() method) and compare the m. id from your database  with movie id from the URL bar

  // if no movies in movie state, then return: Movie not found. Otherwise return movie content
  if (!movie) {
    return <div>Movie not found</div>
  }

  return (
    <Container>
      <Row>
        <Col xs={1} sm={1} md={2} lg={3} ></Col>
        <Col>
          <Card style={{ marginTop: 100, marginBottom: 50, maxWidth: '70rem' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>{movie.Title}</Card.Title>
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
                  <NavLink style={{ marginRight: 10 }} className={"btn btn-dark"} to={"/"}>Back</NavLink>

                  <NavLink style={{ marginRight: 10 }} className={"btn btn-info"} to={`/directors/${movie.Director.Name}`}>Director
                  </NavLink>

                  <NavLink style={{ marginRight: 10 }} to={`/genres/${movie.Genre.Name}`} className={"btn btn-info"}>
                    Genre
                  </NavLink>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={1} sm={1} md={2} lg={3} >
        </Col>
      </Row>
    </Container>

  );
}
