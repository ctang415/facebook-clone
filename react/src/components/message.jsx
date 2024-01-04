import AlwaysScrollToBottom from "./scrolltobottom"
import MessageDetail from './messagedetail'

const Message = ({messages, editMessage, setEditMessage, setMessage}) => {
    
    return (
        <>
        {messages.map( (message, index) => {
            return (
                <li className='flex flex-col relative' key={message.id}>
                    <MessageDetail messages={messages} message={message} index={index} setEditMessage={setEditMessage}
                    editMessage={editMessage} setMessage={setMessage} />
                    <AlwaysScrollToBottom/>                
                </li>
            )
        })}
    </>
    )
}

export default Message