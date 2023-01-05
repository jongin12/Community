import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Login from './Login'
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  & > div {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  } 
`

const HeaderItems = () => {
  return (
    <Container>
      <div>
        <Link to={'/home'}>Main</Link>
      </div>
      <div>
        <Link to={'/login'}>Login</Link>
      </div>
    </Container>
  )
}

export default HeaderItems;