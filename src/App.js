import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg'

const App = () => {
  const API_URL = 'http://www.omdbapi.com/';
  const API_KEY = 'e7090116';
  const default_movie_title = "Batman";
  
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  const searchMovies = async (title) => {
    let movieTitle = default_movie_title;
    if (title && title.length > 0) movieTitle = title;
    const completeURL = `${API_URL}?s=${movieTitle}&apikey=${API_KEY}`;

    const response = await fetch(completeURL);
    const data = await response.json();

    setMovies(data.Search);
  }

  useEffect( () => { // called at app mount
    searchMovies();
  }, []); 

  return (
    <div className='app'>
      <h1>MovieLand</h1>

    <div className='search'>
      <input
        placeholder='Search for movies'
        value={searchTerm}
        onChange={ (e) => setSearchTerm(e.target.value) }
        onKeyUp={ (e) => { if(e.key === "Enter") searchMovies(searchTerm) } }
      />
      <img
        src={SearchIcon}
        alt="search"
        onClick={ () => searchMovies(searchTerm) }
      />
    </div>

    { movies?.length > 0
      ? (
        <div className="container">
          { movies.map( (movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ) )}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found for current searchterm...</h2>
        </div>
      )
    }

    </div>
  );
}

export default App;
