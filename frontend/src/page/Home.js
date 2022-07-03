import React, { useEffect, useState } from 'react';
import HeroSlide from '../component/heroSlide/HeroSlide.jsx';
import VideoSLider from '../component/videoSlider/VideoSLider.js';
import tmdbApi, { movieType } from '../config/tmdbApi';

const Home = () => {
  return (
    <div>
      <HeroSlide />
      <VideoSLider />
    </div>
  );
};

export default Home;
