import React, { useEffect, useState } from 'react';
import HeroSlide from '../component/heroSlide/HeroSlide.jsx';
import tmdbApi, { movieType } from '../config/tmdbApi';

const Home = () => {
  return (
    <div>
      <HeroSlide />
    </div>
  );
};

export default Home;
