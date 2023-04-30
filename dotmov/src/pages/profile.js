import React, { useEffect, useState } from 'react';
import '../App.css';
import MovieContainer2 from '../components/MovieContainer2';
import Footer from "../components/footer/footer";
import axios from 'axios';
import firebase from '../configs/firebase.js'
import { auth } from '../configs/firebase.js'

const API_KEY = "0d79c1ebca70c86b4e15ffd60aaf695f";

const Profile = () => {

  const userID = auth.currentUser.uid;
  //const userID = 'hM8o7xpJiagp0oCaYBRsK1c6ITQ2';

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [removeSuccess, setRemoveSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5678/FavoriteMovies/${userID}`)
      .then((response) => {
        setFavoriteMovies(response.data.favoriteMovies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userID, removeSuccess]);

  useEffect(() => {
    Promise.all(
      favoriteMovies.map((movieID) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`
        )
      )
    )
      .then((responses) => {
        const moviesData = responses.map((response) => response.data);
        setMovies(moviesData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [favoriteMovies]);

  const handleRemoveFavorite = (movieID) => {
    axios
      .post("http://localhost:5678/RemoveFavorite", { userID, movieID })
      .then((response) => {
        console.log(response.data);
        setRemoveSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="moviesContainer">
        <h1>Your Favorites</h1>
        <hr />
        <div>
          <div className="moviesGrid">
            {movies.map((movie) => (
              <MovieContainer2
                key={movie.id}
                {...movie}
                handleRemoveFavorite={handleRemoveFavorite}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
