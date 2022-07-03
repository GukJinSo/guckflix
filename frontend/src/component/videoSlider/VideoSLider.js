import React, { useEffect, useState } from 'react';
import tmdbApi, { category, movieType, TvType } from '../../config/tmdbApi';
import apiConfig from '../../config/apiConfig';
import './videoSlider.css';
import { useNavigate } from 'react-router';

const VideoCard = ({ cardItem }) => {
  const posterImageURL = apiConfig.w500Image(cardItem.poster_path);
  const navigate = useNavigate();
  return (
    <div
      className="videoSlider__items__cards__wrap__card"
      onClick={() => {
        navigate(`/movie/${cardItem.id}`);
      }}
    >
      <div className="videoSlider__items__cards__wrap__card__img">
        <img src={`${posterImageURL}`} alt="" />
      </div>
      <div className="videoSlider__items__cards__wrap__card__title">
        {cardItem.name ? cardItem.name : cardItem.title}
      </div>
    </div>
  );
};

const VideoSliderItems = ({ item }) => {
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const params = { page: 1 };
      let response;
      (await item.category) === category.movie
        ? (response = await tmdbApi.getMoviesList(item.type, {
            params,
          }))
        : (response = await tmdbApi.getTVList(item.type, {
            params,
          }));
      setMovieItems(response.data.results);
    };
    getList();
  }, []);

  return (
    <div className="videoSlider__items">
      <div className="videoSlider__items__title">{item.text}</div>
      <div className="videoSlider__items__cards">
        <div className="videoSlider__items__cards__wrap">
          {movieItems.map((e, i) => {
            return <VideoCard cardItem={e} />;
          })}
        </div>
      </div>
    </div>
  );
};

const VideoSlider = () => {
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
  return (
    <div className="videoSlider">
      {showList.map((e, i) => {
        return <VideoSliderItems item={e} key={i} />;
      })}
    </div>
  );
};
export default VideoSlider;
