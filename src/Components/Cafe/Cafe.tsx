import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface cafeListInterface{
  cafe_index:number,
  cafe_manager:string,
  cafe_name:string,
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Cafe = () => {
  let sessionStorage = window.sessionStorage
  const cafeName = useParams().name
  const [member, setmember] = useState(false)
  useEffect(()=>{
    fetch(`http://localhost:4625/cafeList/${sessionStorage.id}`)
    .then((res)=>res.json())
    .then((res)=>{
      let filter = res.filter((item:cafeListInterface)=>{
        return (item.cafe_name === cafeName)
      })
      if(filter.length > 0){
        setmember(true)
      }
    })
  },[])

  const join = () => {
    if(!sessionStorage.id){
      alert('로그인이 필요합니다.')
    } else if(!member) {
      fetch("http://localhost:4625/joinCafe",{
        method: "POST",
        mode: 'cors',
        body: JSON.stringify({
          user:sessionStorage.id,
          cafe:cafeName,
        }),
      })
      alert('가입 완료')
    }
  }

  return (
    <Container>
      <div>
        {cafeName}
      </div>
      {
        !member &&
        <div onClick={join}>
          가입하기
        </div>
      }
    </Container>
  )
}

export default Cafe;