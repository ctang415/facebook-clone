import Send from '../assets/send.svg';
import Message from './message';
import { useState, useEffect } from 'react';
import { LoginContext } from './logincontext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const CreateMessage = () => {
    const { setLogin, userChat, setUserChat, userList, fetchUser, userData, messageModal, setMessageModal,
    socket, refreshToken, sender, setSender, messageSender, setMessageSender, chat, setChat} = useContext(LoginContext);
    const [ result, setResult ] = useState([]);
    const [ search, setSearch ] = useState(false);
    const [ message, setMessage ] = useState('');
    const [ chatModal, setChatModal ] = useState(false);
    const [ editMessage, setEditMessage ] = useState('');
    const chatRef = useRef(null);
    const navigate = useNavigate();

    const refreshTokenChat = async (id, fn) => {
        const token = { token: userData.token }
        try {
          const response = await fetch ('http://localhost:4000/token', {
            method:'POST', headers: {'Content-type': 'application/json'}, credentials: 'include',
            body: JSON.stringify(token)
          })
          if (!response.ok) {
            throw await response.json();
          }
          let data = await response.json();
          if (response.status === 200) {
            console.log('token refreshed');
            console.log(data);
            fn(id);
          }
        } catch (err) {
          console.log(err);
        }
      }

    const createChat = async (id) => {
        const newChat = { friendid: id}
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/chats`, {
                method: 'POST', headers: {'Content-type': 'application/json'}, credentials: 'include',
                body: JSON.stringify(newChat) 
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshTokenChat(id, createChat);
                } else if (response.status === 404) {
                    setLogin(false);
                    setChat([]);
                    navigate('/');
                } else {
                    throw await response.json();
                }
            }
            const data = await response.json();
            if (response.status === 200) {
                fetchUser();
                setChat(data.chat);
                socket.current.emit('join', data.chat.id);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const createMessage = async (e) => {
        const newMessage = { message: message, timestamp: Date.now()}
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${chat.url}/messages`, {
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
                const response = await fetch (`http://localhost:3000${userData.url}${userChat.find( x => x.users.some( y => y.id === sender)).url}/messages/${editMessage.id}`, {
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
                    socket.current.emit('update-messenger', data.chat);
                    setEditMessage('');
                    setMessage('');
                }
            } catch (err) {
                console.log(err);
            }
            
        }

    const deleteChat = async (e) => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${userData.chats.find(x=> x.users.some(y => y.id === sender)).url}`, {
                method: 'DELETE', headers: {'Content-type': 'application/json'}, credentials: 'include',
                body: JSON.stringify({ friendid: sender})
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken(e, deleteChat);
                } else if (response.status === 404) {
                    setLogin(false);
                    setSender('');
                    setResult([]);
                    setMessageModal(false);
                    setChat([]);
                    navigate('/');
                } else {
                throw await response.json();
                }
            }
            const data = await response.json();
            if (response.status === 200) {
                alert('Successfully deleted chat');
                setSender('');
                setMessageSender('');
                setResult([]);
                setMessageModal(false);
                fetchUser();
                setChat([]);
           }
        } catch (err) {
            console.log(err);
        }
    }

    const closeChatMenu = (e) => {
        if (chatRef.current && chatModal && !chatRef.current.contains(e.target)) {
          setChatModal(false);
        }
    }

    const checkChat = (id) => {
        if ( !(userData.chats.find(x => x.users.some( y => y.id === id))) ) {
            createChat(id);
        } else {
            setChat(userData.chats.find(x=> x.users.some( y => y.id === id)));
            socket.current.emit('join', userData.chats.find(x=> x.users.some( y => y.id === id)).id);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeChatMenu);
         }, [closeChatMenu]);

    useEffect(() => {
        setResult(userList.filter(user => user.id !== userData.id).filter(user => user.full_name.includes(messageSender)));
    }, [messageSender]);

  useEffect(() => {
    const setNewMessage = (message) => {
        setUserChat(userChat.map( x => x.id === message.id ? message : x));
    }

    socket.current.on('get-message', setNewMessage);
    
    const setUpdatedMessage = (message) => {
        setUserChat(userChat.map( x => x.id === message.id ? message : x));
    }
    socket.current.on('get-update-messenger', setUpdatedMessage);
    
    return () => {
        socket.current.off('get-update-messenger');
        socket.current.off('get-message-messenger');
    }
  }, [createChat, messageSender]);
    
    if (messageModal) {
        return (
            <div className="p-4 fixed right-20 bottom-1 bg-white min-h-[65vh] max-h-[65vh] min-w-[20vw] max-w-[20vw] shadow-2xl rounded z-20">
                <div className="flex flex-row items-center">
                    <p className={ sender !== '' ? 'hidden' : 'flex' }>New message</p>
                    <button onClick={() => { setMessageModal(false); setSender(''); setMessageSender(''); setResult(''); fetchUser() }} 
                        type="button" className="text-blue-600 bg-transparent hover:bg-gray-200 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <form className='relative'>
                    <div className={ sender !== '' ? 'hidden' : "flex gap-2 border-b-2"}>
                        To:
                        <label htmlFor="user"></label>
                        <input type="text" name="user" value={messageSender}
                        onChange={(e) => {setMessageSender(e.target.value); setSearch(true) }}></input>
                    </div>
                    <div className={ sender !== '' ? 'flex' : 'hidden'}>
            <ul className={chatModal ? 'absolute bg-white rounded-lg gap-2 flex flex-col shadow-xl z-60 border-2' : 'hidden'}
            ref={chatRef}>
                <li onClick={() => deleteChat() } className="p-2 hover:bg-slate-100 cursor-pointer">Delete chat</li>
            </ul>
            { result.length !== 0 ? result.map(res => {
                        return (
                        <li key={res._id} className="flex flex-row gap-1 items-center p-2" onClick={() => setChatModal(true)}>
                            <img className="max-h-[3vh]" src={res.avatar} alt="User icon"/>
                            {res.full_name}
                        </li>            
                    )
            }) : null }
                    </div>
                <div className={messageSender !== '' && search === true ? "absolute top-6 z-30 bg-white p-4 w-[18vw] min-h-[55vh] max-h-[55vh] overflow-scroll rounded-md shadow-md overflow-scroll" : 'hidden'}>
                    { result.length !== 0 ? result.map(res => {
                    return (
                        <li key={res.id} 
                        className="flex flex-row gap-1 hover:bg-slate-100 rounded-md items-center p-2" onClick={() => { setMessageSender(res.full_name); setSender(res.id); setSearch(false); checkChat(res.id); }}>
                            <img className="max-h-[3vh]" src={res.avatar} alt="User icon"/>
                            {res.full_name}
                        </li>            
                    )
                }) : null }
            </div>
                    <div className={ messageSender !== '' ? 'flex flex-col items-center min-h-[47vh] max-h-[47vh] overflow-scroll p-2' : 'hidden'}>
                        { userChat.find(x => x.users.some( y => y.id === sender)) !== undefined ? 
                            <div key={userChat.find(x => x.users.some( y => y.id === sender)).id}>
                                { result.length !== 0 ? result.map( res => {
                                    return (
                                        <div key={res.id} className='flex flex-col items-center gap-1'>
                                        <img src={res.avatar} alt="User icon"></img>
                                        <h3 className='font-bold'>{res.full_name}</h3>
                                        </div>
                                    )
                                }) : null }
                                <div key={userChat.find(x => x.users.some( y => y.id === sender)).id}>
                                    <ul className='flex flex-col gap-3'>
                                        <Message setEditMessage={setEditMessage} editMessage={editMessage} setMessage={setMessage}
                                         messages={ sender !== userData.id ? userChat.find(x => x.users.some( y => y.id === sender)).messages
                                        : []}/>
                                    </ul>        
                                </div>
                            </div>
                     : null }
                    </div>
                    <div className={ messageSender !== '' ? 'flex flex-row gap-2 items-center': 'hidden'}>
                    <button onClick={() => { setEditMessage(''); setMessage('') }} 
                        type="button" className={ editMessage !== '' ? "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" : "hidden"} data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                        <input className='p-1 min-w-[15vw] rounded-full bg-slate-100' type="text"
                        value={message} onChange={(e) => setMessage(e.target.value)}></input>
                        <img onClick={ editMessage !== '' ? () => editChatMessage() : () => createMessage()}
                        className='cursor-pointer hover:bg-slate-200 p-1 rounded-full' src={Send} alt="Send icon"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateMessage