import { useState } from 'react'
import { Outlet } from 'react-router'
import { LoginContext } from './components/logincontext'
import './index.css'

function App() {
  const [ userData, setUserData ] = useState([])
  const [ login, setLogin ] = useState(false)
  const [ userModal, setUserModal ] = useState(false)
  const [ editPost, setEditPost ] = useState(false)
  const [ modal, setModal ] = useState(false)
  const [ messageModal, setMessageModal ] = useState(false)
  const [ settingMenu, setSettingMenu ] = useState(false)
  const [ allFriends, setAllFriends ] = useState(false)
  const [ friendsRequest, setFriendsRequest] = useState(false)
  const [ feed, setFeed ] = useState(true)
  const [ discover, setDiscover] = useState(false)
  const [ myGroups, setMyGroups] = useState(false)
  const [ chatModal, setChatModal ] = useState(false)

  return (
    <div className='bg-slate-100 min-h-screen w-screen'>
      <LoginContext.Provider value={{ modal, setModal, messageModal, setMessageModal, settingMenu, setSettingMenu,
        userData, setUserData, login, setLogin, userModal, setUserModal, editPost, setEditPost, allFriends, setAllFriends,
        friendsRequest, setFriendsRequest, feed, setFeed, discover, setDiscover, myGroups, setMyGroups, chatModal,
        setChatModal }}>
        <Outlet/>
      </LoginContext.Provider>
    </div>
  )
}

export default App
