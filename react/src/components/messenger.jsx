import { useContext } from "react"
import ChatModal from "./chatmodal"
import CreateMessage from "./createmessage"
import { LoginContext } from "./logincontext"
import Navbar from "./navbar"
import NewMessage from '../assets/newmessage.svg'
import MessengerNav from "./messengernav"
import MessengerContent from "./messengercontent"

const Messenger = () => {
    const { setMessageModal} = useContext(LoginContext)

    return (
        <>
            <Navbar/>
            <CreateMessage/>
            <ChatModal/>
            <img onClick={() => setMessageModal(true)} className="fixed right-1 bottom-1 min-h-[5vh] cursor-pointer" src={NewMessage} alt="Chat icon"></img>
            <div className="flex flex-row pt-16">
                <MessengerNav/>
                <MessengerContent/>
        </div>
        </>
    )
}

export default Messenger