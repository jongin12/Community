import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap'

const Login = () => {
  let sessionStorage = window.sessionStorage
  const [values, setValues] = useState({
    id: "",
    password: "",
  })
  const handleChange = (e:any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e:any) => {
    //! e.preventDefault() 새로고침안하게하는 함수
    fetch(`http://127.0.0.1:4625/login/${values.id}`)
    .then((res)=>res.json())
    .then((res)=>{
      if(res.length === 1){
        if(res[0].user_pw === values.password){
          // alert(JSON.stringify(values, null, 2))
          sessionStorage.setItem('id',values.id)
          sessionStorage.setItem('idIndex',res[0].user_index)
          //로그인 성공, 세션에 정보 추가, login 값 true로 변경
          location.href = '/home'
          // home으로 이동
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

  return (
    <div>
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
        <Link to={'/signIn'}><Button variant="dark">회원가입</Button></Link>
        <Link to={'/findPw'}><Button variant="dark">ID,PW 찾기</Button></Link>
    </div>
  )
}
export default Login;