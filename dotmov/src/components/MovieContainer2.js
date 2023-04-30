import React from "react";
import Details from "../pages/details.js";

import { Link } from "react-router-dom";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

function MovieContainer2({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
  id,
  handleRemoveFavorite, // Receive handleRemoveFavorite as a prop
}) {
  const removeFavorite = (event) => {
    const movieID = event.target.id;
    handleRemoveFavorite(movieID); // Call handleRemoveFavorite with movieID
  };

  return (
    <div className="card text-center singleMovie mb-3">
      <div className="card-body">
        <Link to={`/details/${id}`}>
          <img className="card-img-top" src={API_IMG + poster_path} />
        </Link>

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Rating: {vote_average}</p>
          <button
            type="button"
            className="btn btn-dark"
            id={id}
            onClick={removeFavorite}
          >
            Remove from favorites
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieContainer2;
