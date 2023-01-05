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
    fetch('http://localhost:4625/cafeList')
    .then((cafeList)=>cafeList.json())
    .then((cafeList)=>{
      if(sessionStorage.id) {
        fetch(`http://localhost:4625/cafeList/${sessionStorage.id}`)
        .then((myCafeList)=>myCafeList.json())
        .then((myCafeList)=>{
          let cafeIndex = myCafeList.map((item:any)=>{
            return item.cafe_index
          })
          let filterCafe = cafeList.filter((item:any)=>{
            return (cafeIndex.indexOf(item.cafe_index) < 0)
          }) // 내 가입 카페에 있는 카페는 제외.
          setMyCafeList(myCafeList)
          setCafeList(filterCafe)
        })
      } else {
        setCafeList(cafeList)
      }
    })
  },[])

  return (
    <div>
      {
        sessionStorage.id &&
        <h3>내 가입 카페</h3>
      }
      {
        myCafeList.length > 0 &&
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
      {
        !myCafeList.length &&
        sessionStorage.id && 
        <div>가입한 카페가 없습니다.</div>
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