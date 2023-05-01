import React, { useEffect, useState } from 'react';
import '../App.css';
import MovieContainer2 from '../components/MovieContainer2';
import Footer from "../components/footer/footer";
import axios from 'axios';
import firebase from '../configs/firebase.js'
import { auth } from '../configs/firebase.js'

const API_KEY = process.env.REACT_APP_API_KEY;

const Favorites = () => {

  const userData = JSON.parse(localStorage.getItem("user"));
  const userID = userData ? userData.uid : null;

  //const userID = auth.currentUser.uid;
  //const userID = 'ShvNeVT1f2hI9GAF9GKjaZAlcjm1';

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [removeSuccess, setRemoveSuccess] = useState(false);

  useEffect(() => {
    if (removeSuccess === favoriteMovies.length) {
      setMovies([]);
      axios
        .get(`https://movieserver.herokuapp.com/FavoriteMovies/${userID}`)
        .then((response) => {
          setFavoriteMovies(response.data.favoriteMovies);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setRemoveSuccess(0); // Reset removeSuccess after re-fetch
        });
    }
  }, [userID, favoriteMovies.length, removeSuccess]);

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
      .post("https://movieserver.herokuapp.com/RemoveFavorite", { userID, movieID })
      .then((response) => {
        console.log(response.data);
        setFavoriteMovies((prevMovies) =>
          prevMovies.filter((id) => id !== movieID)
        );
        setRemoveSuccess((prevSuccess) => prevSuccess + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setRemoveSuccess(0); // Reset removeSuccess on every re-fetch
  }, [userID]);


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
