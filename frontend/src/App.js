import './App.css';
import Header from './component/header/Header.js';
import { Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Footer from './component/footer/Footer';
import Catalog from './page/catalog/Catalog';
import Detail from './page/detail/Detail';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/catalog/:category" element={<Catalog />}></Route>
        <Route path="/detail/:category/:id" element={<Detail />}></Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
