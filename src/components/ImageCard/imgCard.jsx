import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './imgCard.css';
import Movie from './movie';
import InfiniteScroll from 'react-infinite-scroller';

export default function MovieCard(props) {

    const {genreId,genres,movie,setMovie,setGenreForMovie,genreForMovie} = props;

    const [currentYear, setCurrentYear] = useState(2012);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [lastYear,setLastYear] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        fetchMovies(currentYear);
    }, []);


    const fetchMovies = async(year, direction = 'down') => {
        if (loading || (year == lastYear)) return null;
        setLoading(true);
        setLastYear(year);
        try {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=dbdaa5a01cd7341cd0251af492cd51b5&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100#`
            const response = await axios.get(url);
            const newMovies = response.data.results.slice(0, 20);
            let movieGenre;
            if (genreId) {
                movieGenre = newMovies?.filter((item) => item?.genre_ids?.includes(genreId));
            } else {
                movieGenre = newMovies;
            }
            const moviesWithLabel = [{ year, isLabel: true }, ...movieGenre];
            setMovie((prevMovies) => direction === 'down'
                ? [...prevMovies, ...moviesWithLabel]
                : [...moviesWithLabel, ...prevMovies]);
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
          setLoading(false);
    }

    const handleScroll = async(e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop === 0) {
          const newYear = currentYear - 1;
          if (newYear >= 1900) {
            await fetchMovies(newYear, 'up');
            setCurrentYear(newYear);
          }
        } else if ((clientHeight + scrollTop) >= scrollHeight) {
          const newYear = currentYear + 1;
          if (newYear <= new Date().getFullYear()) {
            await fetchMovies(newYear, 'down');
            setCurrentYear(newYear);
          } else {
            setHasMore(false);
          }
        }
      };

  return (
    <div 
    onScroll={handleScroll}
    ref={containerRef}
    style={{ height: '70vh', overflowX: 'hidden', overflowY: 'auto', scrollbarWidth: 'none', scrollBehavior: 'smooth' }}>
    <InfiniteScroll
        pageStart={0}
        loadMore={() => {}}
        hasMore={hasMore}
        useWindow={false}
        isReverse={false}
        initialLoad={false}
      >
            <div className='movie-card'>
            {
            movie?.map((item,index)=>(
                <>
                {
                item.isLabel ? 
                (
                  genreId ? (
                    item?.title ?
                    <div key={`year-${item.year}-${index}`} className="year-label">
                            <h2>{item.year}</h2>
                    </div> : null
                  ) :
                  <div key={`year-${item.year}-${index}`} className="year-label">
                            <h2>{item.year}</h2>
                    </div>
                )
                : 
                <>
                {
                    genreId ? 
                    (
                      item?.genre_ids?.includes(genreId) ? 
                      <Movie movie={item} key={index} genreId={genreId} genres={genres} setGenreForMovie={setGenreForMovie} genreForMovie={genreForMovie}/> : null
                    ) :
                    <Movie movie={item} key={index} genres={genres} setGenreForMovie={setGenreForMovie} genreForMovie={genreForMovie}/>
                }
                </>    
                }
                </>
            ))}
            </div>
        </InfiniteScroll>
    </div>
  )
}
