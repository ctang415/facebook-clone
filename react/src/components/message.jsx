import { useContext } from "react"
import { useState } from "react"
import { LoginContext } from "./logincontext"

const Message = ({messages}) => {
    const {userData} = useContext(LoginContext)
    
    return (
        <>
        {messages.map(message => {
            return (
                <li className={ message.author.id !== userData.id ? 'flex flex-col self-start' : 'flex flex-col self-end' } key={message.id}>
                    {message.creation_time}
                <div
                className={message.author.id !== userData.id ? "rounded-full bg-slate-200 p-3 break-normal":"rounded-full bg-blue-500 text-white p-3 break-normal" }>
                    {message.message}
                </div>
                </li>
            )
        })}
    </>
    )
}

export default Message