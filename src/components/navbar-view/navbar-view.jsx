import React from 'react';

import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

export function NavbarView({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }
  console.log("Navbar");
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" className="loginNavbar" >
        <Container fluid>
          <Navbar.Brand className="navbar-logo" href="/">My Flix</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar" />
          <Navbar.Collapse id="responsive-navbar">
            <Nav className="me-auto">
              {user ?
                <>
                  <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>
                  <Button variant="link" onClick={onLoggedOut}>Logout</Button>
                </>
                :
                <>
                  <Nav.Link href='/'>Sign-In</Nav.Link>
                  <Nav.Link href='/register'>Sign-Up</Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}