import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyPage = () => {
  let sessionStorage = window.sessionStorage

  const [myCafeList, setMyCafeList] = useState([])
  const [values, setValues] = useState({
    nowPw: "",
    newPw: "",
  })

  const handleChange = (e:any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  if(!sessionStorage.id){
    alert('로그인이 필요합니다.')
    location.href = '/home'
  }

  useEffect(()=>{
    fetch(`http://localhost:4625/cafeList/${sessionStorage.id}`)
    .then((res)=>res.json())
    .then((res)=>{
      setMyCafeList(res)
    })
  },[])

  const cafeOut:any = (cafe_index:number) => {
    fetch('http://localhost:4625/outCafe',{
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        user: sessionStorage.idIndex,
        cafe: String(cafe_index),
      }),
    })
    .then((res)=>res.json())
    .then((res)=>{
      if(res.affectedRows){
        alert('탈퇴 완료')
        location.reload()
      } else{
        alert('관리자인 카페는 탈퇴할수없습니다.')
      }
    })
  }

  const changePw = (e:any) => {
    e.preventDefault()
    fetch('http://localhost:4625/changePw',{
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        user:sessionStorage.idIndex,
        nowPw:values.nowPw,
        newPw:values.newPw,
      }),
    })
    .then((res)=>res.json())
    .then((res)=>{
      if(res.error){
        alert(res.error)
      }else{
        alert('비밀번호 변경 완료')
      }
    })
  }
  
  return (
    <div>
      <h3>mypage</h3>
      <div>
        <div>
          <p>내 카페 관리</p>
          {
            myCafeList.map((item:any)=>{
              return(
                <div key={item.cafe_index} style={{display:'flex'}}>
                  <p>{item.cafe_name}</p>
                  <button onClick={()=>{cafeOut(item.cafe_index)}}>
                    탈퇴
                  </button> 
                </div>
              )
            })
          }
        </div>
        <div>
          <p>비밀번호 변경</p>
          <form onSubmit={changePw}>
            <input type="text" name='nowPw' placeholder='현재 비밀번호' value={values.nowPw} onChange={handleChange} autoComplete='off'/>
            <input type="text" name='newPw' placeholder='새 비밀번호' value={values.newPw} onChange={handleChange} autoComplete='off'/>
            <button type='submit'>변경</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MyPage;