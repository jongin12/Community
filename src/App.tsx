import styled from 'styled-components';
import HeaderItem from './Components/HeaderItem';
import SignIn from './Components/SignIn'

const Header = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: salmon;
`
const Main = styled.div`
  width: 100vw;
  height: 90vh;
  background-color: skyblue;
`

const App = () => {
  let sessionStorage = window.sessionStorage
  console.log(sessionStorage)
  return (
    <>
      <Header>
        <HeaderItem />
      </Header>
      <Main>
        <SignIn></SignIn>
      </Main>
    </>
  )
}
export default App;