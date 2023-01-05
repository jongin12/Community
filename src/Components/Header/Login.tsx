import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button,InputGroup,Form } from 'react-bootstrap'

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
          e.preventDefault()
          alert('비밀번호 오류')
        }
      } else {
        e.preventDefault()
        alert('없는 아이디')
      }
    })
  }
  
  const logout = () => {
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('login')
    setLogin(false)
    location.reload()
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
        {/* <form onSubmit={handleSubmit} autoComplete="off">
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
          <Button type="submit" variant="dark">로그인</Button>
        </form> */}
        <Form className="mb-3" onSubmit={handleSubmit} autoComplete="off" style={{display:'flex'}}>
          <div>
            <Form.Control type="text"
              name='id'
              value={values.id}
              onChange={handleChange}
              placeholder='ID'
            />
            <Form.Control type="password"
              name='password'
              value={values.password}
              onChange={handleChange}
              placeholder='PW'
            />
          </div>
          <Button type="submit" variant="dark">LOGIN</Button>
        </Form>
        <Link to={'/signIn'}><Button type="submit" variant="dark">회원가입</Button></Link>
        <Link to={'/findPw'}><Button type="submit" variant="dark">ID,PW 찾기</Button></Link>
        </>
      }
      {
        login &&
        <div>
          <p>{sessionStorage.id}님, 안녕하세요</p>
          <form>
            <button onClick={logout}>로그아웃</button>
          </form>
        </div>
      }
      {/* <button onClick={test}>test</button> */}
    </div>
  )
}
export default Login;