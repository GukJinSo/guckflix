import React, { useEffect, useRef, useState } from 'react';
import apiConfig from '../../config/apiConfig';
import tmdbApi, { movieType } from '../../config/tmdbApi';
import TrailerModal from '../modal/TrailerModal';
import './heroSlide.css';
import { mouseUpAction, mouseDownAction } from './slider';

const HeroSlideItems = ({ item }) => {
  const backgroundImageURL = apiConfig.originalImage(item.backdrop_path);
  const posterImageURL = apiConfig.w500Image(item.poster_path);

  return (
    <div
      className="heroSlide__items"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),' +
          `url(${backgroundImageURL})`,
      }}
    >
      <div className="heroSlide__items__content">
        <div className="heroSlide__items__content__info">
          <div className="heroSlide__items__content__info__title">
            {item.title}
          </div>
          <div className="heroSlide__items__content__info__overview">
            {item.overview}
          </div>
          <div className="heroSlide__items__content__info__buttonDiv">
            <button
              className="heroSlide__items__content__info__buttonDiv__button"
              onClick={() => {
                const id = document.getElementById(`${item.id}`);
                id.classList.remove('none');
              }}
            >
              <span className="material-symbols-outlined">play_circle</span>
              Watch Trailer
            </button>
            <button className="heroSlide__items__content__info__buttonDiv__button">
              <span className="material-symbols-outlined">info</span>
              More info
            </button>
          </div>
        </div>
        <img
          className="heroSlide__items__content__w500img"
          src={`${posterImageURL}`}
          alt=""
        />
      </div>
      <TrailerModal item={item} />
    </div>
  );
};

const HeroSlide = () => {
  // 데이터 가져오기
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const params = {};
      const response = await tmdbApi.getMoviesList(movieType.popular, {
        params,
      });
      setMovieItems(response.data.results.slice(1, 7));
    };
    getList();
  }, []);

  // 마우스 액션
  useEffect(() => {
    window.addEventListener('mouseup', (e) => mouseUpAction(e));
    window.addEventListener('mousedown', (e) => mouseDownAction(e));
    return () => {
      window.removeEventListener('mouseup', mouseUpAction);
      window.removeEventListener('mousedown', mouseDownAction);
    };
  }, []);

  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        className="heroSlide"
        style={{ width: `${movieItems.length}` * 100 + 'vw' }}
      >
        {movieItems.map((e, i) => {
          return <HeroSlideItems key={i} item={e} />;
        })}
      </div>
    </div>
  );
};

export default HeroSlide;
