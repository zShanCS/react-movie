import React, { } from "react";

//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';

//componenets

//hook
import { useHomeFetch } from "../hooks/useHomeFetch";

//image
import NoImage from '../images/no_image.jpg';
import { Button } from "./Button";
import Grid from "./Grid";
import HeroImage from "./HeroImage";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";
import Thumb from "./Thumb";

const Home = () => {

  const { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore } = useHomeFetch();

  if (error) return <div>Soemthing went wrong...</div>
  return (
    <>
      {state.results[0] && !searchTerm ?
        <HeroImage
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
        : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
        {state.results.map(movie => (
          <Thumb key={movie.id}
            clickable
            title={`${movie.title} (${movie.release_date?.split('-')[0]})`}
            image={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : NoImage}
            movieId={movie.id} />
        ))}
      </Grid>
      {loading && <Spinner />}
      {state.page < state.total_pages && !loading && (
        <Button callback={() => setIsLoadingMore(true)} text='Load More' />
      )}
    </>
  )
}
export default Home;