import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import CafeManage from './CafeManage';
import CafeMain from './CafeMain';

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Cafe = () => {
  let sessionStorage = window.sessionStorage
  const cafeName = useParams().name
  const [member, setMember] = useState(true)
  const [info, setInfo] = useState({
  cafe_index:0,
  user_index:0,
  admin:'',
  join_time:'',
  })

  useEffect(()=>{
    fetch(`http://localhost:4625/thisCafe/${sessionStorage.id}/${cafeName}`)
    .then((res)=>res.json())
    .then((res)=>{
      if(res.length > 0){
        setMember(true)
        setInfo(res[0])
      } else {
        setMember(false)
      }
    })
  },[member])

  return (
    <Container>
      <Routes>
      <Route path='/' element={<CafeMain info={info} member={member}/>}></Route>
        <Route path='/manage' element={<CafeManage data={info}/>}></Route>
      </Routes>
    </Container>
  )
}

export default Cafe;