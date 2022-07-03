import axiosCustom from './axiosCustom.js';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const videoType = {
  trailer: 'Trailer',
};

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
  latest: 'latest',
};

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = 'movie/' + movieType[type];
    return axiosCustom.get(url, params);
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos';
    return axiosCustom.get(url, { params: {} });
  },
};

export default tmdbApi;
