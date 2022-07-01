import React, { useEffect, useRef, useState } from 'react';
import './TrailerModal.css';
import tmdbApi, { category, videoType } from '../../config/tmdbApi';
import apiConfig from '../../config/apiConfig';

const TrailerModal = ({ item }) => {
  const iframeRef = useRef();
  useEffect(() => {
    const getVideo = async () => {
      const response = await tmdbApi.getVideos(category.movie, item.id);
      // 관련 비디오가 많은 경우 트레일러만 가져오겠다
      const youtubeUrlKey = response.data.results.filter((e, i) => {
        if (e.type === videoType.trailer) return e;
      });
      iframeRef.current.src = apiConfig.youtubeUrl + youtubeUrlKey[0].key;
    };
    getVideo();
  }, []);

  return (
    <div className={`modal none`} id={`${item.id}`}>
      <div
        onClick={() => {
          document.getElementById(item.id).classList.add('none');
        }}
      >
        <div>
          <iframe
            ref={iframeRef}
            src=""
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
