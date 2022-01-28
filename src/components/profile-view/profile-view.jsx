import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Col, Form, Row, Container, Card } from 'react-bootstrap';
import './profile-view.scss';
import dayjs from 'dayjs';

export function ProfileView(props) {
  const [user, setUser] = useState({
    Username: null,
    Password: null,
    Email: null,
    Birthday: null,
    FavoriteMovies: [],
  })
  const [userFormEdit, setUserFormEdit] = useState({
    Username: null,
    Password: null,
    Email: null,
    Birthday: null,
  })
  const [isLoading, setIsLoading] = useState(true);

  const username = localStorage.getItem('user');
  const token = localStorage.getItem('token');


  useEffect(() => {
    getUser()
  }, []);


  function getUser() {
    if (!token) {
      throw new Error("No user in storage")
    }
    setIsLoading(true)
    axios.get(`https://myflix-movie-app-ekaterina.herokuapp.com/users/${username}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then((res) => {
      const userInfo = {
        Username: res.data.Username,
        Email: res.data.Email,
        Birthday: res.data.Birthday,
        FavoriteMovies: res.data.FavoriteMovies,
        Password: res.data.Password
      }

      setIsLoading(false)
      setUser(userInfo)
      setUserFormEdit(userInfo)
    })
  }

  function onRemoveFavorite() {
    axios.delete(`https://myflix-movie-app-ekaterina.herokuapp.com/users/${username}/favorites/${movie._id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        alert("Movie successfully removed");
        // props.getUser()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function onDeleteUser() {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.delete(`https://myflix-movie-app-ekaterina.herokuapp.com/users/${username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert("Profile has been successfully deleted.");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://myflix-movie-app-ekaterina.herokuapp.com/users/${username}`,
      {
        Username: userFormEdit.Username,
        Password: userFormEdit.Password,
        Email: userFormEdit.Email,
        Birthday: userFormEdit.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        getUser()
        localStorage.setItem('user', response.data.Username);

        alert('Profile is updated.');
        window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  function onChange(e) {
    setUserFormEdit(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  function getFavoriteMovies(movies) {
    if (movies.length === 0 || user.FavoriteMovies.length === 0) {
      return []
    }

    return movies.filter(movie => user.FavoriteMovies.findIndex(m => m._id === movie._id) !== -1)
  }

  const favorites = getFavoriteMovies(props.movies)

  if (isLoading) {
    return <div>Is Loading profile page</div>
  }

  return (
    <Container className="profile-view">
      <Row>
        <Col>
          <Card>
            <Card.Title>My Profile</Card.Title>
            <Card.Body>
              <div>
                <span className="label">Username: </span>
                <span className="value">{user.Username}</span>
                <br />
                <span className="label">Email: </span>
                <span className="value">{user.Email}</span>
                <br />
                <span className="label">Birthday: </span>
                <span className="value">{dayjs(user.Birthday).format("YYYY-MM-DD")}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="profile-update">
            <Card.Body>
              <Card.Title>Update Profile</Card.Title>
              <Form
                className="update-form"
                onSubmit={editUser}
              >
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={userFormEdit.Username}
                    name="Username"
                    placeholder="Enter New Username"
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    value={userFormEdit.Password}
                    placeholder="Enter New Password"
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={userFormEdit.Email}
                    placeholder="Enter Your Email"
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    value={dayjs(userFormEdit.Birthday).format("YYYY-MM-DD")}
                    type="date"
                    name="Birthday"
                    onChange={onChange}
                  />
                </Form.Group>
                <br />
                <div className="bt">
                  <Button variant="info" type="submit">Update Profile</Button>
                  <Button className="delete-button" variant="danger" onClick={onDeleteUser}>Delete Profile</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Title>My Favorite Movies</Card.Title>
            <Card.Body>
              <Row className="favorite-container">
                {favorites.length === 0 ? (
                  <div className="text-center">No Movies Added</div>
                ) : (
                  favorites.map(movie => (
                    <Card className="favorite-movie card-content" key={movie._id} >
                      <Card.Img
                        className="fav-poster"
                        variant="top"
                        src={movie.ImagePath}
                      />
                      <Card.Body style={{ backgroundColor: "black" }}>
                        <Card.Title className="movie_title">
                          {movie.Title}
                        </Card.Title>
                        <Button size="sm" variant="danger" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)} > Remove Movie </Button>
                      </Card.Body>
                    </Card>
                  ))
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}