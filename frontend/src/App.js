import { useEffect, useState } from 'react';
import tmdbApi, { movieType } from './config/tmdbApi';
import HeroSlide from './component/HeroSlide';
import './App.css';
import Header from './component/Header';

function App() {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const params = {};
      const response = await tmdbApi.getMoviesList(movieType.popular, {
        params,
      });
      setMovieItems(response.data.results.slice(1, 4));
    };
    getList();
  }, []);

  return (
    <div className="App">
      <Header />
      <HeroSlide items={movieItems} />
    </div>
  );
}

export default App;
