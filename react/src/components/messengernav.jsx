import { decode } from "html-entities"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { LoginContext } from "./logincontext"

const MessengerNav = () => {
    const {userData} = useContext(LoginContext)
    
    return (
        <div className="bg-white w-[25vw] p-2 shadow-xl gap-4 flex flex-col pt-16">
            <h1 className="text-2xl font-bold">Chats</h1>
            <input type="search" placeholder="Search Messenger" className="bg-slate-100 rounded-full min-w-full"></input>
        <ul className="flex flex-col gap-3">
            {userData.chats ? userData.chats.map( chat => {
                        return (
                            <div key={chat.id} className="min-w-full flex flex-row items-center">
                            {chat.users.map(user => {
                                return (
                                <Link to={ user.id !== userData.id ? `/messenger/${user.id}` : null}>
                                    <li key={user.id} className={ user.full_name !== userData.full_name ? "flex p-4 rounded-md gap-1 cursor-pointer hover:bg-slate-200 min-w-full items-center flex-nowrap" : 'hidden'}>
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
                                    </Link>
                                )
                            })}
                            </div>
                        )
                    }) : null} 
        </ul>
        </div>
    )
}

export default MessengerNav