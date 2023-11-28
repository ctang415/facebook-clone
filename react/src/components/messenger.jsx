import { useState, useEffect, useContext } from "react"
import ChatModal from "./chatmodal"
import CreateMessage from "./createmessage"
import { LoginContext } from "./logincontext"
import Navbar from "./navbar"
import NewMessage from '../assets/newmessage.svg'
import MessengerNav from "./messengernav"
import MessengerContent from "./messengercontent"
import { useParams } from "react-router-dom"

const Messenger = () => {
    const { userData, setMessageModal} = useContext(LoginContext)
    const params = useParams()
    const [ chat, setChat ] = useState([])

    const fetchChat = async () => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/chats/${userData.chats.find(x => x.users.find(y => y.id === params.messengerid)).id}`)
            if (!response.ok) {
                throw await response.json()
            }
            const data = await response.json()
            if (response.status === 200) {     
                setChat(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (params.messengerid !== undefined) {
            fetchChat()
        }
    }, [params])

    if ( params.messengerid !== undefined) {
        return (
            <>
                <Navbar/>
                <CreateMessage/>
                <ChatModal/>
                <img onClick={() => setMessageModal(true)} className="fixed right-1 bottom-1 min-h-[5vh] cursor-pointer" src={NewMessage} alt="Chat icon"></img>
                <div className="flex flex-row max-h-screen">
                    <MessengerNav/>
                    <MessengerContent/>
            </div>
            </>
        )
    } else {
    return (
        <>
            <Navbar/>
            <CreateMessage/>
            <ChatModal/>
            <img onClick={() => setMessageModal(true)} className="fixed right-1 bottom-1 min-h-[5vh] cursor-pointer" src={NewMessage} alt="Chat icon"></img>
            <div className="flex flex-row max-h-screen">
                <MessengerNav/>
                <MessengerContent/>
        </div>
        </>
    )
    }
}

export default Messenger