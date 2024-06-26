import React, { useEffect } from 'react'
import { API_OPTIONS } from '../utills/constant'
import Header from './Header'

const Browse = () => {
  const getNowPlayingMovies = async () =>{
    const data = await fetch("https://api.themoviedb.org/3/now_playing?page=1", API_OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
  }

  useEffect (()=>{
    getNowPlayingMovies()
  },[])

  return (
    <div>
      <Header />
    </div>
  )
}

export default Browse