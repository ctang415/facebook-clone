import { useContext } from "react"
import { LoginContext } from "./logincontext"
import Back from '../assets/back.svg'

const FriendsNav = () => {
    const { friendsRequest, setFriendsRequest, allFriends, setAllFriends } = useContext(LoginContext)
    const friends = []

    if (friendsRequest && !allFriends) {
        return (
            <div className="bg-white min-h-screen w-[25vw] shadow-xl">
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
            <div className="bg-white min-h-screen w-[25vw] shadow-xl">
                <div className="flex flex-col p-2">
                <h1 className="px-8 py-4 text-2xl font-bold flex flex-row gap-2 items-center">
                    <img className="cursor-pointer hover:bg-slate-100 rounded-full p-2" onClick={() => setAllFriends(false)} src={Back} alt="Back arrow icon"/>
                    All Friends
                </h1>
                <input className="bg-slate-100 p-2 self-center min-w-full rounded-xl" type="text" placeholder="Search friends"></input>
                </div>
                <ul className="flex flex-col p-4">
                    <li className="p-4 text-md font-semibold">Friends</li>
                    <ul className={friends.length === 0 ? "none" : "flex p-4" }>
                        {friends.map(friends => {
                            return (
                                <li></li>
                            )
                        })}
                        <li className={friends.length === 0 ? "flex p-4 text-sm" : "none"}>
                            No friends to show
                        </li>
                    </ul>
                </ul>
            </div>
        )
    } else {
    return (
        <div className="bg-white min-h-screen w-[25vw] shadow-xl">
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