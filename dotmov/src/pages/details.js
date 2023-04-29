import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/footer/footer";

import axios from "axios";
import "../components/details/details.css";

//Rating
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";

//Cast
import Cast from "../components/details/cast";

const BASE_API = axios.create({ baseURL: "https://api.themoviedb.org/3/" });
const BASE_AXIOS = axios.create({
  baseURL: "https://api.themoviedb.org/3%22%7D",
});
const API_KEY = "0d79c1ebca70c86b4e15ffd60aaf695f";
//API
const API_BASE_URL = "https://api.themoviedb.org/3/movie/";

//Backdrop img_url + poster_url
//example of poster img_url = https://image.tmdb.org/t/p/w500/3i3fleqzeZ33A1mHci9gR9rQINd.jpg
const base_img_url = "https://image.tmdb.org/t/p/w500";
//Backdrop img_url + backdrop_url
//emaple of backdrop https://image.tmdb.org/t/p/w500/feU1DWV5zMWxXUHJyAIk3dHRQ9c.jpg

//Get movie id from button
const movieID = 502356;

function Details() {
  //set movie
  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState(null);
  const [posterUrl, setPosterUrl] = useState(null);
  const [backdropUrl, setBackdropUrl] = useState(null);
  const [overview, setOverview] = useState(null);
  const [votes, setVotes] = useState(null);
  const [release_date, setReleaseDate] = useState(null);

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
    fetchSingleMovie();
  });

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
            <div className="row poster">
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
                  <div className="title">{title}</div>
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
                </div>
              </div>
              <div className="cast-title ">Cast</div>
              <Cast id={movieID} />
            </div>
          </div>
        </div>
      </div>

      {/* Cast */}

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Details;
