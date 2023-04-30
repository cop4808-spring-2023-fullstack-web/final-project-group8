import React from "react";
import { useLocation } from "react-router-dom";
import placeholderImg from "./placeholder.png";
import { Link } from "react-router-dom";
import Details from "../../pages/details";

const Results = () => {
  const location = useLocation();
  const movies = location.state?.movies || [];

  return (
    <div>
      <h2 style={{ padding: "15px" }}>Search Results:</h2>
      {movies.length ? (
        <div className="moviesContainer">
          <div className="moviesGrid">
            {movies.map((movie) => (
              <div
                styles={{ margin: "3%" }}
                className="card text-center singleMovie mb-3"
              >
                <div style={{ margin: "2%" }} key={movie.id}>
                  <Link to={`/details/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="card-img-top"
                      style={{ height: "480px" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImg;
                      }}
                    />
                  </Link>

                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <div
                      className={`rating ${
                        movie.vote_average >= 5 ? "green" : "red"
                      }`}
                    >
                      {" "}
                      Rating: {movie.vote_average}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-5 display-6">
          Sorry, no results found{" "}
        </div>
      )}
    </div>
  );
};

export default Results;
