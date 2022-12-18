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
    fetch("http://localhost:4625/signIn",{
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        id: values.id,
        pw: values.password,
      }),
    })
    // .then((res)=>res.json())
    // .then((res)=>console.log(res))
  }

  return (
    <div>
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
      <button type="submit" onClick={handleSubmit}>가입</button>
    </div>      
  )
}
export default SignIn;