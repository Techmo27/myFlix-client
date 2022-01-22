import React from 'react';

import { Container, Navbar, Nav, Button } from 'react-bootstrap';

export function NavbarView({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="loginNavbar" >
      <Container fluid>
        <Navbar.Brand className="navbar-logo" href="/">My Flix</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar" />
        <Navbar.Collapse id="responsive-navbar">
          <Nav className="me-auto">
            {isAuth() && (
              <Nav.Link href={'/users/${user}'}>{user}</Nav.Link>
            )}
            {isAuth() && (
              <Button variant="link" onClick={() => { this.onLoggedOut() }}>Logout</Button>
            )}
            {isAuth() && (
              <Nav.Link href='/'>Sign-In</Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link href='/register'>Sign-Up</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}