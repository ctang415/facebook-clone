import { useState } from 'react'
import { Outlet } from 'react-router'
import { LoginContext } from './components/logincontext'
import './index.css'

function App() {
  const [ userData, setUserData ] = useState([])
  const [ login, setLogin ] = useState(true)

  return (
    <div className='bg-slate-100 min-h-screen w-screen'>
      <LoginContext.Provider value={{ userData, setUserData, login, setLogin }}>
        <Outlet/>
      </LoginContext.Provider>
    </div>
  )
}

export default App
