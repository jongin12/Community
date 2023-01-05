import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface info{
  data:{
    admin:string,
    cafe_index:number,
    user_index:number,
    join_time:string,
  }
}
interface userList{
  user_id:string,
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const CafeManage = (props:info) => {
  let sessionStorage = window.sessionStorage;
  const cafeName = useParams().name
  const [userList,setUserList] = useState(Array<userList>)

  useEffect(()=>{
    fetch(`http://localhost:4625/cafeUser/${props.data.cafe_index}`)
    .then((res)=>res.json())
    .then((res)=>{
      setUserList(res.filter((item:any)=>{
        return (item.user_id !== sessionStorage.id)
      }))
    })
  },[props])

  const out = (user_index:number) => {
    fetch('http://localhost:4625/outCafe',{
      method: "POST",
      mode: 'cors',
      body: JSON.stringify({
        user: String(user_index),
        cafe: String(props.data.cafe_index),
      }),
    })
    .then((res)=>res.json())
    .then((res)=>{
      if(res.affectedRows){
        alert('추방 완료')
        location.reload()
      } else{
        alert('관리자는 추방할수없습니다.')
      }
    })
  }

  return (
    <Container>
      <Link to={`/cafe/${cafeName}`}>
        <button>카페 홈으로</button>
      </Link>
      {
        props.data.admin &&
        <>
          <div>유저 목록</div>
          <div>
            {
              userList.map((item:any)=>{
                return(
                  <div key={item.user_id}>
                    <p>{item.user_id}</p>
                    <p>가입일</p>
                    <button onClick={()=>{out(item.user_index)}}>추방</button>
                  </div>
                )
              })
            }
          </div>
        </>
      }
      {
        !props.data.admin &&
        <div>권한이 없습니다.</div>
      }
    </Container>
  )
}

export default CafeManage;