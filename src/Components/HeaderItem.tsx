import styled from 'styled-components';
import { useState, useEffect } from 'react';

const HeaderItem = () => {
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
    fetch('http://127.0.0.1:4625/')
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      let filter = res.filter((item:any)=>
        item.user_id === values.id
      )
      if(filter.length === 1){
        if(filter[0].user_pw === values.password){
          // alert(JSON.stringify(values, null, 2))
          sessionStorage.setItem('id',values.id)
          sessionStorage.setItem('login','true')
          setLogin(true)
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
    <>
      {
        !login &&
        <form onSubmit={handleSubmit} >
          <input
            type="text"
            name='id'
            value={values.id}
            onChange={handleChange}
          />
          <input
            type="password"
            name='password'
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit">로그인</button>
        </form>
      }
      <button onClick={test}>test</button>
      {
        login &&
        <div>
          <button onClick={logout}>로그아웃</button>
          <p>로그인 중</p>
        </div>
      }
    </>
  )
}
export default HeaderItem;