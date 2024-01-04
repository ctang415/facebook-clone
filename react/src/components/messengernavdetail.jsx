import { useContext } from "react"
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LoginContext } from "./logincontext"
import { decode } from "html-entities"
import Settings from '../assets/more.svg'

const MessengerNavDetail = ({user, chat}) => {
    const { socket, userData, refreshToken, fetchUser, setLogin } = useContext(LoginContext)
    const [ settingMenu, setSettingMenu] = useState(false)
    const chatRef = useRef(null)
    const navigate = useNavigate()
    const [ sender, setSender ] = useState('')

    const deleteChat = async (e) => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${userData.chats.find(x=> x.users.some(y => y.id === sender)).url}`, {
                method: 'DELETE', headers: {'Content-type': 'application/json'}, credentials: 'include',
                body: JSON.stringify({ friendid: sender})
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken(e, deleteChat)
                } else if (response.status === 404) {
                    setLogin(false)
                    setSender('')
                    navigate('/')
                } else {
                throw await response.json()
                }
            }
            const data = await response.json()
            if (response.status === 200) {
                alert('Successfully deleted chat')
                setSender('')
                fetchUser()
           }
        } catch (err) {
            console.log(err)
        }
    }

    const closeChatMenu = (e) => {
        if (chatRef.current && settingMenu && !chatRef.current.contains(e.target)) {
          setSettingMenu(false)
        }
    }
    useEffect(() => {
        document.addEventListener("mousedown", closeChatMenu);
         }, [closeChatMenu]);

    return (
        <>
            <div className={ user.full_name !== userData.full_name ? "min-w-[23vw] relative flex p-4 rounded-md cursor-pointer hover:bg-slate-100 items-center gap-1 justify-between flex-nowrap" : 'hidden'}>
                <Link className="flex gap-3" key={user.id}
                to={ user.id !== userData.id ? `/messenger/${user.id}` : null}>
                    <img className="max-h-[3vh]" src={user.avatar} alt="User icon"/>
                    <p>{user.full_name}</p>
                    <div className="flex flex-nowrap overflow-hidden">
                        {chat.messages.map( (message, index) => {
                            return (
                            <li key={message.id} 
                            className={ chat.messages.length - 1 !== index  ? "hidden" : "break-normal text-slate-400 max-w-[14vw] max-h-[4vh]"}>
                                {decode(message.message)}
                            </li>
                        )
                        })}
                    </div>
                </Link>
                <img onClick={() => {setSettingMenu(true); setSender(user.id) }}
                src={Settings} alt="Settings icon" className="hover:bg-slate-200 rounded-xl"/>
                <ul className={settingMenu ? 'absolute bg-white rounded-lg gap-2 flex flex-col shadow-xl z-60 border-2 right-1' : 'hidden'}
                ref={chatRef}>
                <li onClick={() => deleteChat() } className="p-2 hover:bg-slate-100 cursor-pointer">Delete chat</li>
            </ul>
            </div>
        </>
    )
}

export default MessengerNavDetail