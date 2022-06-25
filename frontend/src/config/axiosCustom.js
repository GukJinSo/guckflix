import { Axios } from 'axios';
import apiConfig from './apiConfig';
import queryString from 'query-string';

const axiosCustom = Axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-type': 'application/json',
  },
  paramsSerializer: (params) =>
    queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
});

export default axiosCustom;
