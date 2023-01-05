import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderItems from './Components/Header/HeaderItems';
import SignIn from './Components/Main/SignIn'
import Home from './Components/Main/Home'
import ErrorPage from './Components/Main/ErrorPage';
import FindPw from './Components/Main/FindPw';
import MakeCafe from './Components/Main/MakeCafe';
import Cafe from './Components/Cafe/Cafe';
import Login from './Components/Header/Login';

const Header = styled.div`
  width: 100vw;
  height: 60px;
  border-bottom: 1px solid black;
`
const Main = styled.div`
  width: 100vw;
  height: 100%;
`

const App = () => {
  // let sessionStorage = window.sessionStorage
  // console.log(sessionStorage)
  return (
    <>
      <BrowserRouter>
        <Header>
          <HeaderItems />
        </Header>
        <Main>
          <Routes>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signIn' element={<SignIn/>}></Route>
            <Route path='/findPw' element={<FindPw/>}></Route>
            <Route path='/makeCafe' element={<MakeCafe/>}></Route>
            <Route path='/cafe/:name/*' element={<Cafe/>}></Route>
            <Route path='/*' element={<ErrorPage/>}></Route>
          </Routes>
        </Main>
      </BrowserRouter>
    </>
  )
}
export default App;