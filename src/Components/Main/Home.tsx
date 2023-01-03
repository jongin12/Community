import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  let sessionStorage = window.sessionStorage

  const dummy = [
    {name: 'a'},
    {name: 'b'},
    {name: 'c'},
  ]

  useEffect(()=>{
    console.log(sessionStorage)
  },[sessionStorage])

  return (
    <>
      <div>main</div>
      {
        dummy.map((item)=>{
          return (
            <div key={item.name}>{item.name}</div>
          )
        })
      }
      <Link to={'/makeCafe'}>카페만들기</Link>
    </>
  )
}
export default Home