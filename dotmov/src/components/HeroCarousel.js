import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HeroCarousel() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const API_KEY = process.env.API_KEY;

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then(response => {
        const movies = response.data.results;
        setTrendingMovies(movies.slice(0, 3)); // Display only the first three popular movies
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="hero-carousel">
      {trendingMovies.map(movie => (
        <div className="carousel-slide" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          <div className="overlay">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Rating: {movie.vote_average}/10</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HeroCarousel;
