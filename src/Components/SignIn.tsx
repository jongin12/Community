import styled from 'styled-components';
import { useState, useEffect } from 'react';

const SignIn = () => {
  const [values, setValues] = useState({
    id: "",
    pw: "",
  })
  const handleChange = (e:any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e:any) => {
    e.preventDefault()
    let idCheck =  /^[a-zA-Z0-9]*$/
    let pwCheck =  /^[a-zA-Z0-9]*$/
    if(idCheck.test(values.id) && values.id !== ''){
      if(pwCheck.test(values.pw) && values.pw !== ''){
        console.log('ok')
        fetch("http://localhost:4625/signIn",{
            method: "POST",
        mode: 'cors',
        body: JSON.stringify({
            id: values.id,
            pw: values.pw,
          }),
        })
        .then((res)=>res.json())
        .then((res)=>console.log(res))
      }else {
        alert('PW는 영어와 숫자만 사용 가능합니다.')
      }
    } else {
      alert('ID는 영어와 숫자만 사용 가능합니다.')
    }
  }

  return (
    <div>
      <input
        type="text"
        name='id'
        value={values.id}
        onChange={handleChange}
        placeholder={"ID는 영어와 숫자만 사용가능"}
      />
      <input
        type="pw"
        name='pw'
        value={values.pw}
        onChange={handleChange}
        placeholder={"PW는 영어와 숫자만 사용가능"}
      />
      <button type="submit" onClick={handleSubmit}>가입</button>
    </div>      
  )
}
export default SignIn;