import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);

  // Without async function

  // const movieFetchHandler=()=>{
  //   fetch("https://swapi.dev/api/films").then((result)=>{
  //     return result.json(); //it return promise also
  //   }).then((data)=>{
  //     const transformedData=data.results.map((movieData)=>{
  //       return{
  //         id:movieData.episode_id,
  //         title:movieData.title,
  //         releaseDate:movieData.release_date,
  //         openingText:movieData.opening_crawl,
  //       }
  //     })
  //     setMovies(transformedData);
  //   })
  // }

  // With asynch function
  const movieFetchHandler = async () => {
    const storeData = await fetch("https://swapi.dev/api/films");
    const trData = await storeData.json();
    const transformedData = trData.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        releaseDate: movieData.release_date,
        openingText: movieData.opening_crawl,
      };
    });
    setMovies(transformedData);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
};

export default App;
