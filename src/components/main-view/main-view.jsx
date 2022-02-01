import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, // BrowserRouter component is used to implement state-based routing
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

  // this method is called in two cases: log in and reload of page
  // places get request to movies endpoint to retreive requested information while sending bearer token
  getMovies(token) {
    axios
      .get("https://myflix-movie-app-ekaterina.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }, // authenticated request to movies endpoint
      })
      .then((response) => { // extracts data from received response?
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates state with logged in authData (username + token)*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ // this.setState is a method which changes the current state to a new one
      user: authData.user.Username, // username is saved in the user state
    });

    localStorage.setItem("token", authData.token); // saves auth data in local storage
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token); // mainViews get.Movies method is called
  }

  // componentDidMount is executed right after render() - good for async tasks
  // every time a user loads the page, this method is called and checks if the user is logged in
  componentDidMount() {
    let accessToken = localStorage.getItem("token");   // Gets value of the token from localStorage
    if (accessToken !== null) { // if token present, the user is logged in and the getMovies method is called
      this.setState({ //changes state with user from local storage
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
                <RegistrationView
                  onRegistration={(user) => this.onRegistration(user)} />
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
      // routing consists of reacting to the URL and setting apps state accordingly
      // State and URL become looped, so any state change should be reflected in the URL
      // now routes are used to navigate to different views
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
                    {movies.map((m) => ( // map() function iterates through movies / key attribute helps React better distinguish between similar elements children
                      <Col key={m._id}>
                        <MoviesList movies={movies} />
                      </Col> // movies={movies} allows using movie data inside a child component as props
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