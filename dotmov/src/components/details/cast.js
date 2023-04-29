import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import "../details/details.css";

//Cast
import { render } from "react-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,
  width: "150px",
};

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

function Cast(props) {
  //Get movie id from button
  const movieID = props.id;

  //set movie
  const [cast, setCast] = useState([]);
  var credits = [];
  var cast_data = [{}];

  function fetchCast(id) {
    BASE_AXIOS.get(`${API_BASE_URL}${id}/credits?api_key=${API_KEY}`)

      .then((response) => {
        // var d = response.data.cast.slice(0, 5);
        var d = response.data.cast;
        var cast = JSON.parse(JSON.stringify(d));

        cast.forEach(function (item, index) {
          console.log("DATA JSON: ", item);
          credits.push(item);
        });

        credits.forEach(function (item, index) {
          credits.push(item);
          console.log(
            "Name: ",
            item.name,
            "Deparment:",
            item.known_for_department
          );

          cast_data.push({
            imgSrc: `https://image.tmdb.org/t/p/w200${item.profile_path}`,

            name: item.name,
          });
          console.log("Cast Data:", cast_data);
        });
      })
      .catch((err) => console.log(err));

    setCast(credits);
  }

  useEffect(() => {
    fetchCast(movieID);
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ padding: "0" }}>
        <div className="row casts" style={{ color: "white" }}>
          <div className="content">
            <Slider {...sliderSettings}>
              {cast.map((card, index) => (
                <div key={index}>
                  <img
                    alt={card.name}
                    src={`https://image.tmdb.org/t/p/w200${card?.profile_path}`}
                    width="150"
                    height="150"
                  />
                  <h6>{card.name}</h6>
                  <p>{card.known_for_department}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cast;
