import { decode } from "html-entities"
import { useContext } from "react"
import { useState } from "react"
import { LoginContext } from "./logincontext"

const Message = ({messages}) => {
    const {userData} = useContext(LoginContext)
    
    return (
        <>
        {messages.map(message => {
            return (
                <li className={ message.author.id !== userData.id ? 'flex flex-col' : 'flex flex-col' } key={message.id}>
                    <p className="self-center text-xs text-slate-400">{message.creation_time}</p>
                <div
                className={message.author.id !== userData.id ? "text-md rounded-full bg-slate-200 p-3 break-normal self-start" : " self-end text-md rounded-full bg-blue-500 text-white p-3 break-normal" }>
                    {decode(message.message)}
                </div>
                </li>
            )
        })}
    </>
    )
}

export default Message