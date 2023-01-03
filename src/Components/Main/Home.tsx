import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface cafeListInterface{
  cafe_index:number,
  cafe_manager:string,
  cafe_name:string,
}

const CafeListBox = styled.div`
  width: 300px;
  height: 60px;
  border: 1px solid black;
`

const Home = () => {
  let sessionStorage = window.sessionStorage

  const [cafeList, setCafeList] = useState( Array<cafeListInterface> )
  const [myCafeList, setMyCafeList] = useState( Array<cafeListInterface> )

  useEffect(()=>{
    fetch(`http://localhost:4625/cafeList/${sessionStorage.id}`)
    .then((res)=>res.json())
    .then((res)=>{
      setMyCafeList(res)
    })
    fetch('http://localhost:4625/cafeList')
    .then((res)=>res.json())
    .then((res)=>{
      setCafeList(res)
    })
  },[])

  return (
    <>
      {
        sessionStorage.login &&
        <h3>내 가입 카페</h3>
      }
      {
        sessionStorage.login &&
        myCafeList.map((item)=>{
          return (
            <Link to={`/cafe/${item.cafe_name}`} key={item.cafe_index}>
              <CafeListBox>
                <p>카페명 : {item.cafe_name}</p>
                <p>매니저 : {item.cafe_manager}</p>
              </CafeListBox>
            </Link>
          )
        })
      }
      <h3>추천 카페</h3>
      {
        cafeList.map((item)=>{
          return (
            <Link to={`/cafe/${item.cafe_name}`} key={item.cafe_index}>
              <CafeListBox>
                <p>카페명 : {item.cafe_name}</p>
                <p>매니저 : {item.cafe_manager}</p>
              </CafeListBox>
            </Link>
          )
        })
      }
      <Link to={'/makeCafe'}>카페만들기</Link>
    </>
  )
}
export default Home