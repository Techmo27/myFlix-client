import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Card, Container, Col, Row, Navbar, Nav } from 'react-bootstrap';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflix-movie-app-ekaterina.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <>

      <Navbar expand="sm" bg="dark" variant="dark" className="loginNavbar">
        <Container fluid>
          <Navbar.Brand href="#myflix">My Flix</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#movies">Movies</Nav.Link>
            <Nav.Link href="#favorite-movies">My Favorites</Nav.Link>
            <Nav.Link href="#profile">Account</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col xs={1} sm={1} md={2} lg={3} ></Col>
          <Col>
            <Card style={{ marginTop: 100, marginBottom: 50, maxWidth: '30rem' }}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>Login</Card.Title>
                <Form className="login-border">
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button style={{ marginTop: 10 }} variant="info" type="submit" onClick={handleSubmit}>Submit</Button>
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


LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};