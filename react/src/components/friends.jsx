import CreateMessage from "./createmessage"
import FriendsContent from "./friendscontent"
import FriendsNav from "./friendsnav"
import Navbar from "./navbar"
import NewMessage from '../assets/newmessage.svg'
import { useContext } from "react"
import { LoginContext } from "./logincontext"
import ChatModal from "./chatmodal"

const Friends = () => {
     const {setMessageModal} = useContext(LoginContext)
    return (
        <>
            <Navbar/>
            <CreateMessage/>
            <ChatModal/>
            <img onClick={() => setMessageModal(true)} className="fixed right-1 bottom-1 min-h-[5vh] cursor-pointer" src={NewMessage} alt="Chat icon"></img>
            <div className="flex flex-row">
            <FriendsNav/>
            <FriendsContent/>
            </div>
        </>
    )
}

export default Friends