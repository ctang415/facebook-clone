import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router'
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
  const [ userChat, setUserChat] = useState([])
  const navigate = useNavigate()

  const fetchUser = async (e) => {
    try {
      const response = await fetch (`http://localhost:3000${userData.url}`, {
        headers: {'Content-type': 'application/json'}, credentials: 'include'
      })
      if (!response.ok) {
        if (response.status === 403) {
          refreshToken(e, fetchUser)
        } else if (response.status === 404) {
          setLogin(false)
          setUserData([])
          setPosts([])
          setUserChat([])
          navigate('/')
        } else {
        throw await response.json()
        }
      }
      const data = await response.json()
      if (response.status === 200) {
        setUserData(data.user)
        setPosts(data.user.posts)
        setUserChat(data.user.chats)
        data.user.friends.map(friend => friend.status === "Friends" && friend.users.filter( x => x.id !== data.user.id ? x.posts.map(y => setPosts( prev => [...prev, y] )) : x ))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const refreshToken = async (e, fn) => {
    const myToken = { token: userData.token }
    try {
      const response = await fetch ('http://localhost:4000/token', {
        method:'POST', headers: {'Content-type': 'application/json'}, credentials: 'include',
        body: JSON.stringify(myToken)
      })
      if (!response.ok) {
        console.log(response.status)
          if (response.status === 404) {
          console.log('refresh error, token expired')
          setLogin(false)
          navigate('/')
          } else {
            throw await response.json()
          }
      }
      let data = await response.json()
      if (response.status === 200) {
        console.log('token refreshed')
        console.log(data)
        fn(e)
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
        setChatModal, fetchUser, setPosts, posts, userList, setUserList, userChat, setUserChat, refreshToken }}>
        <Outlet/>
      </LoginContext.Provider>
    </div>
  )
}

export default App
