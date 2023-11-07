import Home from '../assets/home.svg'
import Friend from '../assets/friend.svg'
import Group from '../assets/group.svg'
import Message from '../assets/message.svg'
import Notification from '../assets/notification.svg'
import Account from '../assets/account.svg'
import UserModal from './usermodal'
import { useContext } from 'react'
import { LoginContext } from './logincontext'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { userModal, setUserModal, setFriendsRequest, setAllFriends, setChatModal, chatModal } = useContext(LoginContext)
    
    return (
        <nav className="fixed bg-white flex flex-row justify-between items-center p-2 w-full shadow-md z-50">
            <div className='flex flex-row gap-4 items-center'>
                <Link to="/">
                    <p className='cursor-pointer text-4xl text-white font-extrabold rounded-full py-1 px-3 bg-blue-600'>O</p>
                </Link>
                <input className='p-2 bg-slate-100 px-5 rounded-full' type="text" placeholder="Search Odinbook"></input>
            </div>
            <div className='flex flex-row gap-4'>
              <Link to={'/'}>
                <img className='cursor-pointer hover:bg-slate-100 p-3 rounded px-9' src={Home} alt="Home icon"/>
              </Link>
              <Link to={'/friends'} onClick={() => { setFriendsRequest(false); setAllFriends(false)}}>
                <img className='cursor-pointer hover:bg-slate-100 p-3 rounded px-9' src={Friend} alt="Friend icon"/>
              </Link>
              <Link to={'/groups'}>
                <img className='cursor-pointer hover:bg-slate-100 p-3 rounded px-9' src={Group} alt="Group icon"/>
              </Link>
            </div>
            <div className='flex flex-row gap-4 items-center'>
                <Link to="/friends">
                    <p className='cursor-pointer bg-slate-200 hover:bg-slate-300 p-3 rounded-full'>Find Friends</p>
                </Link>
                <img onClick={() => setChatModal(!chatModal)} className='cursor-pointer bg-slate-200 hover:bg-slate-300 p-3 rounded-full' src={Message} alt="Message icon"/>
                <img className='cursor-pointer bg-slate-200 hover:bg-slate-300 p-3 rounded-full' src={Notification} alt="Notification icon"/>
                <img onClick={() => setUserModal(!userModal)} 
                className='cursor-pointer bg-slate-200 hover:bg-slate-300 p-3 rounded-full' src={Account} alt="Account icon"/>
            </div>
            <UserModal userModal={userModal} setUserModal={setUserModal} />
        </nav>
    )
}

export default Navbar