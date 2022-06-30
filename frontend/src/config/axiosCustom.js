import axios from 'axios';
import apiConfig from './apiConfig';
import queryString from 'query-string';

const axiosCustom = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-type': 'application/json',
  },
  paramsSerializer: (params) =>
    queryString.stringify({
      ...params,
      api_key: apiConfig.apiKey,
      // language: 'ko',
    }),
});

export default axiosCustom;
