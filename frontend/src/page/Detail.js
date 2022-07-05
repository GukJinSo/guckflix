import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import VideoSlider from '../component/videoSlider/VideoSlider';
import apiConfig from '../config/apiConfig';
import tmdbApi, { VideoSliderActionType, videoType } from '../config/tmdbApi';
import './detail.css';

const Detail = () => {
  const { id, category } = useParams();
  const [detail, setDetail] = useState([]);
  const [iframeSrc, setIframeSrc] = useState();
  const iframeRef = useRef();

  const getDetail = async () => {
    const params = {};
    const response = await tmdbApi.getDetail(category, id, { params });
    setDetail(response.data);
  };

  const getVideo = async () => {
    const response = await tmdbApi.getVideos(category, id);
    // 관련 비디오가 많은 경우 트레일러만 가져오겠다
    let youtubeUrlKey = response.data.results.filter((e) => {
      return e.type === videoType.trailer ? e : '';
    });
    iframeRef.current.src = apiConfig.youtubeUrl + youtubeUrlKey[0].key;
    setIframeSrc(iframeRef.current.src);
  };

  useEffect(() => {
    getDetail();
    getVideo();
  }, [id, category]);

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  const showList = [
    {
      category: category,
      text: '유사한 작품',
    },
  ];

  const action = VideoSliderActionType.similar;
  const backgroundImageURL = apiConfig.originalImage(detail.backdrop_path);
  const posterImageURL = apiConfig.w500Image(detail.poster_path);

  return (
    <div className="detail">
      <div
        className="detail__tops"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),' +
            `url(${backgroundImageURL})`,
        }}
      >
        <div className="detail__tops__title">
          {detail.title ? detail.title : detail.name}
        </div>
        <div className="detail__tops__genre"></div>
        <div className="detail__tops__sub">
          {detail.runtime && (
            <div className="detail__tops__sub__runtime">{detail.runtime}M</div>
          )}

          {detail.genres &&
            detail.genres.map((e, i) => {
              return (
                <div className="detail__tops__sub__genre__item">{e.name}</div>
              );
            })}
        </div>
        <div className="detail__tops__posterSection">
          <img
            src={`${posterImageURL}`}
            className="detail__tops__posterSection__img"
            alt=""
          />
          <iframe
            className="detail__tops__posterSection__trailer"
            ref={iframeRef}
            src="iframeSrc"
          />
        </div>
        {detail.tagline && (
          <div className="detail__tops__tagline">{detail.tagline}</div>
        )}
      </div>
      <div className="detail__bottoms">
        <div className="detail__bottoms__overview">{detail.overview}</div>
        <div className="detail__bottoms__casts"></div>
        <div className="detail__bottoms__similars">
          <VideoSlider showList={showList} action={action} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
