import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onRegistration(username);
  };

  return (
    <>
      <Navbar expand="sm" bg="dark" variant="dark" className="loginNavbar">
        <Container fluid>
          <Navbar.Brand href="#myflix">My Flix</Navbar.Brand>
        </Container>
      </Navbar>

      <Container >
        <Row>
          <Col xs={1} sm={1} md={2} lg={3} ></Col>
          <Col>
            <Card style={{ marginTop: 100, marginBottom: 50, maxWidth: '30rem' }}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>Create a New Account</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter a username" value={username} onChange={e => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter a password" value={password} onChange={e => setPassword(e.target.value)} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control type="date" placeholder="Enter your birthday(optional)" value={birthday} onChange={e => setBirthday(e.target.value)} />
                  </Form.Group>

                  <Button style={{ marginTop: 10 }} variant="info" type="submit" onClick={handleSubmit}>Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={1} sm={1} md={2} lg={3} ></Col>
        </Row>
      </Container>
    </>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};