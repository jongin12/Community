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
  const cafeName = useParams().name
  const [userList,setUserList] = useState(Array<userList>)

  useEffect(()=>{
    fetch(`http://localhost:4625/cafeUser/${props.data.cafe_index}`)
    .then((res)=>res.json())
    .then((res)=>{
      setUserList(res)
    })
  },[props])

  return (
    <Container>
      <Link to={`/cafe/${cafeName}`}>
        <button>카페 홈으로</button>
      </Link>
      {
        props.data.admin &&
        <>
          <div>유저 목록</div>
          <ul>
            {
              userList.map((item:any)=>{
                return(
                  <li key={item.user_id}>{item.user_id}</li>
                )
              })
            }
          </ul>
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