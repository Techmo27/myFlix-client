import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios"
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix-movie-app-ekaterina.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={1} sm={1} md={2} lg={3}></Col>
        <Col>
          <Card style={{ marginTop: 100, marginBottom: 50, maxWidth: '40rem' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>Create a New Account</Card.Title>
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
            </Card.Body>
          </Card>
        </Col>
        <Col xs={1} sm={1} md={2} lg={3}></Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};