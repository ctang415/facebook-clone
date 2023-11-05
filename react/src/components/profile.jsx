import Navbar from "./navbar"
import User from '../assets/account.svg'
import HeaderProfile from "./headerprofile"
import ProfileContent from "./profilecontent"
import CreatePost from "./createpost"

const Profile = () => {
    const profileTabs = [{ name: 'Posts'}, { name: 'About'}, { name: 'Friends'}, { name: 'Photos'}, { name: 'Videos'}]
    
    return (
        <div className="pb-10">
        <Navbar/>
        <HeaderProfile profileTabs={profileTabs}/>
        <ProfileContent/>
        <CreatePost/>
        </div>
    )
}

export default Profile