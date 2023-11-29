import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { LoginContext } from "./logincontext"
import Message from "./message"
import Send from '../assets/send.svg'
import { useRef } from "react"
import {io} from 'socket.io-client'

const MessengerContent = () => {
    const { userData, fetchUser } = useContext(LoginContext)
    const params = useParams()
    const [ chat, setChat ] = useState([])
    const [ message, setMessage ] = useState('')
    const socket = useRef()

    const createMessage = async () => {
        const newMessage = { message: message, timestamp: Date.now() }
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${chat.url}/messages`, {
                method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(newMessage)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                socket.current = io('http://localhost:3000', 
                { transports: ['websocket', 'polling', 'flashsocket'],
                credentials: 'include'
                })
                socket.current.emit('new-message-add', newMessage)
                socket.current.on('get-message', (message) => {
                    const messagesArray = chat.messages.concat(message)
                    setChat({...chat, messages: messagesArray})
                })
                setMessage('')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const fetchChat = async () => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/chats/${userData.chats.find(x => x.users.find(y => y.id === params.messengerid)).id}`)
            if (!response.ok) {
                setChat([])
                throw await response.json()
            }
            const data = await response.json()
            if (response.status === 200) {     
                setChat(data.chat)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (params.messengerid !== undefined) {
            fetchChat()
        }
    }, [params, fetchUser])

    if (params.messengerid !== undefined && chat.messages) {
        return (
            <div className="min-h-screen min-w-[75vw] max-w-[75vw] flex flex-col pt-16 justify-between items-center bg-white border-2 border-grey">
                <div className="border-b-2 p-2 min-w-full">
                    { chat.users ? chat.users.map(user => {
                        return (
                            <div className={ user.id !== userData.id ? "flex gap-2 items-center text-xl" : 'hidden'}>
                            <img className="min-h-[4vh] max-h-[4vh]" src={user.avatar} alt="User icon"/>
                            {user.full_name}
                            </div>
                        )
                    }) : null }
                </div>
            <div className="flex flex-col items-center min-w-full">
                { chat.users ? chat.users.map(user => {
                    return (
                        <div className={ user.id !== userData.id ? "flex flex-col text-lg items-center" : 'hidden'}>
                            <img className="min-h-[8vh] max-h-[8vh]" src={user.avatar} alt="User icon"/>
                            {user.full_name}
                        </div>
                    )
                }) : null }
                <div className="min-h-[55vh] max-h-[55vh] p-6 overflow-scroll min-w-full">
                    <ul className='flex flex-col gap-3'>
                        <Message messages={chat.messages}/>
                    </ul>        
                </div>
            </div>
            <form className='flex flex-row gap-2 items-center pb-6 min-w-full justify-center'>
                    <input className='p-1 rounded-full bg-slate-100 min-w-[95%]' type="text"
                    value={message} onChange={(e) => setMessage(e.target.value)}></input>
                    <img onClick={() => createMessage()}
                    className='cursor-pointer hover:bg-slate-200 p-1 rounded-full' src={Send} alt="Send icon"/>
            </form>
        </div>
    )
    } 
}

export default MessengerContent