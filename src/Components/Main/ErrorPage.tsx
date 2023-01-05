import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ErrorPage = () => {
  return (
    <>
    <h1>없는 페이지 입니다.</h1>
      <Link to={'/home'}>
        <Button variant="dark">Home</Button>
      </Link>
    </>
  )
}

export default ErrorPage;