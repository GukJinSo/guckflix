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

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = 'movie/' + movieType[type];
    return axiosCustom.get(url, params);
  },
  getTVList: (type, params) => {
    const url = 'tv/' + TvType[type];
    return axiosCustom.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosCustom.get(url, { params: {} });
  },
};

export default tmdbApi;
