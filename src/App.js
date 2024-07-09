import React, { useState } from "react";
import Navbar from "./components/Navbar/navbar";
import MovieCard from "./components/ImageCard/imgCard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieInfoCard from "./components/MovieInfo/movieInfoCard";

function App() {

  const [genreId,setGenreId] = useState();
  const [genres,setGenres] = useState([]);
  const [movie,setMovie] = useState([]);
  const [genreForMovie,setGenreForMovie] = useState([]);

  return (
    <Router>
    <div className="App">
        <Navbar setGenres={setGenres} genres={genres} genreId={genreId} setGenreId={setGenreId}/>
        <Routes>
          <Route path="/" element={<MovieCard setMovie={setMovie} movie={movie} genres={genres} setGenreForMovie={setGenreForMovie} genreForMovie={genreForMovie} genreId={genreId}/>}></Route>
          <Route path="/movieInfo/:id" element={<MovieInfoCard movie={movie} genreForMovie={genreForMovie} setGenreForMovie={setGenreForMovie} genres={genres}/>}>
          </Route>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
