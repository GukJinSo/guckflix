import axiosCustom from './axiosCustom';

export const category = {
  movie: 'movie',
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
};

export default tmdbApi;
