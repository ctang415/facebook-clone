import Navbar from "./navbar"
import User from '../assets/account.svg'
import HeaderProfile from "./headerprofile"
import ProfileContent from "./profilecontent"
import CreatePost from "./createpost"
import { useContext } from "react"
import { LoginContext } from "./logincontext"
import CreateMessage from "./createmessage"
import ChatModal from "./chatmodal"

const Profile = () => {
    const profileTabs = [{ name: 'Posts'}, { name: 'About'}, { name: 'Friends'}, { name: 'Photos'}, { name: 'Videos'}]
    const {setMessageModal} = useContext(LoginContext)

    return (
        <div className="pb-10">
        <Navbar/>
        <CreateMessage/>
        <ChatModal/>
        <img onClick={() => setMessageModal(true)} className="fixed right-1 bottom-1 min-h-[5vh] cursor-pointer" src={NewMessage} alt="Chat icon"></img>    
        <HeaderProfile profileTabs={profileTabs}/>
        <ProfileContent/>
        <CreatePost/>
        </div>
    )
}

export default Profile