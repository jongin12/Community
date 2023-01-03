import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  let sessionStorage = window.sessionStorage
  const [values, setValues] = useState({
    id: "",
    password: "",
  })
  const [login, setLogin] = useState(false)
  useEffect(()=>{
    if(sessionStorage.login){
      setLogin(true)
    }
  },[])
  const handleChange = (e:any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e:any) => {
    e.preventDefault()
    //새로고침안하게하는 함수
    fetch(`http://127.0.0.1:4625/login/${values.id}`)
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      if(res.length === 1){
        if(res[0].user_pw === values.password){
          // alert(JSON.stringify(values, null, 2))
          sessionStorage.setItem('id',values.id)
          sessionStorage.setItem('login','true')
          setLogin(true)
          //로그인 성공, 세션에 정보 추가, login 값 true로 변경
        } else {
          alert('비밀번호 오류')
        }
      } else {
        alert('없는 아이디')
      }
    })
  }
  
  const logout = () => {
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('login')
    setLogin(false)
    // alert('로그아웃')
  }

  const test = () => {
    console.log(sessionStorage)
  }

  return (
    <div>
      {
        !login &&
        <>
          <form onSubmit={handleSubmit} >
          <input
            type="text"
            name='id'
            value={values.id}
            onChange={handleChange}
            placeholder='ID'
            />
          <input
            type="password"
            name='password'
            value={values.password}
            onChange={handleChange}
            placeholder='PW'
            />
          <button type="submit">로그인</button>
          </form>
          <Link to={'/signIn'}>회원가입</Link>
          <Link to={'/findPw'}>비밀번호 찾기(준비중)</Link>
        </>
      }
      {
        login &&
        <div>
          <button onClick={logout}>로그아웃</button>
          <p>{sessionStorage.id}님, 안녕하세요</p>
        </div>
      }
      <button onClick={test}>test</button>
    </div>
  )
}
export default Login;