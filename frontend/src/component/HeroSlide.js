import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import apiConfig from '../config/apiConfig';
import '../App.css';

const HeroSlideItems = ({ items }) => {
  return (
    <div className="heroSlide__items">
      {items.map((e, i) => (
        <div className="heroSlide__items__index">
          <img
            src={apiConfig.originalImage(e.backdrop_path)}
            className="heroSlide__backgroundImage"
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

const HeroSlide = ({ items }) => {
  const heroSlideRef = useRef(null);
  useEffect(() => {
    if (heroSlideRef.current) {
      const arr = document.getElementsByClassName('heroSlide__backgroundImage');
      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
      }
    }
  }, []);

  return (
    <div className="heroSlide" ref={heroSlideRef}>
      <div>text only</div>
      <HeroSlideItems items={items} />
      <div>text only</div>
      <div>text only</div>
      <div>text only</div>
      <div>text only</div>
    </div>
  );
};

export default HeroSlide;
