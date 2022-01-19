import React from 'react';
import axios from 'axios';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://myflix-movie-app-ekaterina.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMovies(token) {
    axios.get('https://myflix-movie-app-ekaterina.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully registers, this function is triggered and updates the "register" property */

  onRegistration(register) {
    this.setState({
      register
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegistration={register => this.onRegistration(register)} />;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <>
        <Navbar expand="lg" bg="dark" variant="dark" className="loginNavbar">
          <Container fluid>
            <Navbar.Brand href="#myflix">My Flix</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#profile">Movies</Nav.Link>
              <Nav.Link href="#update-profile">My Favorites</Nav.Link>
              <Nav.Link href="#logout">Account</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Row className="main-view justify-content-md-center">
          {selectedMovie
            ? (
              <Col xs={12} sm={6} md={6} lg={4}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            )
            : movies.map(movie => (
              <Col xs={12} sm={6} md={6} lg={4}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            ))
          }
        </Row>
      </>
    );
  }
}
