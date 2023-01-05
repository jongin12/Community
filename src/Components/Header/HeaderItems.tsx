import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Login from './Login'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  & > div {
    width: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
  } 
`

const HeaderItems = () => {
  let sessionStorage = window.sessionStorage
  console.log(sessionStorage);

  const logout = () => {
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('login')
    location.href = '/home'
    // alert('로그아웃')
  }

  return (
    <Container>
      <div>
        <Link to={'/home'}>
          <Button variant="dark">Home</Button>
        </Link>
      </div>
      {
        sessionStorage.login &&
        <div>
          <Button variant="dark" onClick={logout}>Logout</Button>
          <Link to={'/mypage'}>
            <Button variant="dark">Mypage</Button>
          </Link>
        </div>
      }
      {
        !sessionStorage.login &&
        <div>
          <Link to={'/login'}>
            <Button variant="dark">Login</Button>
          </Link>
        </div>
      }
    </Container>
  )
}

export default HeaderItems;