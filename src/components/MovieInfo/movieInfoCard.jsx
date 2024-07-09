// MovieInfo.js
import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import './movieInfoCard.css';

const MovieInfoCard = (props) => {

  const {genreForMovie,setGenreForMovie,genres} = props;
  const location = useLocation();
  const { movie } = location.state || {};

  useEffect(()=>{
    if(genres){
        let getGenre = genres?.filter((item)=>movie?.genre_ids?.includes(item?.id))?.map((genre)=>genre.name)
        setGenreForMovie(getGenre);
    }
  },[genres])

  const getToMainPage = () => {
    window.location.href = "/";
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  const Img_BaseUrl = "https://image.tmdb.org/t/p/w300";

  return (
    <div className="movie-info">
    <span className="back-arrow" onClick={getToMainPage}>←</span>
    <div className="movieDiv1">
        <img className="movie-img" src={Img_BaseUrl + movie.poster_path} alt={movie.title} />
        <h4 style={{textAlign:'center'}}>{movie.title}</h4>
    </div>
    <div className="movieDiv2">
        <p className="p-bold">OverView</p>
        <p className="movieOverview">{movie.overview}</p>
        <p className="p-bold">Genres</p>
        {
            genreForMovie.map((item,index)=>(
                <p key={index} className="movieOverview" style={genreForMovie?.length > 4 ? {fontSize:'1rem'} : {}}>{item}</p>
            ))
        }
    </div>
    </div>
  );
};

export default MovieInfoCard;

