import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const[isLoading,setLoading]=useState(false);

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
    setLoading(true);
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
    setLoading(false);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length >0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <h2 style={{textAlign:"center"}}>Found No Movies</h2>}
        {isLoading && (<h2 style={{textAlign:"center"}}>Loading...</h2>)}
      </section>
    </React.Fragment>
  );
};

export default App;
