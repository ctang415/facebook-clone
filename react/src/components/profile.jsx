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
import AvatarModal from './avatarmodal'
import CoverModal from './covermodal'

const Profile = () => {
    const [ profileEdit, setProfileEdit ] = useState(false)
    const profileTabs = [{ name: 'Posts'}, { name: 'About'}, { name: 'Friends'}, { name: 'Photos'}, { name: 'Videos'}]
    const {setMessageModal, userData, fetchUser} = useContext(LoginContext)
    const [ userProfile, setUserProfile ] = useState([])
    const [ userPosts, setUserPosts] = useState([])
    const [ avatarEdit, setAvatarEdit ] = useState(false)
    const [ coverEdit, setCoverEdit] = useState(false)
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
        fetchProfile()
    }, [params, fetchUser])

    return (
        <div className="pb-10">
        <Navbar/>
        <CreateMessage/>
        <ChatModal/>
        <ProfileModal profileEdit={profileEdit} setProfileEdit={setProfileEdit} />
        <AvatarModal avatarEdit={avatarEdit} setAvatarEdit={setAvatarEdit}/>
        <CoverModal coverEdit={coverEdit} setCoverEdit={setCoverEdit}/>
        <img onClick={() => setMessageModal(true)} className="fixed right-1 bottom-1 min-h-[5vh] cursor-pointer" src={NewMessage} alt="Chat icon"></img>    
        <HeaderProfile setAvatarEdit={setAvatarEdit} setCoverEdit={setCoverEdit}
        setProfileEdit={setProfileEdit} profileTabs={profileTabs} fetchProfile={fetchProfile} userProfile={userProfile} setUserProfile={setUserProfile}/>
        <ProfileContent fetchProfile={fetchProfile} userProfile={userProfile} setUserProfile={setUserProfile} userPosts={userPosts} setUserPosts={setUserPosts} />
        <CreatePost/>
        </div>
    )
}

export default Profile