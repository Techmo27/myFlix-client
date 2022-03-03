import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErrr, setEmailErr] = useState('');

  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username not valid');
      isReq = false;
    }

    if (!password) {
      setPasswordErr('Password is Required');
      isReq = false;
    } else if (password.length < 5) {
      setPasswordErr('Password not valid');
      isReq = false;
    }

    if (!email) {
      setEmailErr('Email is required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email is not valid');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
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
    }
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
                {usernameErr && <p className="valClass">{usernameErr}</p>}
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter a password" value={password} onChange={e => setPassword(e.target.value)} />
                {passwordErr && <p className="valClass">{passwordErr}</p>}
              </Form.Group>

              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control type="date" placeholder="Enter your birthday(optional)" value={birthday} onChange={e => setBirthday(e.target.value)} />
                {emailErrr && <p className="valClass">{emailErrr}</p>}
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
  registration: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired
};