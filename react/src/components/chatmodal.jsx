import { decode } from "html-entities";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "./logincontext";

const ChatModal = () => {
    const { userChat, fetchUser, userData, chatModal, setChatModal} = useContext(LoginContext);
    const [ search, setSearch ] = useState('');
    const [ results, setResults ] = useState([]);
    const chatRef = useRef(null);

    const closeChatMenu = (e) => {
        if (chatRef.current && chatModal && !chatRef.current.contains(e.target)){
          setChatModal(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeChatMenu);
      }, [closeChatMenu]);

      useEffect(() => {
        setResults(userData.chats.filter( x => x.users.find( y => y.full_name.includes(search))));
      }, [search]);

    if (chatModal) {
        return (
            <div className="z-50 min-w-[22vw] max-w-[22vw] bg-white shadow-xl fixed mt-16 p-2 right-4 flex flex-col gap-4" ref={chatRef}>
                <div>
                    <h1 className="text-2xl font-bold">Chats</h1>
                </div>
                <input type="search" className="bg-slate-100 min-w-full p-1 rounded-full" onChange={(e) => setSearch(e.target.value)}></input>
                <ul className={ search !== '' ? "flex flex-col items-center min-h-[25vh] max-h-[25vh] overflow-x-hidden overflow-y-scroll" : 'hidden'}>
                    {results.map(result => {
                        return (
                            <div key={result.id} className="min-w-full">
                                {result.users.map( user => {
                                    return (
                                        <Link onClick={() => setChatModal(false)} to={ user.id !== userData.id ? `/messenger/${user.id}` : null}>
                                            <li key={user.id} className={ user.id !== userData.id ? "cursor-pointer flex min-w-full p-3 rounded-md hover:bg-slate-100 gap-2 items-center" : 'hidden'}>
                                                <img className="max-h-[3vh]" src={user.avatar} alt="User icon"/>
                                                {user.full_name}
                                            </li>
                                        </Link>        
                                    )
                                })}
                            </div>
                        )
                    })}
                </ul>
                <ul className={ search !== '' ? 'hidden' : "min-w-full flex flex-col items-center max-h-[10vh] gap-2 overflow-scroll"}>
                    {userChat.map( chat => {
                        return (
                            <div key={chat.id} className="min-w-full flex flex-row items-center ">
                                {chat.users.map(user => {
                                    return (
                                        <Link onClick={() => setChatModal(false)} to={ user.id !== userData.id ? `/messenger/${user.id}` : null}>
                                            <li key={user.id} className={ user.full_name !== userData.full_name ? "flex p-1 rounded-md gap-1 cursor-pointer hover:bg-slate-100 min-w-[21vw] items-center flex-nowrap" : 'hidden'}>
                                                <img className="max-h-[3vh]" src={user.avatar} alt="User icon"/>
                                                <p>{user.full_name}</p>
                                                <div className="flex flex-nowrap overflow-hidden">
                                                    {chat.messages.map( (message, index) => {
                                                        return (
                                                            <li key={message.id} className={ chat.messages.length - 1 !== index  ? "hidden" : "break-normal text-slate-400 max-w-[12vw] max-h-[5vh] p-2"}>
                                                                {decode(message.message)}
                                                            </li>
                                                        )
                                                    })}
                                                </div>
                                            </li>
                                        </Link>
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