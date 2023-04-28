import React from 'react';
import axios from "axios";
import firebase from '../configs/firebase.js'
import { auth } from '../configs/firebase.js'

const API_IMG ="https://image.tmdb.org/t/p/w500/";

const MovieContainer = ({title, poster_path,vote_average, release_date, overview , id}) => {

    const sendFavorite = (event) => {
        const userID = auth.currentUser.uid;
        const movieID = event.target.id;
        axios.post('http://localhost:5678/AddFavorite', { userID, movieID })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    return(
        <div className="card text-center bg-secondary mb-3">
            <div className="card-body">
                <img className= "card-img-top" src={API_IMG+poster_path} />
                <div className="card-body">
                    <button type="button" className="btn btn-dark" id={id} onClick={sendFavorite}> Add to favorites </button>
                </div>
            </div>
        </div>
    )
}

export default MovieContainer;
  