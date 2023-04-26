import { useState } from "react";
import axios from "axios";

function sendFavorite(event) {
  const buttonId = event.target.id;
  axios.post('/AddFavorite', { id: buttonId })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
}
