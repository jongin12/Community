import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const CafeMain = (props:any) => {
  console.log(props)
  const cafeName = useParams().name
  const member = props.member
  const info = props.info

  const join = () => {
    if(!sessionStorage.id){
      alert('로그인이 필요합니다.')
    } else if(!member) {
      fetch("http://localhost:4625/joinCafe",{
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
          user:sessionStorage.id,
          cafe:cafeName,
        }),
      })
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res);
        // setMember(true)
      })
      alert('가입 완료')
    }
  }

  return (
    <Container>
      <div>
        {cafeName}
      </div>
      {
        !member &&
        <div onClick={join}>
          가입하기
        </div>
      }
      {
        info.admin === 'true' &&
        <Link to={'./manage'}>
          <button>카페 관리</button>
        </Link>
      }
    </Container>
  )
}

export default CafeMain;