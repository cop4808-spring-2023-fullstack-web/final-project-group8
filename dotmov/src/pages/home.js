import React, {useState, useEffect} from 'react';
import '../App.css';
import MovieContainer from '../components/MovieContainer';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=c6b00a5290f232b05948d37e75ae7a76";


function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(API_URL)
        .then ((res)=>res.json())
        .then(data=>{
            console.log(data)
            setMovies(data.results)
        })
    }, [])

    return (
        <div className='moviesContainer'>
            <div className='moviesGrid'>
             {movies.map((movieReq)=><MovieContainer key={movieReq.id} {...movieReq}/>)}
            </div>
        </div>
    )

}

export default Home;

