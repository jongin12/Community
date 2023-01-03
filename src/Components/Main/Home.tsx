import styled from 'styled-components';
import { useState, useEffect } from 'react';

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
    </>
  )
}
export default Home