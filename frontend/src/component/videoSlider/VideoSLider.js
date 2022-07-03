import React, { useEffect, useState } from 'react';
import tmdbApi, { movieType } from '../../config/tmdbApi';

const VideoSLider = () => {
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const a = await tmdbApi.getMoviesList(movieType.popular);
      setMovieItems(a);
    };
    getMovies();
  }, []);

  return <div>MovieItems();</div>;
};

export default VideoSLider;
