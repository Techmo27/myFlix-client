import React from 'react';

import { Container, Button, Card, Col, Row } from 'react-bootstrap';

import './genre-view.scss'

export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick } = this.props;

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
                <Button style={{ marginTop: 20 }} variant="danger" onClick={() => { onBackClick(); }}>Back</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={1} sm={1} md={2} lg={3} ></Col>
        </Row>
      </Container >
    )
  }
}