import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/UserAuthContext";
import axios from "axios";
import "../App.css";

const API_KEY = "0d79c1ebca70c86b4e15ffd60aaf695f";

function NavigationBar({}) {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("user successfully logged out");
      navigate("/");
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      console.log("Matching movies:", response.data.results);
      navigate(`/results?query=${query}`, {
        state: { movies: response.data.results },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar bg="dark" expand="lg" style={{ zIndex: 2 }}>
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "#38CDD7" }}>
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearch}
              />
              {/* <Button
                variant="outline-success"
                type="submit"
                className="position-absolute top-0 end-0 m-1"
              >
                <i className="bi bi-search"></i>
              </Button> */}
            </Form>

            <Nav.Link href="/" style={{ color: "#FFFFFF" }}>
              All Movies
            </Nav.Link>
            <Nav.Link href="#action2" style={{ color: "#FFFFFF" }}>
              TV Shows
            </Nav.Link>
            <Nav.Link href="/profile" style={{ color: "#FFFFFF" }}>
              Profile
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
