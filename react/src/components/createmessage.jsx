import Send from '../assets/send.svg'
import Message from './message'
import { useState, useEffect } from 'react'
import { LoginContext } from './logincontext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const CreateMessage = () => {
    const { userList, fetchUser, userData, messageModal, setMessageModal} = useContext(LoginContext)
    const [ messageSender, setMessageSender ] = useState('')
    const [ sender, setSender ] = useState('')
    const [ result, setResult ] = useState([])
    const [ search, setSearch ] = useState(false)
    const [ chat, setChat ] = useState([])
    const [ message, setMessage ] = useState('')
    
    const createChat = async () => {
        const newChat = { friendid: sender}
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/chats`, {
                method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(newChat) 
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const fetchChat = async () => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/chats/`)
            if (!response.ok) {
                throw await response.json()
            }
            const data = await response.json()
            if (response.status === 200) {
                
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const createMessage = async () => {
        const newMessage = { message: message }
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${chat.url}/messages`, {
                method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(newMessage)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                setMessage('')
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        setResult(userList.filter(user => user.full_name.includes(messageSender)))
    }, [messageSender])

    useEffect(() => {
        if (userData.chats.length === 0) {
            createChat()
        } else {
            console.log(userData.chats.find(x => x.users.includes(sender)))
            
            setChat(userData.chats.find(x => x.users.includes(sender)))
    /*        if (sender !== '' && !userData.chats.find(x => x.users.includes(sender))) {
                createChat()
            } else {
                // fetchChat()
            }
       */
        }
    }, [sender])
    
    if (messageModal) {
        return (
            <div className="p-4 fixed right-20 bottom-1 bg-white min-h-[65vh] max-h-[65vh] min-w-[20vw] max-w-[20vw] shadow-2xl rounded z-20">
                <div className="flex flex-row items-center">
                    <p>New message</p>
                    <button onClick={() => { setMessageModal(false); setSender(''); setMessageSender(''); setResult('') }} 
                        type="button" className="text-blue-600 bg-transparent hover:bg-gray-200 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <form className='relative'>
                    <div className="flex gap-2 border-b-2">
                        To:
                        <label htmlFor="user"></label>
                        <input type="text" name="user" value={messageSender}
                        onChange={(e) => {setMessageSender(e.target.value); setSearch(true) }}></input>
                    </div>
                <div className={messageSender !== '' && search === true ? "absolute top-6 z-30 bg-white p-4 w-[18vw] min-h-[55vh] max-h-[55vh] overflow-scroll rounded-md shadow-md overflow-scroll" : 'hidden'}>
                    {result.map(res => {
                    return (
                        <li className="flex flex-row gap-1 hover:bg-slate-100 rounded-md items-center p-2" onClick={() => {setMessageSender(res.full_name); setSender(res.id); setSearch(false) }}>
                            <img className="max-h-[3vh]" src={res.avatar} alt="User icon"/>
                            {res.full_name}
                        </li>            
                    )
                })}
            </div>
                    <div className={ messageSender !== '' ? 'flex flex-col items-center min-h-[50vh] max-h-[50vh] overflow-scroll p-2' : 'hidden'}>
                        { userData.chats.find(x => x.users.includes(sender)) !== undefined ? 
                            <div key={userData.chats.find(x => x.users.includes(sender)).id}>
                                {result.map( res => {
                                    return (
                                        <div key={res.id} className='flex flex-col items-center gap-1'>
                                        <img src={res.avatar} alt="User icon"></img>
                                        <h3 className='font-bold'>{res.full_name}</h3>
                                        </div>
                                    )
                                })}
                                <div key={userData.chats.find(x => x.users.includes(sender)).id}>
                                    <ul className='flex flex-col gap-3'>
                                        <Message messages={userData.chats.find(x => x.users.includes(sender)).messages}/>
                                    </ul>        
                                </div>
                            </div>
                     : null }                      
                    </div>
                    <div className={ messageSender !== '' ? 'flex flex-row gap-2 items-center': 'hidden'}>
                        <input className='p-1 min-w-[15vw] rounded-full bg-slate-100' type="text"
                        onChange={(e) => setMessage(e.target.value)}></input>
                        <img onClick={() => createMessage()}
                        className='cursor-pointer hover:bg-slate-200 p-1 rounded-full' src={Send} alt="Send icon"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateMessage

/*
{ userData.chats.find(x => x.users.includes(sender)) !== undefined ? userData.chats.find(x => x.users.includes(sender)).map(user => {
                            return (
                                <div key={user.id}>
                                    {user.users.map(x => {
                                        return (
                                            <div key={user.id}>
                                                <img src={x.id !== userData.id ? x.avatar : null} alt="User icon"></img>
                                                <h3 className='font-bold'>{x.id !== userData.id ? x.full_name : null}</h3>
                                                <ul className='flex flex-col gap-3'>
                                                    <Message messages={user.messages}/>
                                                </ul>        
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }) : null }
                    */