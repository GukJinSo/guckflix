import React, { useEffect, useRef, useState } from 'react';
import apiConfig from '../../config/apiConfig';
import './heroSlide.css';

const HeroSlideItems = ({ movieItems }) => {
  // 슬라이더 액션
  let isPressed = true;
  let clientMouseX = 0;
  const mouseDownAction = (e) => {
    isPressed = true;
    clientMouseX = e.clientX;
  };

  let currentIdx = 0;
  const mouseUpAction = (e) => {
    if (isPressed) {
      const heroSlide = document.querySelector('.heroSlide');
      const slideItems = document.querySelectorAll('.heroSlide__items');
      var first = slideItems[0];
      var last = slideItems[slideItems.length - 1];

      // 슬라이더 뒤로
      if (e.clientX - clientMouseX > 100) {
        if (currentIdx != 0) {
          currentIdx--;
        } else if (currentIdx == 0) {
          currentIdx = slideItems.length - 1;
        }
        // 슬라이더 앞으로
      } else if (clientMouseX - e.clientX > 100) {
        if (currentIdx != slideItems.length - 1) {
          currentIdx++;
        } else if (currentIdx == slideItems.length - 1) {
          currentIdx = 0;
        }
        // 이동값이 100을 못 넘으면
      } else {
        return;
      }
      heroSlide.style.transform = 'translateX(' + currentIdx * -1 * 100 + 'vw)';
    }
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
      <div
        className="heroSlide"
        style={{ width: `${movieItems.length}` * 100 + 'vw' }}
      >
        {movieItems.map((e, i) => {
          const backgroundImageURL = apiConfig.originalImage(e.backdrop_path);
          const posterImageURL = apiConfig.w500Image(e.poster_path);
          console.log(e);
          return (
            <div
              className="heroSlide__items"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),' +
                  `url(${backgroundImageURL})`,
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
