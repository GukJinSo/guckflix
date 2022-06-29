import React, { useEffect, useState } from 'react';
import HeroSlide from '../component/HeroSlide';
import tmdbApi, { movieType } from '../config/tmdbApi';

const Home = () => {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    // console.log('조부모 실행')
    const getList = async () => {
      const params = {};
      const response = await tmdbApi.getMoviesList(movieType.popular, {
        params,
      });
      // console.log('async 실행');
      setMovieItems(response.data.results.slice(1, 4));
    };
    getList();
  }, []);

  return <HeroSlide movieItems={movieItems} />;
};

export default Home;
