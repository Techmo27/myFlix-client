import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Container, Form, Button, Card, Col, Row } from 'react-bootstrap';

export function LoginView(props) { // declares hook for each input
  const [username, setUsername] = useState(''); // 1. useState is a Hook, allows to use state from a class c. in a funct. c.
  const [password, setPassword] = useState(''); // 2. here the value '' is assigned to password variable and a method that updates the password (setPassword)
  const [usernameErr, setUsernameErr] = useState(''); // 3. useState creates a local state and preserves it between render cycles
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => { // validates user input
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // prevets default refresh of page upon clicking submit
    const isReq = validate();
    console.log("ok: ", isReq)
    if (isReq) {
      /* post request made to login endpoint by passing u & p*/
      axios.post('https://myflix-movie-app-ekaterina.herokuapp.com/login', {
        Username: username,
        Password: password
      }) //server checks the user’s login details against the database & sends response as well as token
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data); // allows a user with the matched response data (username and token) to be logged in
        })
        .catch(e => { // if there is no match the server throws an error
          console.log('no such user')
        });
    }
  };
  console.log("here")

  return (

    <Container>
      <Row>
        <Col xs={1} sm={1} md={2} lg={3}></Col>
        <Col>
          <Card style={{ marginTop: 100, marginBottom: 50, maxWidth: '30rem' }}>
            <Card.Body>
              <Card.Title style={{ textAlign: 'center', fontSize: '2rem' }}>Login</Card.Title>
              <Form className="login-border">
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" placeholder="Enter your username" value={username} onChange={e => setUsername(e.target.value)} />
                  {usernameErr.length > 0 && <p>{usernameErr}</p>}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
                  {passwordErr.length > 0 && <p>{passwordErr}</p>}
                </Form.Group>
                <Button style={{ marginTop: 10 }} variant="info" onClick={handleSubmit}>Submit</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={1} sm={1} md={2} lg={3}>
        </Col>
      </Row>
    </Container>

  );
}


LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};