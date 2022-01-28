import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { setMovies } from '../../actions/actions';


import MoviesList from '../movies-list/movies-list';

import { NavbarView } from "../navbar-view/navbar-view";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";

import { Container, Col, Row } from "react-bootstrap";

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://myflix-movie-app-ekaterina.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }


  render() {

    let { movies } = this.props;
    let { user } = this.state;

    if (!user) {
      return (
        <Router>
          <NavbarView />
          <Routes>
            <Route
              path="/register"
              element={
                <Col lg={8} md={8}>
                  <RegistrationView
                    onRegistration={(user) => this.onRegistration(user)}
                  />
                </Col>
              }
            />
            <Route
              index
              path="/"
              element={
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              }
            />
          </Routes>
        </Router>
      );
    }

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Routes>
              <Route
                path="/users/:user"
                element={
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                }
              />
              <Route
                path="/movies/:movieId"
                element={<MovieView movies={movies} />}
              />
              <Route
                path="/directors/:name"
                element={<DirectorView movies={movies} />}
              />
              <Route
                path="/genres/:name"
                element={<GenreView movies={movies} />}
              />

              <Route
                index
                path="/"
                element={<MoviesList movies={movies} />}
              />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);