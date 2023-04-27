import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
import "../App.css";

function NavigationBar({ user }) {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let loggedOut = await logOut();
      if (loggedOut === true) {
        navigate("/");
      } else {
        throw loggedOut;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar bg="dark" expand="lg" style={{ zIndex: 2 }}>
      <Container fluid>
        <Navbar.Brand href="#" style={{ color: "#38CDD7" }}>
          dotMOV
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Form className="mx-auto d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 searchbarCSS"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            <Nav.Link href="/" style={{ color: "#FFFFFF" }}>
              All Movies
            </Nav.Link>
            <Nav.Link href="#action2" style={{ color: "#FFFFFF" }}>
              TV Shows
            </Nav.Link>
            {user ? (
              <Button
                variant="outline-light"
                className="ms-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="outline-light" className="ms-2">
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default function NavigationBarWrapper() {
  const { user } = useAuth();

  return <NavigationBar user={user} />;
}
