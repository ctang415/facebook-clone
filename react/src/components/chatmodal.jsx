import { decode } from "html-entities"
import { useRef } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from "./logincontext"

const ChatModal = () => {
    const { userData, chatModal, setChatModal} = useContext(LoginContext)
    const chatRef = useRef(null)

    const closeChatMenu = (e) => {
        if (chatRef.current && chatModal && !chatRef.current.contains(e.target)){
          setChatModal(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeChatMenu);
      }, [closeChatMenu]);

      useEffect(() => {
console.log(userData.chats)
      }, [])
    
    if (chatModal) {
        return (
            <div className="min-w-[22vw] max-w-[22vw] bg-white shadow-xl absolute mt-16 p-2 right-4 flex flex-col gap-4" ref={chatRef}>
                <div>
                    <h1 className="text-2xl font-bold">Chats</h1>
                </div>
                <input type="search" className="bg-slate-100 min-w-full rounded-full"></input>
                <ul className="flex flex-col items-center max-h-[10vh] overflow-x-hidden gap-2 overflow-y-scroll">
                    {userData.chats.map( chat => {
                        return (
                            <div key={chat.id} className="min-w-full flex flex-row items-center">
                            {chat.users.map(user => {
                                return (
                                    <li key={user.id} className={ user.full_name !== userData.full_name ? "flex p-1 rounded-md gap-1 cursor-pointer hover:bg-slate-200 min-w-full items-center flex-nowrap" : 'hidden'}>
                                            <img src={user.avatar} alt="User icon"/>
                                            <p>{user.full_name}</p>
                                        <div className="flex flex-nowrap">
                                        {chat.messages.map( (message, index) => {
                                            return (
                                                <li key={message.id} 
                                                className={ chat.messages.length - 1 !== index  ? "hidden" : "break-normal text-slate-400"}>
                                                {decode(message.message)}
                                            </li>
                                            )
                                        })}
                                        </div>
                                    </li>
                                )
                            })}
                            </div>
                        )
                    })}
                </ul>
                <Link to="/messenger" onClick={() => setChatModal(false)}><div className="text-blue-500 text-center border-t-2 pt-1">See in Messenger</div></Link>
            </div>
        )
    }
}

export default ChatModal