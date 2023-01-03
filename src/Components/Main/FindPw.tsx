import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const findPw = () => {
  return (
    <>
    <h3>아이디,비밀번호 찾기 준비중</h3>
      <Link to={'/home'}>
        <div>홈으로</div>
      </Link>
    </>
  )
}

export default findPw;