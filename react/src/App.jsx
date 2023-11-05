import { useState } from 'react'
import { Outlet } from 'react-router'
import { LoginContext } from './components/logincontext'
import './index.css'

function App() {
  const [ userData, setUserData ] = useState([])
  const [ login, setLogin ] = useState(true)
  const [ userModal, setUserModal ] = useState(false)
  const [ editPost, setEditPost ] = useState(false)
  const [ modal, setModal ] = useState(false)
  const [ messageModal, setMessageModal ] = useState(false)
  const [ settingMenu, setSettingMenu ] = useState(false)

  return (
    <div className='bg-slate-100 min-h-screen w-screen'>
      <LoginContext.Provider value={{ modal, setModal, messageModal, setMessageModal, settingMenu, setSettingMenu,
        userData, setUserData, login, setLogin, userModal, setUserModal, editPost, setEditPost }}>
        <Outlet/>
      </LoginContext.Provider>
    </div>
  )
}

export default App
