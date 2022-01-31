import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
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
  constructor() { // React uses constructor method to create the component - not yet displayed
    super(); // calls the constructor of the parent class (extends React.component) - initializes this variable
    this.state = { //MainView state is initialized with this state
      user: null,
    };
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

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ // this.setState is a method which changes the current state to a new one
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // componentDidMount is executed right after render() - good for async tasks
  componentDidMount() {
    let accessToken = localStorage.getItem("token");   // Gets value of the token from localStorage. If token present, it means user is logged in.
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  render() {
    let { movies } = this.props; // extracts movie data from this component
    let { user } = this.state; // object destruction, a shortened form of let users = this.state.users

    // This is an easier way of showing login and register page.
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
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} /> //method onLoggedIn is passed as a prop to LoginView: will update user state of MainView and will be called when user is logge in
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
              {/* With the new react router you cant get match from here, you need to call a hook within the Movie View component. */}
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
                element={
                  <>
                    {movies.map((m) => ( // map() function iterates through movies
                      <Col md={3} key={m._id}> //key attribute helps React better distinguish between similar elements/ children
                        <MoviesList movies={movies} /> // movies={movies} allows using movie data inside a child component as props
                      </Col>
                    ))}
                  </>
                }
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

// export exposes each of the items to other components/files
export default connect(mapStateToProps, { setMovies })(MainView);