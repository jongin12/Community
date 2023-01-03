import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Home = () => {
  let sessionStorage = window.sessionStorage
  console.log(sessionStorage)

  const dummy = [
    {name: 'a'},
    {name: 'b'},
    {name: 'c'},
  ]

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