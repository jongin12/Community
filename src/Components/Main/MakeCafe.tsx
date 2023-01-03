import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const makeCafe = () => {

  let sessionStorage = window.sessionStorage

  const [name, setName] = useState("")

  const handleChange = (e:any) => {
    setName(e.target.value)
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()
    let nameCheck =  /^[a-zA-Z0-9]*$/
    //! 영어와 숫자만 사용 가능
    if(nameCheck.test(name) && name !== ''){
      fetch("http://localhost:4625/makeCafe",{
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
          name: name,
          manager: sessionStorage.id,
        }),
      })
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res)
      })
    } else {
      alert('카페명은 영어와 숫자만 사용가능합니다.')
    }
  }

  return (
    <>
      <h3>카페 만들기</h3>
      {
        sessionStorage.login &&
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name='id'
            value={name}
            onChange={handleChange}
            placeholder="카페명"
            autoComplete="off"
          />
          <button type="submit">생성</button>
        </form>
      }
      {
        !sessionStorage.login &&
        <p>로그인이 필요합니다.</p>
      }
    </>
  )
}

export default makeCafe;