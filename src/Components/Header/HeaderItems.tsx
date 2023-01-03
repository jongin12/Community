import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Login from './Login'
import { Link } from 'react-router-dom';


const HeaderItems = () => {
  return (
    <>
      <Link to={'/home'}>
        <div>홈으로</div>
      </Link>
      <Login></Login>
      <Link to={'/signIn'}>
        <div>회원가입</div>
      </Link>
    </>
  )
}

export default HeaderItems;