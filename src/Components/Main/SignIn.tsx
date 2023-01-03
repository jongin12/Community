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
    //! 영어와 숫자만 사용 가능
    if(idCheck.test(values.id) && values.id !== ''){
      if(pwCheck.test(values.pw) && values.pw !== ''){
        fetch(`http://127.0.0.1:4625/login/${values.id}`)
        .then((res)=>res.json())
        .then((res)=>{
          if(res.length === 0){
            fetch("http://localhost:4625/signIn",{
              method: "POST",
              mode: 'cors',
              body: JSON.stringify({
                id: values.id,
                pw: values.pw,
              }),
            })
            alert('회원가입 성공!')
          } else {
            alert('이미 존재하는 ID입니다.')
          }
        })
      }else {
        alert('PW는 영어와 숫자만 사용 가능합니다.')
      }
    } else {
      alert('ID는 영어와 숫자만 사용 가능합니다.')
    }
  }

  return (
    <>
      <h3>회원가입</h3>
      <div>
        <input
          type="text"
          name='id'
          value={values.id}
          onChange={handleChange}
          placeholder={"ID"}
        />
        <input
          type="pw"
          name='pw'
          value={values.pw}
          onChange={handleChange}
          placeholder={"PW"}
          />
        <button type="submit" onClick={handleSubmit}>가입</button>
      </div>      
    </>
  )
}
export default SignIn;