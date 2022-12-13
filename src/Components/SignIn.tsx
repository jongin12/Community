import styled from 'styled-components';
import { useState, useEffect } from 'react';

const SignIn = () => {
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
    e.preventDefault()
    fetch("http://127.0.0.1:4625/signIn/",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "asdfad",
        pw: "12342",
      }),
    })
    .then((res)=>res.json())
    .then((res)=>console.log(res))
  }

  return (
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
      <button type="submit">가입</button>
    </form>      
  )
}
export default SignIn;