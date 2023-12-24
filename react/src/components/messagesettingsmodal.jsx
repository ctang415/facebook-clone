import { useRef } from "react"
import { useState, useEffect } from "react"
import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { LoginContext } from "./logincontext"

const MessageSettingsModal = ({message, settingMenu, setSettingMenu, setEditMessage, editMessage, setMessage}) => {
    const { socket, setUserChat, userChat, setLogin, userData, fetchUser, refreshToken, setSender, sender} = useContext(LoginContext)
    const params = useParams()
    const settingRef = useRef(null)
    const navigate = useNavigate()
    const [ left, setLeft ] = useState('')
    const [ top, setTop ] = useState('')

    const closeSettingMenu = (e) => {
        if (settingRef.current && settingMenu && !settingRef.current.contains(e.target)) {
          setSettingMenu(false)
        }
    }

    const editMyMessage = () => {
        setSettingMenu(false)
        setEditMessage(message)
        setMessage(message.message)
    }

    const deleteMessage = async (e) => {
        if (params.messengerid === undefined) {
            try {
                const response = await fetch (`http://localhost:3000${userData.url}${userChat.find( x => x.users.some( y => y.id === sender)).url}/messages/${message.id}`, {
                    method: 'DELETE', headers: {'Content-type': 'application/json'}, credentials: 'include'
                })
                if (!response.ok) {
                    if (response.status === 403) {
                        refreshToken(e, deleteMessage)
                    } else if (response.status === 404) {
                        setLogin(false)
                        navigate('/')
                    } else {
                    throw await response.json()
                    }
                }
                const data = await response.json()
                if (response.status === 200) {
                    alert('Message successfully deleted')
                    socket.current.emit('delete-messenger', data.chat)          
                    setSettingMenu(false)
                }
            } catch (err) {
                console.log(err)
            }
        } else {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${userChat.find( x => x.users.some( y => y.id === params.messengerid)).url}/messages/${message.id}`, {
                method: 'DELETE', headers: {'Content-type': 'application/json'}, credentials: 'include'
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken(e, deleteMessage)
                } else if (response.status === 404) {
                    setLogin(false)
                    navigate('/')
                } else {
                throw await response.json()
                }
            }
            const data = await response.json()
            if (response.status === 200) {
                alert('Message successfully deleted')
                socket.current.emit('delete-message', data.chat)                
               setSettingMenu(false)
            }
        } catch (err) {
            console.log(err)
        }
    }
    }

    useEffect(() => {
        const deleteMyMessage = (chatId) => {
            console.log('delete message')
            setUserChat(userChat.map( x => x.id === chatId.id ? chatId : x))
        }
     
        const deleteMessageFromMessenger = (chatId) => {
            console.log('delete message messenger')
            setUserChat(userChat.map( x => x.id === chatId.id ? chatId : x))
        }     

        socket.current.on('get-delete-message', deleteMyMessage)

        socket.current.on('get-delete-messenger', deleteMessageFromMessenger)

        return () => {
            socket.current.off('get-delete-message')
            socket.current.off('get-delete-messenger')
        }
    }, [])

    useEffect(() => {
     document.addEventListener("mousedown", closeSettingMenu);
      }, [closeSettingMenu]);

    if (settingMenu) {
        return (
            <ul className={`absolute bg-white rounded-lg gap-2 flex flex-col shadow-xl z-50 border-2 left-${left} top-${top}`}
            ref={settingRef} onClick={(e) => { setLeft(e.pageX); setTop(e.pageY)} }>
                <li ref={settingRef} onClick={() => editMyMessage()} className="p-2 hover:bg-slate-100 cursor-pointer">Edit Message</li>
                <li onClick={() => deleteMessage() } className="p-2 hover:bg-slate-100 cursor-pointer">Delete Message</li>
            </ul>
        )
    }
}

export default MessageSettingsModal