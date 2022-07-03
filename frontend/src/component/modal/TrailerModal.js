import React, { useEffect, useRef, useState } from 'react';
import './TrailerModal.css';
import tmdbApi, { category, videoType } from '../../config/tmdbApi';
import apiConfig from '../../config/apiConfig';

const TrailerModal = ({ item }) => {
  const iframeRef = useRef();
  const [iframeSrc, setIframeSrc] = useState();
  useEffect(() => {
    const getVideo = async () => {
      const response = await tmdbApi.getVideos(category.movie, item.id);
      // 관련 비디오가 많은 경우 트레일러만 가져오겠다
      let youtubeUrlKey = response.data.results.filter((e) => {
        return e.type === videoType.trailer ? e : '';
      });
      iframeRef.current.src = apiConfig.youtubeUrl + youtubeUrlKey[0].key;
      setIframeSrc(iframeRef.current.src);
    };
    getVideo();
  }, []);

  const modalRef = useRef();

  return (
    <div className={`modal none`} id={`${item.id}`} ref={modalRef}>
      <div
        onClick={() => {
          // 다른 곳을 클릭할 경우 꺼짐
          modalRef.current.classList.add('none');
          iframeRef.current.src = '';
          iframeRef.current.src = iframeSrc;
        }}
      >
        <iframe
          ref={iframeRef}
          src=""
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
