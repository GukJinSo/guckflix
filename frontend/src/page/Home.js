import React, { useEffect, useState } from 'react';
import Footer from '../component/footer/Footer.js';
import HeroSlide from '../component/heroSlide/HeroSlide.jsx';
import VideoSlider from '../component/videoSlider/VideoSlider.js';

const Home = () => {
  return (
    <div>
      <HeroSlide />
      <VideoSlider />
    </div>
  );
};

export default Home;
