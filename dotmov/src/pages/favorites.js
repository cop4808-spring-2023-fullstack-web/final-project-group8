import React, { useEffect, useState } from 'react';
import '../App.css';
import MovieContainer2 from '../components/MovieContainer2';
import Footer from "../components/footer/footer";
import axios from 'axios';
import firebase from '../configs/firebase.js'
import { auth } from '../configs/firebase.js'

const API_KEY = "0d79c1ebca70c86b4e15ffd60aaf695f";

const Favorites = () => {

  const userData = JSON.parse(localStorage.getItem("user"));
  const userID = userData ? userData.uid : null;

  //const userID = auth.currentUser.uid;
  //const userID = 'ShvNeVT1f2hI9GAF9GKjaZAlcjm1';

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
        {movies.length > 0 ? (
        <div className="moviesGrid">
          {movies.map((movie) => (
            <MovieContainer2
              key={movie.id}
              {...movie}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          ))}
        </div>
      ) : (
        <p className="text-center mt-5 display-6">No favorites to display</p>
      )}
    </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Favorites;