import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import "../../details/details.css";
//import "../mightlike/mightlike.css";

//Might Also Like Movies
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const sliderSettings = {
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,
  width: "230px",
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

function MightLike(props) {
  //Get movie id from button
  const id = props.id;

  //set movie
  const [cast, setCast] = useState([]);
  var credits = [];
  var cast_data = [{}];

  function fetchCast(id) {
    BASE_AXIOS.get(`${API_BASE_URL}${id}/recommendations?api_key=${API_KEY}`)

      .then((response) => {
        var d = response.data.results;
        // console.log("DATA: ", d);

        var cast = JSON.parse(JSON.stringify(d));

        cast.forEach(function (item, index) {
          // console.log("DATA JSON: ", item);
          credits.push(item);
        });

        setCast(credits);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchCast(id);
  }, [id]);

  return (
    <>
      {cast.length > 0 && (
        <div className="container-fluid" style={{ padding: "0" }}>
          <div className="row casts" style={{ color: "white" }}>
            <div className="mightlike">
              <Slider {...sliderSettings}>
                {cast.map((card) => (
                  <Link key={card.id} to={`/details/${card.id}`}>
                    <div>
                      <img
                        alt={card.title}
                        src={`https://image.tmdb.org/t/p/w500${card?.poster_path}`}
                        width="250"
                        height="250"
                      />
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MightLike;
