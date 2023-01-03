import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
  return (
    <>
    <h1>없는 페이지 입니다.</h1>
      <Link to={'/home'}>
        <div>홈으로</div>
      </Link>
    </>
  )
}

export default ErrorPage;