import { useState, useEffect, useCallback } from "react";
import API from "../API";

//helpers
import { isPersistedState } from "../helpers";
const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0
}

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  console.log(searchTerm);

  const fetchMovies = useCallback(async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);
      setState(prev => {
        return {
          ...movies,
          results:
            page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
        }
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [])

  //search and initial render
  useEffect(() => {

    if (!searchTerm) {
      const sessionState = isPersistedState('homeState')
      if (sessionState) {
        setState(sessionState)
        return;
      }
    }


    setState(initialState)
    fetchMovies(1, searchTerm)
  }, [searchTerm, fetchMovies]);

  //load more
  useEffect(() => {
    if (!isLoadingMore) return;
    console.log('reloading started for more movies');
    fetchMovies(state.page + 1, searchTerm);
    setIsLoadingMore(false);

  }, [isLoadingMore, searchTerm, state.page, fetchMovies]);

  //write to sessionStorage
  useEffect(() => {
    if (!searchTerm) sessionStorage.setItem('homeState', JSON.stringify(state))
  }, [searchTerm, state])


  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}