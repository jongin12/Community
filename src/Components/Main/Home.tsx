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
    if(sessionStorage.id){
      fetch(`http://localhost:4625/cafeList/${sessionStorage.id}`)
      .then((res)=>res.json())
      .then((res)=>{
        setMyCafeList(res)
      })
    }
    fetch('http://localhost:4625/cafeList')
    .then((res)=>res.json())
    .then((res)=>{
      setCafeList(res)
    })
  },[])

  return (
    <div>
      {
        sessionStorage.login &&
        <h3>내 가입 카페</h3>
      }
      {
        sessionStorage.login &&
        myCafeList.map((item)=>{
          return (
            <CafeListBox key={item.cafe_index}>
              <Link to={`/cafe/${item.cafe_name}`}>
                <p>카페명 : {item.cafe_name}</p>
                <p>매니저 : {item.cafe_manager}</p>
              </Link>
            </CafeListBox>
          )
        })
      }
      <h3>추천 카페</h3>
      {
        cafeList.map((item)=>{
          return (
            <CafeListBox key={item.cafe_index}>
              <Link to={`/cafe/${item.cafe_name}`}>
                <p>카페명 : {item.cafe_name}</p>
                <p>매니저 : {item.cafe_manager}</p>
              </Link>
            </CafeListBox>
          )
        })
      }
      <Link to={'/makeCafe'}>카페 생성</Link>
    </div>
  )
}
export default Home