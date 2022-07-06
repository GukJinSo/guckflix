import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import VideoSlider from '../../component/videoSlider/VideoSlider';
import apiConfig from '../../config/apiConfig';
import tmdbApi, {
  VideoSliderActionType,
  videoType,
} from '../../config/tmdbApi';
import './detail.css';

const Detail = () => {
  const { id, category } = useParams();
  const [detail, setDetail] = useState([]);
  const [iframeSrc, setIframeSrc] = useState();

  useEffect(() => {
    console.log('업데이트');
    const getDetail = async () => {
      const params = {};
      const response = await tmdbApi.getDetail(category, id, { params });
      setDetail(response.data);
    };

    const getVideo = async () => {
      const response = await tmdbApi.getVideos(category, id);
      // 관련 비디오가 많은 경우 트레일러만 가져오겠다
      let youtubeUrlKey = response.data.results.filter(
        (e) => e.type === videoType.trailer,
      );
      //없다면 트레일러가 아닌 영상이라도 삽입
      setIframeSrc(
        youtubeUrlKey.length !== 0
          ? apiConfig.youtubeUrl + youtubeUrlKey[0].key
          : apiConfig.youtubeUrl + response.data.results[0].key,
      );
    };
    getDetail();
    getVideo();
  }, [id, category]);

  const showList = [
    [
      {
        category: category,
        text: '배역',
      },
    ],
    [
      {
        category: category,
        text: '유사한 작품',
      },
    ],
  ];

  const similar = VideoSliderActionType.similar;
  const credit = VideoSliderActionType.credit;
  const backgroundImageURL = apiConfig.originalImage(detail.backdrop_path);
  const posterImageURL = apiConfig.w500Image(detail.poster_path);

  return (
    <div className="detail">
      <div
        className="detail__tops"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)),' +
            `url(${backgroundImageURL})`,
        }}
      >
        <div className="detail__tops__title">
          {detail.title ? detail.title : detail.name}
        </div>
        <div className="detail__tops__sub">
          {detail.runtime && (
            <div className="detail__tops__sub__runtime">{detail.runtime}M</div>
          )}

          {detail.genres &&
            detail.genres.map((e, i) => {
              return (
                <div className="detail__tops__sub__genre__item" key={i}>
                  {e.name}
                </div>
              );
            })}
        </div>
        <div className="detail__tops__posterSection">
          <img
            src={`${posterImageURL}`}
            className="detail__tops__posterSection__img"
            alt=""
          />
          <Iframe src={iframeSrc} title={id} key={`iframe out${id}`} />
        </div>
        {detail.tagline && (
          <div className="detail__tops__tagline">{detail.tagline}</div>
        )}
      </div>
      <div className="detail__bottoms">
        <div className="detail__bottoms__overview">
          <div className="detail__bottoms__overview__title">개요</div>

          <div className="detail__bottoms__overview__text">
            {detail.overview}
          </div>
        </div>
        <div className="detail__bottoms__casts">
          <VideoSlider showList={showList[0]} action={credit} />
        </div>
        <div className="detail__bottoms__similars">
          <VideoSlider showList={showList[1]} action={similar} />
        </div>
      </div>
    </div>
  );
};

const Iframe = ({ src, id }) => {
  useEffect(() => {
    console.log('if mount');
    return () => {
      console.log('un mount');
    };
  }, []);

  return (
    <iframe
      className="detail__tops__posterSection__trailer"
      src={src}
      title={id}
      key={`iframe inn${id}`}
    />
  );
};
export default Detail;