import React, { useState, useEffect } from "react";
//api
import API from '../API';
//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

//componenets

//hook
import { useHomeFetch } from "../hooks/useHomeFetch";

//image
import NoImage from '../images/no_image.jpg';
import Grid from "./Grid";
import HeroImage from "./HeroImage";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";
import Thumb from "./Thumb";

const Home = () => {

  const { state, loading, error, setSearchTerm } = useHomeFetch();

  console.log(state);

  return (
    <>
      {state.results[0] ?
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
        : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header='Popular Movies'>
        {state.results.map(movie => (
          <Thumb key={movie.id}
            clickable={true}
            image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
            movieId={movie.id} />
        ))}
      </Grid>
      <Spinner />
    </>
  )
}
export default Home;