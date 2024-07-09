import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Movie(props) {

    const navigate = useNavigate();
    const {movie,key,genreId,genres,genreForMovie,setGenreForMovie} = props;

    console.log("genreId",genreId)

    useEffect(()=>{
        if(genres){
            let getGenre = genres?.filter((item)=>movie?.genre_ids?.includes(item?.id))?.map((genre)=>genre.name)
            setGenreForMovie(getGenre);
        }
    },[genres])

    const getMovieInfo = () => {
        navigate(`/movieInfo/${movie.id}`, { state: { movie } });
    }
  
    const Img_BaseUrl = "https://image.tmdb.org/t/p/w300";

    return (
        <>
            <div className="card"  key={key}  onClick={getMovieInfo}>
                <img src={Img_BaseUrl+movie?.poster_path} alt="" className="card-image" />
                <div className="card-content">
                    <p className="card-title">{movie?.title}</p>
                    <p className="card-description" >
                    {window.innerWidth >= 480 ? movie?.overview.split(' ').slice(0, 20).join(' ') : movie?.overview.split(' ').slice(0, 10).join(' ')}</p>
                    <div className="card-genre-div">
                    {
                        genreForMovie.map((item,index)=>(
                            <p key={index} className="card-genre" style={genreForMovie?.length > 4 ? {fontSize:'1rem'} : {}}>{item}</p>
                        ))
                    }
                    </div>
                </div>
            </div>
        </>
    )
}
