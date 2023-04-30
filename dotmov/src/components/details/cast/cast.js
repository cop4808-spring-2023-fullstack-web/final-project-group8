import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import "../../details/details.css";
import placeholderIm from "../cast/placeholder.png"

//Cast
import { render } from "react-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CustomPrevArrow = ({ onClick }) => (
  <button className="prev-arrow" onClick={onClick}>
    <FaChevronLeft />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className="next-arrow" onClick={onClick}>
    <FaChevronRight />
  </button>
);

const sliderSettings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />,
  width: "150px",
  rtl: true,
  nextArrow: <CustomNextArrow />,
};

const BASE_API = axios.create({ baseURL: "https://api.themoviedb.org/3/" });
const BASE_AXIOS = axios.create({
  baseURL: "https://api.themoviedb.org/3%22%7D",
});
const API_KEY = "0d79c1ebca70c86b4e15ffd60aaf695f";
//API
const API_BASE_URL = "https://api.themoviedb.org/3/movie/";
const base_img_url = "https://image.tmdb.org/t/p/w500";

function Cast(props) {
  //Get movie id from button
  const id = props.id;
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchCast() {
      const response = await BASE_AXIOS.get(
        `${API_BASE_URL}${id}/credits?api_key=${API_KEY}`
      );
      setCast(response.data.cast);
    }
    fetchCast();
  }, [id]); // add id to dependency array

  //set movie
  // const [cast, setCast] = useState([]);
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
          //   console.log(
          //     "Name: ",
          //     item.name,
          //     "Deparment:",
          //     item.known_for_department
          //   );

          cast_data.push({
            imgSrc: `https://image.tmdb.org/t/p/w200${item.profile_path}`,

            name: item.name,
          });
          //   console.log("Cast Data:", cast_data);
        });
        setCast(credits);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {cast.length > 0 && (
        <div className="container-fluid" style={{ padding: "0" }}>
          <div className="row casts" style={{ color: "white" }}>
            <div className="cast">
              <Slider {...sliderSettings} arrow={true}>
                {cast.map((card, index) => (
                  <div key={index}>
                    <img
                      alt={card.name}
                      src={card.profile_path ? `https://image.tmdb.org/t/p/w200${card.profile_path}` : placeholderIm}
                      width="auto"
                      height="auto"

                    />
                    <h6>{card.name}</h6>
                    {/* <p>{card.known_for_department}</p> */}
                    <p>{card.character}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cast;
