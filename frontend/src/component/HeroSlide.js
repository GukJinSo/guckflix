import React, { useEffect, useRef, useState } from 'react';
import apiConfig from '../config/apiConfig';
import '../App.css';

const HeroSlideItems = ({ movieItems }) => {
  // 슬라이더 액션

  let isPressed = true;
  let clientMouseX = 0;
  const mouseDownAction = (e) => {
    isPressed = true;
    clientMouseX = e.clientX;
  };

  const sliderAction = () => {
    const heroSlide = Array.from(
      document.getElementsByClassName('heroSlide__items'),
    );
  };

  const mouseUpAction = (e) => {
    if (isPressed) {
      if (e.clientX - clientMouseX > 100) {
        console.log('슬라이더 앞으로');
        sliderAction();
      }
      if (clientMouseX - e.clientX > 100) {
        console.log('슬라이더 뒤로');
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
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div className="heroSlide">
        {movieItems.map((e, i) => {
          const backgroundImageURL = apiConfig.originalImage(e.backdrop_path);
          const posterImageURL = apiConfig.w500Image(e.poster_path);
          console.log(e);
          return (
            <div
              className="heroSlide__items"
              style={{
                backgroundImage: `url(${backgroundImageURL})`,
              }}
            >
              <div className="heroSlide__items__content">
                <div className="heroSlide__items__content__info">
                  <div className="heroSlide__items__content__info__title">
                    {e.title}
                  </div>
                  <div className="heroSlide__items__content__info__overview">
                    {e.overview}
                  </div>
                </div>
                <img
                  className="heroSlide__items__content__w500img"
                  src={`${posterImageURL}`}
                  alt=""
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
/*

*/
const HeroSlide = ({ movieItems }) => {
  useEffect(() => {}, []);

  return <HeroSlideItems movieItems={movieItems} />;
};

export default HeroSlide;
