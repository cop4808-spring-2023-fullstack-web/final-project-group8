import React, {useState, useEffect} from 'react';
import '../App.css';
import MovieContainer from '../components/MovieContainer';
import HeroCarousel from '../components/HeroImg/HeroCarousel';
import Footer from "../components/footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const API_KEY = "0d79c1ebca70c86b4e15ffd60aaf695f";

function Home() {
    const [movies, setMovies] = useState([]);
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    useEffect(() => {
        fetch(API_URL)
        .then ((res)=>res.json())
        .then(data=>{
            console.log(data)
            setMovies(data.results)
        })
        .catch((error) => console.log(error));
    }, [])

    return (
        <> 

        <HeroCarousel />

        <div className='moviesContainer' > 
        <h1> Popular Movies </h1>
        <hr></hr>
         <div>
            <div className='moviesGrid'>
             {movies.map((movieReq)=><MovieContainer key={movieReq.id} {...movieReq}/>)}
            </div>
        </div>
        </div>

        <div>
        <Footer />
      </div>

        </>
    )

}
export default Home;

