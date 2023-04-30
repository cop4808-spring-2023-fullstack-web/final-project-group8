import React from 'react';
import axios from "axios";
import { useState } from "react";
import { auth } from '../configs/firebase.js'
import placeholderImg from "../components/Search/placeholder.png"; 



const API_IMG ="https://image.tmdb.org/t/p/w500/";

const MovieContainer = ({title, poster_path,vote_average, release_date, overview , id}) => {
  const [isFavoriteAdded, setIsFavoriteAdded] = useState(false);

  const sendFavorite = (event) => {
    const userID = auth.currentUser.uid;
    const movieID = event.target.id;
    axios.post('http://localhost:5678/AddFavorite', { userID, movieID })
      .then(response => {
        console.log(response.data);
        setIsFavoriteAdded(true);
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(movieID)) {
          favorites.push(movieID);
          localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        //axios.put()
      })
      .catch(error => {
        console.error(error);
        setIsFavoriteAdded(false);
      });
  }
return(
    <div className="card text-center singleMovie mb-3">
        <div className="card-body">
        <img
          className="card-img-top"
          src={poster_path ? API_IMG + poster_path : placeholderImg}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholderImg;
          }}
        />
            <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <div
        className={`rating ${vote_average >= 5 ? "green" : "red"}`}
      > Rating: {vote_average}
      </div>
      <div style={{marginTop:"10px"}}>
      <button
              type="button"
              className={`btn ${isFavoriteAdded ? "btn-success" : "btn-dark"}`}
              disabled={isFavoriteAdded}
              id={id}
              onClick={sendFavorite}
            >
                {isFavoriteAdded ? "Added" : "Add to favorites"}
            </button>
      </div>
            </div>
        </div>
    </div>
)
}

export default MovieContainer;
  