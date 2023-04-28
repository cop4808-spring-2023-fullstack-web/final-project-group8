import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './HeroCarousel.css'

const API_KEY = "0d79c1ebca70c86b4e15ffd60aaf695f";

function HeroCarousel() {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      )
      .then((response) => {
        const movies = response.data.results;
        setTrendingMovies(movies.slice(0, 4));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Carousel fade={true} pause={false} interval={5000}>
      {trendingMovies.map((movie) => (
        <Carousel.Item key={movie.id}>
          <div
            className="carousel-image dark-overlay"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
            }}
          ></div>
          <Carousel.Caption>
            <Container className="overlay">
            <Row>
              <Col xs={12} md={12}>
                <h2>{movie.title}</h2>
                <p>{movie.overview}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={{ span: 3, offset: 5 }}>
                <div className="rating-box">
                  <p>Rating: {movie.vote_average}/10</p>
                </div>
              </Col>
            </Row>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
export default HeroCarousel;