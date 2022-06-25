import { useEffect } from 'react';
import axiosCustom from './config/axiosCustom';
import tmdbApi, { movieType } from './config/tmdbApi';
import axios from 'axios';
import apiConfig from './config/apiConfig';

function App() {
  useEffect(() => {
    const getList = async () => {
      const params = {};

      const response = await tmdbApi.getMoviesList(movieType.popular, {
        params,
      });
      console.log(response);
    };
    getList();
  }, []);

  return <div className="App">App</div>;
}

export default App;
