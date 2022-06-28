import React, { useEffect, useRef, useState } from 'react';
import apiConfig from '../config/apiConfig';
import '../App.css';

const HeroSlideItems = ({ movieItems }) => {
  // 슬라이더 액션
  let heroSlide = [];

  let isPressed = true;
  let clientMouseX = 0;
  const mouseDownAction = (e) => {
    isPressed = true;
    clientMouseX = e.clientX;
  };

  const sliderAction = () => {
    heroSlide = Array.from(document.getElementsByClassName('heroSlide__items'));
    if (heroSlide[0].style.transform === 'translateX(0px)') {
      heroSlide[0].style.transform = 'translateX(-100vw)';
    } else if (heroSlide[0].style.transform === 'translateX(100vw)') {
      heroSlide[0].style.transform = 'translateX(-200vw)';
    } else {
      heroSlide[0].style.transform = 'translateX(0px)';
    }
  };

  const mouseUpAction = (e) => {
    if (isPressed) {
      if (e.clientX - clientMouseX > 100) {
        console.log('>101110');
        sliderAction();
      }
    }
    clientMouseX = 0;
    isPressed = false;
  };

  // 마우스 액션
  useEffect(() => {
    window.addEventListener('mouseup', (e) => mouseUpAction(e));
    window.addEventListener('mousedown', (e) => mouseDownAction(e));
    return () => {
      window.removeEventListener('mouseup', mouseUpAction);
      window.removeEventListener('mousedown', mouseDownAction);
    };
  }, []);

  // 컴포넌트
  useEffect(() => {
    if (movieItems) {
    }
    console.log('rendered');
  }, []);

  return (
    <div className="heroSlide">
      {movieItems.map((e, i) => (
        <div className="heroSlide__items">
          <img
            src={apiConfig.originalImage(e.backdrop_path)}
            className="heroSlide__backgroundImage"
            alt=""
          />
          <img
            src={apiConfig.w500Image(e.poster_path)}
            className="heroSlide__modalImage"
            alt=""
          />
        </div>
      ))}
      <button>Left</button>
      <button>Right</button>
    </div>
  );
};

const HeroSlide = ({ movieItems }) => {
  useEffect(() => {}, []);

  return <HeroSlideItems movieItems={movieItems} />;
};

export default HeroSlide;
