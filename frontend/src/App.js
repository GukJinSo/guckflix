import './App.css';
import Header from './component/header/Header.js';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Info from './page/Info';
import Footer from './component/footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" exact={true} element={<Home />}></Route>
        <Route path="/movie/:id" exact={true} element={<Info />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
