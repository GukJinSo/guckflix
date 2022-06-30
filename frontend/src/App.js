import './App.css';
import Header from './component/header/Header.js';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie" exact={true}></Route>
      </Routes>
    </div>
  );
}

export default App;
