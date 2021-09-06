import { useState, useEffect, useCallback } from 'react';
import API from "../API";
import { isPersistedState } from '../helpers';
const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);

  const fetchMovie = useCallback(async () => {
    try {
      const movie = await API.fetchMovie(movieId)
      if (!movie.hasOwnProperty('id')) {
        throw new Error(movie.status_message);
      }
      const credits = await API.fetchCredits(movieId)
      const directors = credits.crew.filter(i => i.job === 'Director');

      setState({
        ...movie,
        actors: credits.cast,
        directors
      })
      setLoading(false);
    }
    catch (e) {
      console.log(e);
      setError(true);
      setLoading(false);

    }
  }, [movieId])

  useEffect(() => {
    const sessionState = isPersistedState(movieId);
    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }
    fetchMovie();

  }, [movieId, fetchMovie,])


  useEffect(() => {
    const movieData = JSON.stringify(state);
    if (movieData === '{}') return;
    sessionStorage.setItem(movieId, movieData);
  }, [movieId, state])

  return { state, loading, error };
}
export default useMovieFetch;