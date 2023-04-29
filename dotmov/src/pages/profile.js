import React, { useEffect, useState } from 'react';
import '../App.css';
import MovieContainer from '../components/MovieContainer';
import Footer from "../components/footer/footer";
import axios from 'axios';

const API_KEY = "0d79c1ebca70c86b4e15ffd60aaf695f";

function Profile() {
    
    const userID = 'hM8o7xpJiagp0oCaYBRsK1c6ITQ2';
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    
      useEffect(() => {
        axios.get(`/FavoriteMovies/${userID}`)
          .then(response => {
            console.dir(response.data.favoriteMovies);
            setFavoriteMovies(response.data.favoriteMovies);
          })
          .catch(error => {
            console.error(error);
          });
      }, [userID]);
    
      useEffect(() => {
        Promise.all(
          favoriteMovies.map(movieID => axios.get(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`))
        )
          .then(responses => {
            const moviesData = responses.map(response => response.data);
            setMovies(moviesData);
          })
          .catch(error => {
            console.error(error);
          });
      }, [favoriteMovies]);
    
      return (
        <>
          <div className='moviesContainer'>
            <h1>Your Favorites</h1>
            <hr />
            <div>
              <div className='moviesGrid'>
                {movies.map(movie => (
                  <MovieContainer key={movie.id} {...movie} />
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
