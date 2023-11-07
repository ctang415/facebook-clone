import { useRef } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from "./logincontext"

const ChatModal = () => {
    const {chatModal, setChatModal} = useContext(LoginContext)
    const chatRef = useRef(null)

    const closeChatMenu = (e) => {
        if (chatRef.current && chatModal && !chatRef.current.contains(e.target)){
          setChatModal(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeChatMenu);
      }, [closeChatMenu]);

    
    if (chatModal) {
        return (
            <div className="min-w-[20vw] bg-white shadow-xl absolute mt-16 p-2 right-4 flex flex-col gap-4" ref={chatRef}>
                <div>
                    <h1 className="text-2xl font-bold">Chats</h1>
                </div>
                <input type="search" className="bg-slate-100 min-w-full rounded-full"></input>
                <ul className="flex flex-col items-center gap-2">
                    <li>No messages found</li>
                    <Link to="/messenger" onClick={() => setChatModal(false)}><li className="text-blue-500" >See all in Messenger</li></Link>
                </ul>
            </div>
        )
    }
}

export default ChatModal