import React, { useEffect, useState } from 'react';
import Footer from '../component/footer/Footer.js';
import HeroSlide from '../component/heroSlide/HeroSlide.jsx';
import VideoSlider from '../component/videoSlider/VideoSlider.js';
import {
  category,
  movieType,
  TvType,
  VideoSliderActionType,
} from '../config/tmdbApi.js';

const Home = () => {
  const showList = [
    {
      category: category.movie,
      type: movieType.top_rated,
      text: '최고 평점 명화',
    },
    {
      category: category.movie,
      type: movieType.popular,
      text: '최고 인기 영화',
    },
    {
      category: category.tv,
      type: TvType.popular,
      text: '최고 인기 시리즈',
    },
    {
      category: category.tv,
      type: TvType.top_rated,
      text: '명작 시리즈',
    },
  ];
  const action = VideoSliderActionType.main;
  return (
    <div>
      <HeroSlide />
      <VideoSlider showList={showList} action={action} />
    </div>
  );
};

export default Home;
