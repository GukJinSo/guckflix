import axiosCustom from './axiosCustom.js';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const videoType = {
  trailer: 'Trailer',
};

export const movieType = {
  top_rated: 'top_rated',
  upcoming: 'upcoming',
  popular: 'popular',
  now_playing: 'now_playing',
};

export const TvType = {
  top_rated: 'top_rated',
  popular: 'popular',
};

export const VideoSliderActionType = {
  main: 'main',
  similar: 'similar',
  catalog: 'catalog',
  credit: 'credit',
};

const tmdbApi = {
  getList: (cate, type, params) => {
    const url = category[cate] + '/' + movieType[type];
    return axiosCustom.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosCustom.get(url, { params: {} });
  },
  getDetail: (cate, id, params) => {
    const url = category[cate] + '/' + id;
    return axiosCustom.get(url, params);
  },
  getSimilar: (cate, id, params) => {
    const url = category[cate] + '/' + id + '/similar';
    return axiosCustom.get(url, params);
  },
  getCredit: (cate, id, params) => {
    const url = category[cate] + '/' + id + '/credits';
    return axiosCustom.get(url, params);
  },
};

export default tmdbApi;
