import React from 'react';

import { Container, Button, Card, Col, Row } from 'react-bootstrap';

import './director-view.scss'

export class DirectorView extends React.Component {
  render() {
    const { Director, onBackClick } = this.props;

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