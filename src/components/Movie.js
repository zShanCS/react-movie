import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useMovieFetch from "../hooks/useMovieFetch";
import Spinner from './Spinner/index'
import BreadCrumb from './BreadCrumb';
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";
import Grid from './Grid'
import NoImage from '../images/no_image.jpg'
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
import { Button } from "./Button";
const Movie = () => {

  const { movieId } = useParams();
  const { error, loading, state: movie } = useMovieFetch(movieId);
  console.log(movie)

  useEffect(() => {
    document.title = `${movie.original_title} (${movie.release_date?.split('-')[0]})`;
  }, [movie.original_title, movie.release_date])


  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong <Button><Link style={{ color: "white", textDecoration: 'none' }} to='/'>Go Back Home</Link></Button> </div>;

  return (
    <>
      <BreadCrumb movieTitle={`${movie.original_title} (${movie.release_date?.split('-')[0]})`} />

      <MovieInfo movie={movie} />
      <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue} />
      <Grid header='Actors'>
        {movie.actors?.map(actor => (
          <Actor key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ?
                `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>

    </>
  )
}
export default Movie;