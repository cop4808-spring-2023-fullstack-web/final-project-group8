import React from "react";
import axios from "axios";
import { auth } from "../configs/firebase.js";
import Details from "../pages/details.js";

import { Link } from "react-router-dom";

const API_IMG = "https://image.tmdb.org/t/p/w500/";

const MovieContainer = ({
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
  id,
}) => {
  const sendFavorite = (event) => {
    const userID = auth.currentUser.uid;
    const movieID = event.target.id;
    axios
      .post("http://localhost:5678/AddFavorite", { userID, movieID })
      .then((response) => {
        console.log(response.data);
        //axios.put()
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="card text-center singleMovie mb-3">
      <div className="card-body">
        <Link to={`/details/${id}`}>
          <img className="card-img-top" src={API_IMG + poster_path} />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className={`rating ${vote_average >= 5 ? "green" : "red"}`}>
            {" "}
            Rating: {vote_average}
          </div>
          <div style={{ marginTop: "10px" }}>
            <button
              type="button"
              className="btn btn-dark"
              id={id}
              onClick={sendFavorite}
            >
              {" "}
              Add to favorites{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieContainer;
