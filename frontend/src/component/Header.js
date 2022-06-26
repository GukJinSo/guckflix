import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/header_logo.png';
const Header = () => {
  const headerNav = [
    { text: 'Home', path: '/' },
    { text: 'Movie', path: '/movie' },
    { text: 'TV', path: '/tv' },
  ];

  return (
    <div className="header">
      <div className="header__logo">
        <img
          src={logo}
          className="header__logo__img"
          alt=""
          style={{ height: '100%' }}
        />
      </div>
      <ul className="header__items">
        {headerNav.map((e) => {
          return (
            <li className="header__itmes__li">
              <Link to={e.path}>{e.text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
