import React from 'react';
import { Container, Button, Card, Col, Row } from 'react-bootstrap';
import { useParams, NavLink } from 'react-router-dom';
import './genre-view.scss'

export function GenreView(props) {

  const { name } = useParams()
  const { movies } = props;
  const movie = movies.find(movie => movie.Genre.Name == name);

  if (!movie) {
    return <div>Movie not found</div>
  }
  const Genre = movie.Genre

  return (
    <Container>
      <Row>
        <Col xs={1} sm={1} md={2} lg={3} ></Col>
        <Col>
          <Card style={{ marginTop: 100, marginBottom: 50, maxWidth: '30rem' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>Genre</Card.Title>
              <div className="genre-name">
                <span className="label">Name: </span>
                <span className="value">{Genre.Name}</span>
              </div>
              <div className="genre-description">
                <span className="label">Description: </span>
                <span className="value">{Genre.Description}</span>
              </div>
              <NavLink to={`/movies/${movie._id}`} style={{ marginTop: 20 }} className={"btn btn-danger"}>Back</NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={1} sm={1} md={2} lg={3} ></Col>
      </Row>
    </Container >
  )
}