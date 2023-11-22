import { useEffect, useContext, useState } from "react"
import { LoginContext } from "./logincontext"
import { Link } from 'react-router-dom'

const FriendsContent = () => {
    const { allFriends, friendsRequest, userData, fetchUser } = useContext(LoginContext)
    const friends = []

    const removeRequest = async (id, friendid) => {
        const request = { user: userData.id, friend: friendid }
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/friends/${id}`, {
                method: 'DELETE', headers: {'Content-type': 'application/json'}, body: JSON.stringify(request)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Friend request removed')
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const acceptRequest = async (id) => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/friends/${id}`, {
                method: 'PUT', headers: {'Content-type': 'application/json'}
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Friend request accepted')
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }

    if (allFriends && !friendsRequest) {
        return (
            <div className="min-h-full w-screen pt-20">
            <div className={ userData.friends.filter(friend => friend.status === "Friends").length === 0 ? "hidden" : "flex flex-row justify-center flex-wrap gap-8"}>
                { userData.friends.filter(friend => friend.status === "Friends").map(x => {
                    return (
                        <div class key={x._id}>
                        {x.users.filter( y => y.id !== userData.id).map(user => {
                            return (
                                <Link to={`/profiles/${user.id}`} key={user.id}>
                                <li className="flex flex-row border-1 bg-white p-6 rounded-md shadow-md justify-between min-w-[20vw] min-h-[10vh] items-center"
                                key={user.id}>
                                    <div className="flex flex-row gap-2 p-2">
                                        <img className="max-h-[3vh]" src={user.avatar} alt="User icon"/>
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
            </div>
            <div className={ userData.friends &&
                userData.friends.filter(friend => friend.status === "Friends").length === 0 ? "flex flex-col min-h-full min-w-full justify-center items-center" : "hidden"}>
                <h2 className="text-xl font-bold">
                    No friends to show
                </h2>
                <p>When you become friends with people on Odinbook, they'll appear here</p>
            </div>
            </div>
        )
    } else if (friendsRequest && !allFriends) {
        return (
            <div className="min-h-full w-screen flex pt-20">
            <div className="items-center justify-center">
                <h3 className={ userData.friends.filter(friend => friend.status === "Pending") ? "hidden" :"text-xl"}>
                When you have friend requests or suggestions, you'll see them here.
                </h3>
                <ul className="flex flex-row gap-6 justify-center flex-wrap">
                { userData.friends &&
                userData.friends.filter(friend => friend.status === "Pending").map(x => {
                    return (
                        <div key={x.id}> 
                            {x.users.filter( y => y.id !== userData.id).map(user => {
                            return (
                                <Link to={`/profiles/${user.id}`} key={user.id}>
                                <li className="flex flex-row border-1 bg-white p-6 rounded-md shadow-md justify-between min-w-[25vw] min-h-[12vh]">
                                    <div className="flex flex-row gap-2 p-2">
                                        <img className="max-h-[3vh]" src={user.avatar} alt="Friend icon"/>
                                        <p>{user.full_name}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                    <button className={ x.sender !== userData.id ? "p-2 bg-green-500 text-white rounded-md": 'hidden'} onClick={() => acceptRequest(x._id)}>Approve</button>
                                    <button className="p-2 bg-red-500 text-white rounded-md" onClick={() => removeRequest(x._id)}>Remove</button>
                                    </div>
                                </li>
                                </Link>
                                )
                        })
                    }
                    </div>
                    )}
                    )}
                </ul>
            </div>
            </div>
        )
    } else {
        return (
            <div className="min-h-full flex flex-row items-center justify-center w-screen">
                <h3 className="text-xl">
                When you have friend requests or suggestions, you'll see them here.
                </h3>
            </div>
        )
    }
}

export default FriendsContent