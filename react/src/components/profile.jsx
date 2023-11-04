import Navbar from "./navbar"
import User from '../assets/account.svg'
import HeaderProfile from "./headerprofile"
import ProfileContent from "./profilecontent"

const Profile = () => {
    const profileTabs = [{ name: 'Posts'}, { name: 'About'}, { name: 'Friends'}, { name: 'Photos'}, { name: 'Videos'}]
    
    return (
        <>
        <Navbar/>
        <HeaderProfile profileTabs={profileTabs}/>
        <ProfileContent/>
        </>
    )
}

export default Profile