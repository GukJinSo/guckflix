import React, { useEffect, useState } from 'react';
import tmdbApi, { VideoSliderActionType } from '../../config/tmdbApi';
import apiConfig from '../../config/apiConfig';
import './videoSlider.css';
import { useNavigate, useParams } from 'react-router';
import noImage from '../../img/w500_no_image.png';

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

const VideoSliderItems = ({ item, action }) => {
  const [sliderItems, setSliderItems] = useState([]);
  const { id, category } = useParams();
  useEffect(() => {
    const getList = async () => {
      let params = {};
      let response;
      let arr = [];
      switch (action) {
        // 메인 화면인 경우
        case VideoSliderActionType.main:
          response = await tmdbApi.getList(item.category, item.type, {
            params,
          });
          response.data.results.forEach((e) => {
            let vo = {
              category: item.category,
              name: e.title ? e.title : e.name,
              url: e.poster_path
                ? apiConfig.w500Image(e.poster_path)
                : apiConfig.w500Image(e.profile_path),
              id: e.id,
            };
            vo.url = vo.url === null ? noImage : vo.url;
            arr.push(vo);
          });
          break;
        // 상세페이지에서 유사영화를 찾는 경우
        case VideoSliderActionType.similar:
          response = await tmdbApi.getSimilar(category, id, {
            params,
          });
          response.data.results.forEach((e) => {
            let vo = {
              category: category,
              name: e.title ? e.title : e.name,
              url: e.poster_path
                ? apiConfig.w500Image(e.poster_path)
                : apiConfig.w500Image(e.profile_path),
              id: e.id,
            };
            vo.url = vo.url === null ? noImage : vo.url;
            arr.push(vo);
          });
          break;

        case VideoSliderActionType.catalog:
          break;

        // 배역 찾는 경우
        case VideoSliderActionType.credit:
          params = {};
          response = await tmdbApi.getCredit(category, id, {
            params,
          });
          response.data.cast.forEach((e) => {
            let vo = {
              category: item.category,
              name: e.title ? e.title : e.name,
              url: e.poster_path
                ? apiConfig.w500Image(e.poster_path)
                : apiConfig.w500Image(e.profile_path),
              id: e.id,
            };
            vo.url = vo.url === null ? noImage : vo.url;
            arr.push(vo);
          });
          break;
        default:
          break;
      }
      setSliderItems(arr);
    };
    getList();
  }, []);

  return (
    <div className="videoSlider__items">
      <div className="videoSlider__items__title">{item.text}</div>
      <div className="videoSlider__items__cards">
        <div className="videoSlider__items__cards__wrap">
          {sliderItems.map((e, i) => {
            return <VideoCard data={e} action={action} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export const VideoCard = ({ data, action }) => {
  const [hover, setHover] = useState(false);
  const style = {
    transform:
      hover & (action !== VideoSliderActionType.credit)
        ? 'scale(1)'
        : 'scale(0.95)',
    color: hover & (action !== VideoSliderActionType.credit) ? 'red' : 'white',
    cursor:
      hover & (action !== VideoSliderActionType.credit) ? 'pointer' : 'revert',
    transition: '0.5s ease',
  };

  const navigate = useNavigate();
  return (
    <div
      className="videoSlider__items__cards__wrap__card"
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        switch (action) {
          case VideoSliderActionType.credit:
            break;
          default:
            navigate(`/detail/${data.category}/${data.id}`);
            break;
        }
      }}
    >
      <div className="videoSlider__items__cards__wrap__card__img">
        <img src={`${data.url}`} alt="" />
      </div>
      <div className="videoSlider__items__cards__wrap__card__title">
        {data.name}
      </div>
    </div>
  );
};
