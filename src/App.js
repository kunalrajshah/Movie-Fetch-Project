import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [iserr, setErr] = useState(null);

  // Without async function(in normal function try err by .catch)

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

  // With asynch function(in async functio handle err by try and catch)
  const movieFetchHandler = async () => {
    setLoading(true);
    try {
      const storeData = await fetch("https://swapi.dev/api/films");
      if(!storeData.ok){
        throw new Error('Something went Wrong !!');//throw error
      }
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
    } catch (err) {
      setErr(err.message);
    }
    setLoading(false);
  };

  let content=<h2 style={{ textAlign: "center" }}>Found no Movie</h2>
  if(movies.length>0){
    content=<MoviesList movies={movies} />
  }
  if(iserr){
    content=<h2>{iserr}</h2>
  }
  if(isLoading){
    content=<h2>Loading ...</h2>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
};

export default App;
