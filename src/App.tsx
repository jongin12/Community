import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import HeaderItems from './Components/Header/HeaderItems';
import SignIn from './Components/Main/SignIn'
import Home from './Components/Main/Home'
import ErrorPage from './Components/Main/ErrorPage';
import FindPw from './Components/Main/FindPw';

const Header = styled.div`
  width: 100vw;
  height: 54px;
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
            <Route path='/signIn' element={<SignIn/>}></Route>
            <Route path='/findPw' element={<FindPw/>}></Route>
            <Route path='/*' element={<ErrorPage/>}></Route>
          </Routes>
          {/* <Home></Home> */}
          {/* <SignIn></SignIn> */}
        </Main>
      </BrowserRouter>
    </>
  )
}
export default App;