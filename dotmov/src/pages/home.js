import React, {useState, useEffect} from 'react';
import '../App.css';
import MovieContainer from '../components/MovieContainer';
import HeroCarousel from '../components/HeroImg/HeroCarousel';
import Footer from "../components/footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const apikey = process.env.REACT_APP_API_KEY;

/**
 * A brief description of what the function does.
 *
 * @param {Type} paramName - Description of the parameter.
 * @returns {Type} Description of the return value.
 * @throws {Type} Description of the exception thrown.
 */

function Home() {
    const [movies, setMovies] = useState([]);
    const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;

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

