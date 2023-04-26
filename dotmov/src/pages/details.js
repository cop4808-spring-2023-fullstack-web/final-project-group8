import React, { useState, useEffect } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/footer/footer";

//API
const API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=c6b00a5290f232b05948d37e75ae7a76";

function Details() {
  return (
    <>
      <div className="detailsContainer">
        <div>Hello</div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Details;
