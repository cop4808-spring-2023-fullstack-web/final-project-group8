import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/footer/footer";

import axios from "axios";
import "../components/details/details.css";
import { auth } from "../configs/firebase";

//Rating
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

//Cast
import Cast from "../components/details/cast/cast";

//Might Also Like
import MightLike from "../components/details/mightlike/mightlike";

//Reviews
import Reviews from "../components/details/reviews/reviews";

//Get the ID of the movie clicked
import { useParams } from "react-router-dom";

const BASE_API = axios.create({ baseURL: "https://api.themoviedb.org/3/" });
const BASE_AXIOS = axios.create({
  baseURL: "https://api.themoviedb.org/3%22%7D",
});
const API_KEY = process.env.REACT_APP_API_KEY;
//API
const API_BASE_URL = "https://api.themoviedb.org/3/movie/";

const base_img_url = "https://image.tmdb.org/t/p/w500";

function Details() {
  //set movie
  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);
  const [backdropUrl, setBackdropUrl] = useState(null);
  const [overview, setOverview] = useState(null);
  const [votes, setVotes] = useState(null);
  const [release_date, setReleaseDate] = useState(null);

  const { id } = useParams();
  console.log("ID:", id);
  const movieID = id;

  //Put somewhere else
  function fetchSingleMovie(id) {
    var mov = BASE_AXIOS.get(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`
    )
      .then((movie) => {
        console.log("Movie Data:", movie.data);
        //Set Movie Information

        //Title
        //console.log("Movie Data Name:", movie.data.original_title);
        setTitle(movie.data.original_title);

        //Backdrop_url
        //console.log("Movie BackDrop Path:", movie.data.backdrop_path);
        setBackdropUrl(movie.data.backdrop_path);

        //Poster_url
        //console.log("Movie Poster Path:", movie.data.poster_path);
        setPosterUrl(movie.data.poster_path);

        //Overview
        //console.log("Movie Overview:", movie.data.overview);
        setOverview(movie.data.overview);

        //Vote Average
        //console.log("Movie Vote Average:", movie.data.vote_average);
        setVotes(movie.data.vote_average);

        //Releasr
        //console.log("Movie Vote Average:", movie.data.release_date);
        setReleaseDate(movie.data.release_date);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchSingleMovie(movieID);
  }, [movieID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieID]);

  const [isFavoriteAdded, setIsFavoriteAdded] = useState(false);
  const [addFavoriteError, setAddFavoriteError] = useState('');
  const isLoggedIn = !!auth.currentUser;


  const sendFavorite = (event) => {
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

  }

  return (
    <>
      <div class="container-fluid" style={{ padding: "0" }}>
        <div class="row">
          <div className="backdrop">
            {/* Backdrop Image */}
            <img
              key={movie}
              className="fade-img"
              src={base_img_url + backdropUrl}
              alt=""
            />
            <div className="row poster" style={{}}>
              <div className="container d-flex">
                {/* Poster Image */}
                <img
                  key={movie}
                  style={{ width: "25%", border: "2px solid #38CDD7" }}
                  src={base_img_url + posterUrl}
                  alt=""
                />

                {/* Movie Info */}
                <div className="description">
                  <div className="mov_title">{title}</div>
                  <div className="overview">{overview}</div>
                  <br />
                  <div className="votes">{votes}/10</div>
                  {/* Rating */}
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="text-feedback"
                      value={votes}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55, color: "white" }}
                          fontSize="inherit"
                        />
                      }
                      max={11}
                    />
                  </Box>

                  {/*Add to Favorites*/}
                  <div style={{ marginTop: "10px" }}>
                  {isLoggedIn ? (
              <button
                type="button"
                className={`btn ${isFavoriteAdded ? "btn-success" : "btn-dark"}`}
                disabled={isFavoriteAdded}
                id={id}
                onClick={sendFavorite}
              >
                {isFavoriteAdded && !addFavoriteError ? "Added" : addFavoriteError || "Add to favorites"}
              </button>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Log in to add to favorites
              </Link>
            )}
          </div>
                </div>
              </div>

              <div className="title">
                <h1>Cast</h1>
                <hr />
              </div>
              <Cast id={movieID} />
              <div className="title">
                <h1>Reviews</h1>
                <hr />
              </div>
              <Reviews id={movieID} />

              <div className="title">
                <h1>Might Also Like</h1>
                <hr />
              </div>
              <MightLike id={movieID} />
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <Footer />
      </div>  */}
    </>
  );
}

export default Details;
