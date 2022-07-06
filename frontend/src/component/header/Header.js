import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../img/header_logo.png';
import './header.css';

const Header = () => {
  // Nav 요소
  const headerNav = [
    { text: 'Home', path: '/' },
    { text: 'Movie', path: '/movie' },
    { text: 'TV', path: '/tv' },
  ];

  const nav = useNavigate();

  // 헤더 축소 애니메이션
  const header = useRef(null);
  const shrinkHeader = () => {
    if (window.scrollY > 100) {
      header.current.classList.add('shrinkHeader');
    } else {
      header.current.classList.remove('shrinkHeader');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div className="header" ref={header}>
      <div
        className="header__logo"
        onClick={() => {
          nav('/');
        }}
      >
        <img src={logo} className="header__logo__img" alt="" />
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
