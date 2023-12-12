import { decode } from "html-entities"
import { useContext } from "react"
import { useState } from "react"
import { LoginContext } from "./logincontext"
import MessageSettingsModal from "./messagesettingsmodal"
import Settings from '../assets/more.svg'
import { useEffect } from "react"

const MessageDetail = ({ messages, index, message, setEditMessage, editMessage, setMessage}) => {
    const { userData } = useContext(LoginContext)
    const [ settingMenu, setSettingMenu ] = useState(false)

    return (
        <>
            <div className="flex flex-row self-center text-xs text-slate-400 gap-2">
                <p className={ index !== 0 && messages[index - 1].timestamp_formatted == messages[index].timestamp_formatted ? 'hidden' : 'flex'}>
                    {message.timestamp_formatted}
                </p>
                <p>
                    {message.creation_time}
                </p>
            </div>
            <div className={ message.author.id !== userData.id ? "flex flex-row self-start" : "flex flex-row self-end"}>
                <MessageSettingsModal settingMenu={settingMenu} setSettingMenu={setSettingMenu} message={message}
                setEditMessage={setEditMessage} editMessage={editMessage} setMessage={setMessage}/>
                <img onClick={() => setSettingMenu(true)}
                className={ message.author.id === userData.id ? "flex" : 'hidden'} src={Settings} alt="Settings icon" />
                <div
                className={message.author.id !== userData.id ? "text-md rounded-full bg-slate-200 p-3 break-normal" : " text-md rounded-full bg-blue-500 text-white p-3 break-normal" }>
                    {decode(message.message)}
                </div>
            </div>
        </>
    )
}

export default MessageDetail