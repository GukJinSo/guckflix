import React, { useEffect, useRef, useState } from 'react';
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
        response.data.results.forEach((e, i) => {
          if (i < 20) {
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
          }
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
        response.data.cast.forEach((e, i) => {
          if (i < 20) {
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
          }
        });
        break;
      default:
        break;
    }
    setSliderItems([...arr]);
    console.log('sliderItems', sliderItems);
  };

  useEffect(() => {
    resetSlider();
    getList();
  }, [id]);

  const wrapRef = useRef(null);
  const slideConfig = {
    left: 'left',
    right: 'right',
  };
  let moved = 0;

  const resetSlider = () => {
    wrapRef.current.style.transform = `translateX(0px)`;
  };

  const sliderAction = (direction) => {
    const totalWidth = wrapRef.current.scrollWidth;
    const viewWidth = wrapRef.current.offsetWidth;
    // 뒤로(왼쪽) 가는 경우
    if (direction === slideConfig.left) {
      moved = moved + viewWidth;

      // 너무 멀리 가면
      if (moved > 0) {
        moved = 0;
      }

      // 앞으로(오른쪽) 가는 경우
    } else if (direction === slideConfig.right) {
      moved = moved + -viewWidth;

      // 너무 멀리 가면
      if (totalWidth - Math.abs(moved) <= viewWidth) {
        moved = -(totalWidth - viewWidth);
      }
    }
    wrapRef.current.style.transform = `translateX(${moved}px)`;
  };
  const navigate = useNavigate();
  return (
    <div className="videoSlider__items">
      <div className="videoSlider__items__title">
        {item.text}
        <div style={{ display: 'flex', gap: '0.5vw' }}>
          <button onClick={() => sliderAction(slideConfig.left)}>
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <button onClick={() => sliderAction(slideConfig.right)}>
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
          <button onClick={() => navigate(`/catalog/${item.category}`)}>
            더 보기
          </button>
        </div>
      </div>
      <div className="videoSlider__items__buttons"></div>

      <div className="videoSlider__items__cards">
        <div className="videoSlider__items__cards__wrap" ref={wrapRef}>
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

  const handleImageError = (e) => {
    e.target.src = noImage;
  };

  const [loading, setLoading] = useState(true);

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
        <img
          src={loading ? data.url : noImage}
          onError={handleImageError}
          alt=""
          onLoad={() => setLoading(true)}
        />
      </div>
      <div className="videoSlider__items__cards__wrap__card__title">
        {loading ? data.name : ''}
      </div>
    </div>
  );
};
