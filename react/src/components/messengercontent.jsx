import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "./logincontext";
import Message from "./message";
import Send from '../assets/send.svg';

const MessengerContent = () => {
    const { socket, userChat, setUserChat, setLogin, userData, fetchUser, refreshToken, sender } = useContext(LoginContext);
    const params = useParams();
    const [ message, setMessage ] = useState('');
    const navigate = useNavigate();
    const [ editMessage, setEditMessage ] = useState('');

    const createMessage = async (e) => {
        const newMessage = { message: message, timestamp: Date.now() }
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${userChat.find( x => x.users.some( y => y.id === params.messengerid)).url}/messages`, {
                method: 'POST', headers: {'Content-type': 'application/json'}, credentials: 'include',
                body: JSON.stringify(newMessage)
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken(e, createMessage);
                } else if (response.status === 404) {
                    setLogin(false);
                    setMessage('');
                    navigate('/');
                } else {
                    throw await response.json();
                }
            }
            const data = await response.json();
            if (response.status === 200) {
                socket.current.emit('new-message-add', data.chat);
                setMessage('');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const editChatMessage = async (e) => {
        const editedMessage = { message: message }
            try {
                const response = await fetch (`http://localhost:3000${userData.url}${userChat.find( x => x.users.some( y => y.id === params.messengerid)).url}/messages/${editMessage.id}`, {
                    method: 'PUT', headers: {'Content-type': 'application/json'}, credentials: 'include',
                    body: JSON.stringify(editedMessage)
                })
                if (!response.ok) {
                    if (response.status === 404) {
                        setLogin(false);
                        setEditMessage('');
                        setMessage('');
                        navigate('/');
                    }
                    if (response.status === 403) {
                        refreshToken(e, editChatMessage);
                    } else {
                        throw await response.json();
                    }
                }
                const data = await response.json();
                if (response.status === 200) {
                    alert('Message successfully updated!');
                    socket.current.emit('update-message', data.chat);
                    setEditMessage('');
                    setMessage('');
                }
            } catch (err) {
                console.log(err);
            }
        }

    useEffect(() => {
        const getNewMessage = (message) => {
            setUserChat(userChat.map( x => x.id === message.id ? message : x));
        }
           
        socket.current.on('get-message', getNewMessage);

        const getUpdatedMessage = (message) => {
            setUserChat(userChat.map( x => x.id === message.id ? message : x));
        }

        socket.current.on('get-update-message', getUpdatedMessage);
                
        return () => {
            socket.current.off('get-update-message');
            socket.current.off('get-message');
        }
    }, []);

    useEffect(() => {
        if (params.messengerid !== undefined) {
            socket.current.emit('join', userChat.find( x => x.users.some( y => y.id === params.messengerid)).id);
        }
    }, [params]);

    if (params.messengerid !== undefined && userChat.find( x => x.users.some( y => y.id === params.messengerid))) {
        return (
            <div className="min-h-screen min-w-[75vw] max-w-[75vw] flex flex-col pt-16 justify-between items-center bg-white border-2 border-grey">
                <div className="border-b-2 p-2 min-w-full">
                    { userChat.find( x => x.users.some( y => y.id === params.messengerid)).users.map(user => {
                        return (
                            <div key={user.id !== userData.id} className={ user.id !== userData.id ? "flex gap-2 items-center text-xl" : 'hidden'}>
                            <img className={ user.id !== userData.id ? "min-h-[4vh] max-h-[4vh]" : 'hidden'} src={user.avatar} alt="User icon"/>
                            { user.id !== userData.id ? user.full_name : null}
                            </div>
                        )
                    })}
                </div>
            <div className="flex flex-col items-center min-w-full">
                { userChat.find( x => x.users.some( y => y.id === params.messengerid)).users.map(user => {
                    return (
                        <div key={user.id !== userData.id} className={ user.id !== userData.id ? "flex flex-col text-lg items-center" : 'hidden'}>
                            <img className={user.id !== userData.id ? "min-h-[8vh] max-h-[8vh]": 'hidden'} src={user.avatar} alt="User icon"/>
                            {user.id !== userData.id ? user.full_name : null}
                        </div>
                    )
                })}
                <div className="min-h-[55vh] max-h-[55vh] p-6 overflow-scroll min-w-full">
                    <ul className='flex flex-col gap-3'>
                        <Message editMessage={editMessage} setEditMessage={setEditMessage} setMessage={setMessage}
                        messages={userChat.find( x => x.users.some( y => y.id === params.messengerid)).messages}/>
                    </ul>
                </div>
            </div>
            <form className='flex flex-row gap-2 items-center pb-6 min-w-full justify-center'>
                <button onClick={() => { setEditMessage(''); setMessage('') }} 
                type="button" className={ editMessage !== '' ? "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" : "hidden"} data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
                    <input className={'p-1 rounded-full bg-slate-100 min-w-[95%]'} type="text"
                     onChange={(e) => setMessage(e.target.value)} value={message}></input>
                    <img onClick={ editMessage !== '' ? () => editChatMessage() : () => createMessage()}
                    className='cursor-pointer hover:bg-slate-200 p-1 rounded-full' src={Send} alt="Send icon"/>
            </form>
        </div>
    )
    } 
}


export default MessengerContent
