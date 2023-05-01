import React from "react";
import axios from "axios";
import { useState } from "react";
import { auth } from "../configs/firebase.js";
import Details from "../pages/details.js";
import placeholderImg from "../components/Search/placeholder.png";

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
  const [isFavoriteAdded, setIsFavoriteAdded] = useState(false);
  const [addFavoriteError, setAddFavoriteError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  /**
 * A brief description of what the function does.
 *
 * @param {Type} paramName - Description of the parameter.
 * @returns {Type} Description of the return value.
 * @throws {Type} Description of the exception thrown.
 */
  const sendFavorite = (event) => {

    const user = auth.currentUser;
    if (!user) {
      setShowPopup(true);
      return;
    }

    const userID = auth.currentUser.uid;
    const movieID = event.target.id;
    axios
      .post("http://localhost:5678/AddFavorite", { userID, movieID })
      .then((response) => {
        console.log(response.data);
        setIsFavoriteAdded(true);
        setAddFavoriteError('');
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.includes(movieID)) {
          favorites.push(movieID);
          localStorage.setItem("favorites", JSON.stringify(favorites));
        }
        //axios.put()
      })
      .catch((error) => {
        console.error(error);
        setIsFavoriteAdded(false);
        setAddFavoriteError('Cannot be added');
      });
  };
  return (
    <>
    {showPopup && (
        <div className="popup">
          <div className="popup-content text-center">
            <p style={{fontSize:"25px"}}>Please login or create an account to add to favorites.</p>
            <button style={{backgroundColor:"#38cdd7", color:"white", padding:"2%", borderRadius:"25%"}} onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    
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
              className={`btn ${isFavoriteAdded ? "btn-success" : "btn-dark"}`}
              disabled={isFavoriteAdded}
              id={id}
              onClick={sendFavorite}
            >
                {isFavoriteAdded  && !addFavoriteError ? "Added" : addFavoriteError || "Add to favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default MovieContainer;
