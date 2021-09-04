import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//components
import Header from './components/header';
import Home from './components/Home';
import Movie from './components/Movie';
import NotFound from './components/NotFound';

//styles
import { GlobalStyle } from './GlobalStyle';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:movieId' element={<Movie />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
