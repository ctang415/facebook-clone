import { useState, useEffect, useContext } from "react";
import ChatModal from "./chatmodal";
import CreateMessage from "./createmessage";
import { LoginContext } from "./logincontext";
import Navbar from "./navbar";
import NewMessage from '../assets/newmessage.svg';
import MessengerNav from "./messengernav";
import MessengerContent from "./messengercontent";
import { useNavigate, useParams } from "react-router-dom";

const Messenger = () => {
    const { socket, fetchUser, setMessageModal, login, setUserChat, userChat} = useContext(LoginContext);
    const params = useParams();
    
    useEffect(() => {
        let ignore = false;
        if (!ignore) {
           if (params.messengerid !== undefined) {
                fetchUser();
            }
        }
        return () => {
            ignore = true;
        }
    }, [params]);

    if (login) {
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
}

export default Messenger