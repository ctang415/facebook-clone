import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "./logincontext";
import MessengerNavDetail from "./messengernavdetail";

const MessengerNav = () => {
    const { userChat, userData } = useContext(LoginContext);
    const [ results, setResults ] = useState([]);
    const [ search, setSearch] = useState('');
    
    useEffect(() => {
        setResults(userData.chats.filter( x => x.users.find( y => y.full_name.includes(search))));
      }, [search]);

    return (
        <div className="bg-white min-w-[25vw] max-w-[25vw] min-h-[100vh] p-2 shadow-xl gap-4 flex flex-col pt-16">
            <h1 className="text-2xl font-bold">Chats</h1>
            <input type="search" placeholder="Search Messenger" className="bg-slate-100 rounded-full p-2 min-w-full"
            onChange={(e) => setSearch(e.target.value)}/>
            <ul className={ search !== '' ? "flex flex-col items-center overflow-x-hidden gap-2 overflow-y-scroll" : 'hidden'}>
                    {results.map(result => {
                        return (
                            <div key={result.id} className='min-w-full'>
                            {result.users.map( user => {
                                return (
                                    <Link to={ user.id !== userData.id ? `/messenger/${user.id}` : null}>
                                        <li key={user.id} className={ user.id !== userData.id ? "flex gap-2 min-w-full hover:bg-slate-100 rounded-md p-2 items-center" : 'hidden'}>
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
            <ul className={ search !== '' ? 'hidden' : "flex flex-col gap-3"}>
                {userChat !== undefined ? userChat.map( chat => {
                        return (
                            <div key={chat.id} className="flex flex-row items-center min-w-full">
                            {chat.users.map(user => {
                            return(
                            <MessengerNavDetail user={user} chat={chat}/>
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