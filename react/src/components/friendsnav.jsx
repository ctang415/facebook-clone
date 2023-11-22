import { useContext } from "react"
import { LoginContext } from "./logincontext"
import Back from '../assets/back.svg'
import { Link } from 'react-router-dom'

const FriendsNav = () => {
    const { userData, friendsRequest, setFriendsRequest, allFriends, setAllFriends } = useContext(LoginContext)

    if (friendsRequest && !allFriends) {
        return (
            <div className="bg-white min-h-screen min-w-[25vw] max-w-[25vw] overflow-scroll shadow-xl pt-16">
                <h1 className="px-8 py-4 text-xl font-bold flex flex-row gap-2 items-center">
                    <img className="cursor-pointer hover:bg-slate-100 rounded-full p-2" onClick={() => setFriendsRequest(false)} src={Back} alt="Back arrow icon"/>
                    Friend Requests
                </h1>
                <ul className="flex flex-col p-4">
                    <li className="p-4 text-md">Friend Requests</li>
                    <li className="p-4 text-sm text-blue-500 cursor-pointer rounded-md">View Sent Requests</li>
                </ul>
            </div>
        )
    } else if (allFriends && !friendsRequest) {
        return (
            <div className="bg-white min-h-screen min-w-[25vw] max-w-[25vw] shadow-xl pt-16">
                <div className="flex flex-col p-2">
                <h1 className="px-8 py-4 text-2xl font-bold flex flex-row gap-2 items-center">
                    <img className="cursor-pointer hover:bg-slate-100 rounded-full p-2" onClick={() => setAllFriends(false)} src={Back} alt="Back arrow icon"/>
                    All Friends
                </h1>
                <input className="bg-slate-100 p-2 self-center min-w-full rounded-xl" type="text" placeholder="Search friends"></input>
                </div>
                <ul className="flex flex-col p-4 overflow-scroll">
                    <h3 className="p-4 text-md font-semibold">Friends</h3>
                    { userData.friends &&
                    userData.friends.filter(friend => friend.status === "Friends").map(x => {
                    return (
                        <div key={x._id} className="max-h-[13vh]">
                        {x.users.filter( y => y.id !== userData.id).map(user => {
                            return (
                                <Link to={`/profiles/${user.id}`} key={user.id}>
                                <li className="flex flex-row border-2 border-gray-100 bg-white p-4 rounded-md shadow-md justify-between min-w-[15vw] min-h-[10vh]"
                                key={user.id}>
                                    <div className="flex flex-row gap-2 p-2">
                                        <img className="max-h-[3vh]" src={user.avatar} alt="Friend icon"/>
                                        <p>{user.full_name}</p>
                                    </div>
                                </li>
                                </Link>
                            )
                            }
                        )
                        }
                    </div>
                    )
                })}
                        <li className={ userData.friends && userData.friends.length === 0 ? "flex p-4 text-sm" : "hidden"}>
                            No friends to show
                        </li>
                </ul>
            </div>
        )
    } else {
    return (
        <div className="bg-white min-h-screen min-w-[25vw] max-w-[25vw] shadow-xl overflow-scroll pt-16">
            <h1 className="px-8 py-4 text-2xl font-bold">Friends</h1>
            <ul className="flex flex-col gap-4 p-4">
                <li onClick={() => { setFriendsRequest(false); setAllFriends(false)}} className="p-4 hover:bg-slate-100 cursor-pointer text-lg rounded-md">Home</li>
                <li onClick={() => { setFriendsRequest(true); setAllFriends(false)}} className="p-4 hover:bg-slate-100 cursor-pointer text-lg rounded-md">Friend Requests</li>
                <li onClick={() => { setFriendsRequest(false); setAllFriends(true)}} className="p-4 hover:bg-slate-100 cursor-pointer text-lg rounded-md">All friends</li>
            </ul>
        </div>
    ) 
    }
}

export default FriendsNav