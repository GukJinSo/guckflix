import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { VideoCard } from '../../component/videoSlider/VideoSlider';
import apiConfig from '../../config/apiConfig';
import tmdbApi, {
  sortingType,
  VideoSliderActionType,
} from '../../config/tmdbApi';
import noImage from '../../img/w500_no_image.png';
import './catalog.css';

const Catalog = () => {
  const { category } = useParams();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [videos, setVideos] = useState([]);

  let arr = [];
  useEffect(() => {
    const getVideo = async () => {
      const params = {};
      const response = await tmdbApi.getList(category, sortingType.popular, {
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
        setVideos(arr);
      });
    };
    getVideo();
  }, []);

  useEffect(() => {
    console.log(setVideos);
  }, [setVideos]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchKeyword(e.target.value);
    }
  };

  const action = VideoSliderActionType.catalog;
  const text = { catalog: '카탈로그', search: '검색' };
  return (
    <div className="catalog">
      <div className="catalog__search">
        <div className="catalog__search__text">{text.search}</div>
        <input value={searchKeyword} onKeyDown={handleKeyPress} type="text" />
      </div>
      <div className="catalog__videos">
        {videos.map((e, i) => {
          return <VideoCard data={e} key={i} action={action} />;
        })}
      </div>
    </div>
  );
};

export default Catalog;
