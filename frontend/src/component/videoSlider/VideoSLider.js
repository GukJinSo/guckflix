import React, { useEffect, useState } from 'react';
import tmdbApi, {
  category,
  movieType,
  TvType,
  VideoSliderActionType,
} from '../../config/tmdbApi';
import apiConfig from '../../config/apiConfig';
import './videoSlider.css';
import { useNavigate, useParams } from 'react-router';

const VideoCard = ({ cardItem }) => {
  const posterImageURL = apiConfig.w500Image(cardItem.poster_path);
  const navigate = useNavigate();
  return (
    <div
      className="videoSlider__items__cards__wrap__card"
      onClick={() => {
        navigate(`/detail/${cardItem.category}/${cardItem.id}`);
      }}
    >
      <div className="videoSlider__items__cards__wrap__card__img">
        <img src={`${posterImageURL}`} alt="" />
      </div>
      {/* 드라마는 title, 영화는 name을 사용 */}
      <div className="videoSlider__items__cards__wrap__card__title">
        {cardItem.name ? cardItem.name : cardItem.title}
      </div>
    </div>
  );
};

const VideoSliderItems = ({ item, action }) => {
  const [sliderItems, setSliderItems] = useState([]);
  const { id, category } = useParams();
  useEffect(() => {
    const getList = async () => {
      let params;
      let response;
      console.log(action);
      switch (action) {
        // 메인 화면인 경우
        case VideoSliderActionType.main:
          params = {};
          response = await tmdbApi.getList(item.category, item.type, {
            params,
          });
          response.data.results.map((e) => {
            e.category = item.category;
          });
          setSliderItems(response.data.results);
          break;
        // 상세페이지에서 유사영화를 찾는 경우
        case VideoSliderActionType.similar:
          params = {};
          response = await tmdbApi.getSimilar(category, id, {
            params,
          });
          response.data.results.map((e) => {
            e.category = category;
          });
          setSliderItems(response.data.results);

          break;

        case VideoSliderActionType.catalog:
          break;
        default:
          break;
      }
    };
    getList();
  }, [id, category]);

  return (
    <div className="videoSlider__items">
      <div className="videoSlider__items__title">{item.text}</div>
      <div className="videoSlider__items__cards">
        <div className="videoSlider__items__cards__wrap">
          {sliderItems.map((e, i) => {
            return <VideoCard cardItem={e} />;
          })}
        </div>
      </div>
    </div>
  );
};

const VideoSlider = ({ showList, action }) => {
  return (
    <div className="videoSlider">
      {showList.map((e, i) => {
        return <VideoSliderItems item={e} key={i} action={action} />;
      })}
    </div>
  );
};
export default VideoSlider;
