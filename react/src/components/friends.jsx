import FriendsContent from "./friendscontent"
import FriendsNav from "./friendsnav"
import Navbar from "./navbar"

const Friends = () => {
    
    return (
        <>
            <Navbar/>
            <div className="flex flex-row pt-16">
            <FriendsNav/>
            <FriendsContent/>
            </div>
        </>
    )
}

export default Friends