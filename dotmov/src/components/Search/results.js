import React from 'react';
import { useLocation } from 'react-router-dom';
import placeholderImg from './placeholder.png';
import MovieContainer from "../../components/MovieContainer";


const Results = () => {
  const location = useLocation();
  const movies = location.state?.movies || [];

  return (
    <div>
      <h2 style={{padding:"15px"}}>Search Results:</h2>
      {movies.length ? (
  <div className="moviesContainer">
    <div className="moviesGrid">
      {movies.map((movie) => (
        <MovieContainer
          title={movie.title}
          poster_path={movie.poster_path}
          vote_average={movie.vote_average}
          id={movie.id}
        />
      ))}
    </div>
  </div>
        
      ) : (
        <div className="text-center mt-5 display-6">Sorry, no results found </div>
      )}
    </div>
  );
};

export default Results;

