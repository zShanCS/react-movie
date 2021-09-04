import { useState, useEffect, useCallback } from 'react';
import API from "../API";
const useMovieFetch = (movieId) => {
  const [state, setState] = useState({ });
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
    fetchMovie();
  }, [movieId, fetchMovie])

  return { state, loading, error };
}
export default useMovieFetch;