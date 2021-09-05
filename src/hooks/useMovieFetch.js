import { useState, useEffect, useCallback } from 'react';
import API from "../API";
import { isPersisterState } from '../helpers';
const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false);

  const fetchMovie = useCallback(async () => {
    try {
      const movie = await API.fetchMovie(movieId)
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
      console.log(e)
      setError(true);
    }
  }, [movieId])

  useEffect(() => {
    const sessionState = isPersisterState(movieId);
    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }
    fetchMovie();

  }, [movieId, fetchMovie,])


  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state])

  return { state, loading, error };
}
export default useMovieFetch;