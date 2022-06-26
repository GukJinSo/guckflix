import React from 'react';
import apiConfig from '../config/apiConfig';
import '../App.css';

const HeroSlide = ({ items, index }) => {
  console.log(items);
  const background = apiConfig.originalImage(items.backdrop_path);

  return (
    <div className={index === 0 ? 'heroSlide active' : 'heroSlide'}>
      <img src={background} className="background-image" alt="" />
    </div>
  );
};

export default HeroSlide;
