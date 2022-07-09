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
  const [videos, setVideos] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    isQuery: false,
  });

  const [query, setQuery] = useState('');

  let arr = [];

  const getVideo = async () => {
    let response;
    switch (params.isQuery) {
      case false:
        response = await tmdbApi.getList(category, sortingType.popular, {
          params: {
            page: params.page,
          },
        });
        break;
      case true:
        response = await tmdbApi.getSearchResult(category, {
          params: {
            page: params.page,
            query: query,
          },
        });
        console.log(response.data.results);
        break;
    }
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
    setVideos([...videos, ...arr]);
    arr = [];
  };

  useEffect(() => {
    setVideos([]);
    setQuery('');
    setParams({ ...params, page: 1, isQuery: false });
  }, [category]);

  useEffect(() => {
    getVideo();
  }, [params]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setVideos([]);
      setParams({ ...params, isQuery: true });
    }
  };
  const changeHandle = (e) => {
    setQuery(e.target.value);
  };

  const action = VideoSliderActionType.catalog;
  const text = {
    catalog: '카탈로그',
    search: '제목을 입력하세요',
    loadMore: '더 찾기',
  };
  return (
    <div className="catalog">
      <div className="catalog__search">
        <input
          value={query}
          onKeyDown={handleKeyPress}
          onChange={changeHandle}
          type="text"
          placeholder={`${text.search}`}
        />
      </div>
      <div className="catalog__videos__wrap">
        <div>
          <div className="catalog__videos">
            {videos.map((e, i) => {
              return <VideoCard data={e} key={i} action={action} />;
            })}
          </div>
        </div>
      </div>
      <div className="catalog__loadMore">
        <button
          className="catalog__loadMore__button"
          onClick={() => {
            setParams({ ...params, page: params.page + 1 });
          }}
        >
          {text.loadMore}
        </button>
      </div>
    </div>
  );
};

export default Catalog;
