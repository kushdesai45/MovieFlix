import React, { useEffect, useState } from 'react';
import './navbar.css'; 
import logo from "../../assests/movie-flix-logo.png";
import axios from 'axios';

const Navbar = (props) => {

  const {setGenreId,setGenres,genres} = props;

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectBtn,setSelectBtn] = useState(false);

  const toggleGenre = (genre) => {
    setSelectBtn(true);
    setGenreId(genre?.id);
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const getGenres = async() => {
    const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    const data = await axios.get(url,{
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmRhYTVhMDFjZDczNDFjZDAyNTFhZjQ5MmNkNTFiNSIsIm5iZiI6MTcyMDI0ODc3My4yOTEwMDUsInN1YiI6IjY2ODhlN2ZjMDc5NzcxMmU3MGNiNmY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZN16prr3N8sEmWMvKLty2CpB1yqWiBIz2bPOpJ6ZMs8'
      }
    });
    setGenres(data?.data?.genres);
  }
  
  useEffect(()=>{
    getGenres();
  },[])

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img className='navbar-img' src={logo} alt="MovieFlix Logo" />
      </div>
      <div className='genres-div'>
      <ul className="navbar-genres">
      <li className={`navbar-genre-item ${!selectBtn ? 'selected' : ''}`} onClick={()=>{
          setSelectBtn(false);
          setSelectedGenres([]);
          setGenreId();
        }
      }
      >All</li>
        {genres.map((genre, index) => (
          <li 
            key={index} 
            className={`navbar-genre-item ${(selectedGenres.includes(genre) && selectBtn) ? 'selected' : ''}`}
            onClick={() => toggleGenre(genre)}>
            {genre?.name}
          </li>
        ))}
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
