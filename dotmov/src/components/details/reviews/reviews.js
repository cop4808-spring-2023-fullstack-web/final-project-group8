import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import "../../details/details.css";

const BASE_API = axios.create({ baseURL: "https://api.themoviedb.org/3/" });
const BASE_AXIOS = axios.create({
  baseURL: "https://api.themoviedb.org/3%22%7D",
});
const API_KEY = "0d79c1ebca70c86b4e15ffd60aaf695f";
//API
const API_BASE_URL = "https://api.themoviedb.org/3/movie/";
const base_img_url = "https://image.tmdb.org/t/p/w500";

function Reviews(props) {
  //Get movie id from url
  const id = props.id;
  console.log("ID REVIEWS: ", id);
  const [reviews, setReviews] = useState([]);

  var review_arr = [];

  function fetchReview(id) {
    BASE_AXIOS.get(`${API_BASE_URL}${id}/reviews?api_key=${API_KEY}`)

      .then((response) => {
        var d = response.data.results;
        console.log("REVIEWS DATA:", d);
        var review = JSON.parse(JSON.stringify(d));

        review.forEach(function (item, index) {
          review_arr.push(item);
        });

        setReviews(review_arr);
      })
      .catch((err) => console.log(err));
    console.log(reviews);
  }

  useEffect(() => {
    fetchReview(id);
  }, [id]);

  return (
    <>
      {reviews.length > 0 && (
        <div className="container-fluid" style={{ padding: "0" }}>
          <div className="row reviews" style={{ color: "white" }}>
            <div className="reviews">
              <div class="overflow-auto p-3" style={{ maxHeight: "350px" }}>
                {reviews.map((rew) => (
                  <div
                    className="container"
                    style={{
                      color: "white",
                      paddingBottom: "30px",
                    }}
                  >
                    <div class="row">
                      <div className="author">
                        <div class="row">
                          <div
                            className="row col-md-1"
                            style={{ scrollPaddingRight: "0px" }}
                          >
                            <img
                              class="rounded-circle"
                              alt={rew.author_details.name}
                              src={`https://image.tmdb.org/t/p/w200${rew.author_details?.avatar_path}`}
                              width="60"
                              height="60"
                            />
                          </div>

                          <div
                            className="col"
                            style={{
                              padding: "1px",
                            }}
                          >
                            <h3>{rew.author}</h3>
                            <div style={{ marginTop: "0.5px" }}>
                              <p>{rew.created_at}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="content">
                      <p>{rew.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
