import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const findPw = () => {
  return (
    <>
    <h3>아이디,비밀번호 찾기 준비중</h3>
      <Link to={'/home'}>
        <Button variant="dark">Home</Button>
      </Link>
    </>
  )
}

export default findPw;