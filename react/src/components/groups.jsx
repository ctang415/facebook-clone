import { useContext } from "react";
import CreateMessage from "./createmessage";
import GroupContent from "./groupcontent";
import GroupNav from "./groupnav";
import { LoginContext } from "./logincontext";
import Navbar from "./navbar";
import NewMessage from '../assets/newmessage.svg';
import ChatModal from "./chatmodal";

const Groups = () => {
    const {setMessageModal} = useContext(LoginContext);

    return (
        <>
        <Navbar/>
        <CreateMessage/>
        <ChatModal/>
        <img onClick={() => setMessageModal(true)} className="fixed right-1 bottom-1 min-h-[5vh] cursor-pointer" src={NewMessage} alt="Chat icon"></img>    
        <div className="flex flex-row pt-16">
            <GroupNav/>
            <GroupContent/>
        </div>
        </>
    )
}

export default Groups