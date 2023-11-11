import Navbar from "./navbar"
import NewMessage from '../assets/newmessage.svg'
import HeaderProfile from "./headerprofile"
import ProfileContent from "./profilecontent"
import CreatePost from "./createpost"
import { useContext, useState } from "react"
import { LoginContext } from "./logincontext"
import CreateMessage from "./createmessage"
import ChatModal from "./chatmodal"
import ProfileModal from './profilemodal'
import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Profile = () => {
    const [ profileEdit, setProfileEdit ] = useState(false)
    const profileTabs = [{ name: 'Posts'}, { name: 'About'}, { name: 'Friends'}, { name: 'Photos'}, { name: 'Videos'}]
    const {setMessageModal, userData} = useContext(LoginContext)
    const [ userProfile, setUserProfile ] = useState([])
    const [ userPosts, setUserPosts] = useState([])
    const params = useParams()
    
    const fetchProfile = async () => {
        try {
            const response = await fetch (`http://localhost:3000/users/${params.profileid}`)
            if (!response.ok) {
                throw await response.json()
            }
            const data = await response.json()
            if (response.status === 200) {
                setUserProfile(data.user)
                setUserPosts(data.user.posts)
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (userData.id !== params.profileid) {
            fetchProfile()
        }
    }, [])

    return (
        <div className="pb-10">
        <Navbar/>
        <CreateMessage/>
        <ChatModal/>
        <ProfileModal profileEdit={profileEdit} setProfileEdit={setProfileEdit} />
        <img onClick={() => setMessageModal(true)} className="fixed right-1 bottom-1 min-h-[5vh] cursor-pointer" src={NewMessage} alt="Chat icon"></img>    
        <HeaderProfile setProfileEdit={setProfileEdit} profileTabs={profileTabs} fetchProfile={fetchProfile} userProfile={userProfile} setUserProfile={setUserProfile}/>
        <ProfileContent fetchProfile={fetchProfile} userProfile={userProfile} setUserProfile={setUserProfile} userPosts={userPosts} setUserPosts={setUserPosts} />
        <CreatePost/>
        </div>
    )
}

export default Profile