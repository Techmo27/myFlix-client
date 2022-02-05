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

  /*const [error, setError] = useState('');


  const [user, setUser] = useState({
    Username: [],
    Password: [],
    Email: [],
    Birthday: [],
    FavoriteMovies: [],
  })

  function onChange(e) {
    setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    isValid(e.target.name, e.target.value)
  }

  function isValid(name, value) {
    setError('')
    if (name === 'Username' && value.length < 5) {
      setError('The Username must be at least 5 characters long')
    }
    else if (name === 'Password' && value.length < 8)
    return true
  }*/

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
      {error.length > 0 && <div>{error}</div>}
      <Row>
        <Col xs={1} sm={1} md={4} lg={6}></Col>
        <Col>
          <Card style={{ marginTop: 100, marginBottom: 50, maxWidth: '40rem' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>Create a New Account</Card.Title>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter a username" name={'Username'} value={user.Username} onChange={onChange} />
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
        <Col xs={1} sm={1} md={4} lg={6}></Col>
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