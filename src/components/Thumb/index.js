import React from 'react';
import { Link } from 'react-router-dom';

//styles
import { Image } from './Thumb.styles';

const Thumb = ({ image, movieId, clickable, title }) => (

  <div title={title}>
    {clickable ? (
      <Link to={`/${movieId}`}>
        <Image loading='lazy' src={image} alt={title} />
      </Link>
    ) : (
      <Image loading='lazy' src={image} alt={title} />
    )}

  </div>



);
export default Thumb;