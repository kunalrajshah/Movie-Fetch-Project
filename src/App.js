import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    // Get Method
    try {
      const response = await fetch(
        "https://react-http-a47ef-default-rtdb.firebaseio.com/movies.json"
      ); //always add .json
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      // console.log(data);  it return a object.

      const LoadedMovie = [];

      for (const key in data) {
        LoadedMovie.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(LoadedMovie);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // Post Method
  const addMovieHandler = async (movie) => {
    const response = await fetch(
      "https://react-http-a47ef-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: { "Content-Type": "application/json" },
      }
    );

    // firebase always return autogenerateID.
    const data = await response.json();
    console.log("data", data);
    // After successfully adding the movie, trigger fetchMoviesHandler to update the movie list.
    fetchMoviesHandler();
  };

  // geting data from firebase on refresh.
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <h1>Found no movies.</h1>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <h1>{error}</h1>;
  }

  if (isLoading) {
    content = <h1>Loading...</h1>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
