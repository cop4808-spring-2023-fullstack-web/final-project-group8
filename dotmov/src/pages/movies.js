import React, {useState, useEffect} from 'react';
import '../App.css';
import MovieContainer from '../components/MovieContainer';
import HeroCarousel from '../components/HeroImg/HeroCarousel';
import Footer from "../components/footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&api_key='+API_KEY;
const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

/**
 * A brief description of what the function does.
 *
 * @param {Type} paramName - Description of the parameter.
 * @returns {Type} Description of the return value.
 * @throws {Type} Description of the exception thrown.
 */
function Movies() {
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setselectedgenre] = useState([]);
    //const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

    useEffect(() => {
        const tagsEl = document.getElementById('tags');
        function setGenre() {
            tagsEl.innerHTML= '';
            genres.forEach(genre => {
                const t = document.createElement('div');
                t.classList.add('tag');
                t.id=genre.id;
                t.innerText = genre.name;
                t.addEventListener('click', () => {
                    if (selectedGenre.includes(genre.id)) {
                        setselectedgenre(selectedGenre.filter((id) => id !== genre.id));
                        t.classList.toggle('selected');
                      } else {
                        setselectedgenre([...selectedGenre, genre.id]);
                        t.classList.toggle('selected');
                      }
                });
                tagsEl.append(t);
            });
            const clearBtn = document.createElement('div'); // Create Clear Button.
            clearBtn.classList.add('tag', 'highlight');
            clearBtn.innerText = 'Clear';
            clearBtn.addEventListener('click', () => {
            setselectedgenre([]); // Set selected Genre to None

            const tags = tagsEl.querySelectorAll('.tag');//Selects All tags and removes selected class
            tags.forEach(tag => tag.classList.remove('selected'));
            });
        tagsEl.append(clearBtn);//Append Clear Btn
        }
        setTimeout(setGenre(),3000); //Causes InnerHTML Error for Some reason. Comment out to work around.
    }, []);

    useEffect(() => {
        let apiurl = API_URL;
        if (selectedGenre.length > 0){
            apiurl += '&with_genres=' + encodeURI(selectedGenre.join(','));
        }
        fetch(apiurl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setMovies(data.results);
            })
            .catch((error) => console.log(error));
    }, [selectedGenre]);
    return (
        <> 

        <div id='tags'></div>
        <div className='moviesContainer' > 
        <h1> Discover Movies </h1>
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
export default Movies;

