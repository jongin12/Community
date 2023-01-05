import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const MyPage = () => {
  return (
    <>
    <h3>마이페이지 준비중</h3>
      <Link to={'/home'}>
        <Button variant="dark">Home</Button>
      </Link>
    </>
  )
}

export default MyPage;