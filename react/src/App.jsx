import { useState } from 'react'
import { Outlet } from 'react-router'
import { LoginContext } from './components/logincontext'
import './index.css'

function App() {
  const [ userData, setUserData ] = useState([])
  const [ login, setLogin ] = useState(false)
  const [ userModal, setUserModal ] = useState(false)
  const [ editPost, setEditPost ] = useState('')
  const [ modal, setModal ] = useState(false)
  const [ messageModal, setMessageModal ] = useState(false)
  const [ settingMenu, setSettingMenu ] = useState(false)
  const [ allFriends, setAllFriends ] = useState(false)
  const [ friendsRequest, setFriendsRequest] = useState(false)
  const [ feed, setFeed ] = useState(true)
  const [ discover, setDiscover] = useState(false)
  const [ myGroups, setMyGroups] = useState(false)
  const [ chatModal, setChatModal ] = useState(false)
  const [ posts, setPosts ] = useState([])
  const [ userList, setUserList] = useState([])

  const fetchUser = async () => {
    try {
      const response = await fetch (`http://localhost:3000${userData.url}`, {
        headers: {'Content-type': 'application/json'}
      })
      if (!response.ok) {
        throw await response.json()
      }
      const data = await response.json()
      if (response.status === 200) {
        setUserData(data.user)
        setPosts(data.user.posts)
        data.user.friends.map(friend => friend.status === "Friends" && friend.users.filter( x => x.id !== data.user.id ? x.posts.map(y => setPosts( prev => [...prev, y] )) : x ))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='bg-slate-100 min-h-screen w-screen'>
      <LoginContext.Provider value={{ modal, setModal, messageModal, setMessageModal, settingMenu, setSettingMenu,
        userData, setUserData, login, setLogin, userModal, setUserModal, editPost, setEditPost, allFriends, setAllFriends,
        friendsRequest, setFriendsRequest, feed, setFeed, discover, setDiscover, myGroups, setMyGroups, chatModal,
        setChatModal, fetchUser, setPosts, posts, userList, setUserList }}>
        <Outlet/>
      </LoginContext.Provider>
    </div>
  )
}

export default App
