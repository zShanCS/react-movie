import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import useMovieFetch from "../hooks/useMovieFetch";
import Spinner from './Spinner/index'
import BreadCrumb from './BreadCrumb';
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
const Movie = () => {

  const { movieId } = useParams();
  const { error, loading, state: movie } = useMovieFetch(movieId);
  console.log(movie)
  if (loading) return <Spinner />
  if (error) return <div>Something went wrong</div>
  return (
    <>
      <BreadCrumb movieTitle={`${movie.original_title} (${movie.release_date.split('-')[0]})`} />

      <MovieInfo movie={movie} />
      <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
    </>
  )
}
export default Movie;