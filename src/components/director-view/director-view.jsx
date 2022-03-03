import React from 'react';
import { Container, Card, Col, Row } from 'react-bootstrap';
import { useParams, NavLink } from 'react-router-dom';
import './director-view.scss'

export function DirectorView(props) {

  const { name } = useParams()
  const { movies } = props;

  const movie = movies.find(movie => movie.Director.Name == name);

  if (!movie) {
    return <div>Movie not found</div>
  }
  const Director = movie.Director
  return (
    <Container>
      <Row>
        <Col xs={1} sm={1} md={2} lg={3} ></Col>
        <Col>
          <Card style={{ marginTop: 100, marginBottom: 50, maxWidth: '30rem' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>Director</Card.Title>
              <div>
                <span className="label">Name: </span>
                <span className="value">{Director.Name}</span>
              </div>
              <div>
                <span className="label">Bio: </span>
                <span className="value">{Director.Bio}</span>
              </div>
              <div>
                <span className="label">Born: </span>
                <span className="value">{Director.Birth}</span>
              </div>
              <div>
                <span className="label">Death: </span>
                <span className="value">{Director.Death}</span>
              </div>
              <NavLink style={{ marginTop: 20 }} to={`/movies/${movie._id}`} className={"btn btn-info"}>Back</NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={1} sm={1} md={2} lg={3} ></Col>
      </Row>
    </Container >
  )
}