import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import apiConfig from '../config/apiConfig';
import '../App.css';

const HeroSlide = ({ items }) => {
  // - 문제
  // 아래 return절 map()부분을 보면
  // 이미지를 api로 불러와서 생성되는 <div>가 있다,
  // 모든 div를 감싸는 heroSlide div의 아래에는 여러 child <div>들이 있다.
  // 이 때 child div들 중 텍스트로만 구성된 div들은 새로고침 시에 콘솔에 찍힌다.
  // 위에서 말한 이미지를 불러오는 div는 새로고침 시에 콘솔에 찍히지 않는다.

  // - 내가 아는 지식
  // useEffect는 컴포넌트 렌더링이 된 후에 실행되는 hook이다.
  // ref.current.children 혹은 .nodeLists로 생성되는 유사배열들은 문서가 바뀔 때 실시간으로 업데이트되는 Live collection이라고 한다.
  // 유사배열은 Array.from으로 Array로 변환하지 않으면 forEach, map같은 내장함수를 쓸 수 없다.

  // 내 생각 : useEffect는 렌더 이후의 호출이니 연산하는 데 필요한 시간이 얼마이건 간에 상관없을 것 같은데 그렇게 동작하는게 아닌가보다

  // 요구 사항
  // 1. heroSlideRef.current.children[1].children[0]처럼 heroSlide__backgroundImage에 접근하고 싶다
  // 2. map forEach 같은 Array 내장함수를 쓰고 싶다
  // 3. 리액트 식의 해결방법이 필요하다

  // 더러워도 작동은 하는 방법들
  // 1. setTimeout으로 시간을 100ms이라도 준다
  // 2. 디펜던시 리스트를 제거한다.

  // 아래의 코드들은 모든 div의 className를 changed로 바꾸는 코드이다

  const heroSlideRef = useRef(null);

  // 1번 - setTimeout으로 시간을 100ms이라도 준다
  // useEffect(() => {
  //   if (heroSlideRef.current) {
  //     setTimeout(() => {
  //       const children = Array.from(heroSlideRef.current.children);
  //       children.map((child) => {
  //         console.log(child);
  //         child.className = 'changed';
  //       });
  //     }, 1000);
  //   }
  // }, []);

  // 2번 - 디펜던시 리스트를 제거한다.
  // useEffect(() => {
  //   if (heroSlideRef.current) {
  //     const children = Array.from(heroSlideRef.current.children);
  //     children.map((child) => {
  //       console.log(child);
  //       child.className = 'changed';
  //     });
  //   }
  // });

  return (
    <div className="heroSlide" ref={heroSlideRef}>
      <div>testclass</div>
      {items.map((e, i) => (
        <div className="heroSlide__items">
          <img
            src={apiConfig.originalImage(e.backdrop_path)}
            className="heroSlide__backgroundImage"
            alt=""
          />
        </div>
      ))}
      <div>testclass</div>
      <div>testclass</div>
      <div>testclass</div>
    </div>
  );
};

export default HeroSlide;
