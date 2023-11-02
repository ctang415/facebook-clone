import { useState } from 'react'
import { Outlet } from 'react-router'
import { LoginContext } from './components/logincontext'
import './index.css'

function App() {
  const [ userData, setUserData ] = useState([])

  return (
    <>
      <LoginContext.Provider value={{ userData, setUserData }}>
        <Outlet/>
      </LoginContext.Provider>
    </>
  )
}

export default App
