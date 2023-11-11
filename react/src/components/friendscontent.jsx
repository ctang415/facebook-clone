import { useEffect, useContext, useState } from "react"
import { LoginContext } from "./logincontext"

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
            <>
            <div className={ friends.length === 0 ? "none" : "flex min-h-screen items-center w-screen"}>
                {friends.map(friend => {
                    return (
                        <li>{friend}</li>
                    )
                })}
            </div>
            <div className={ friends.length === 0 ? "flex flex-col min-h-screen w-screen justify-center items-center" : "none"}>
                <h2 className="text-xl font-bold">
                    No friends to show
                </h2>
                <p>When you become friends with people on Odinbook, they'll appear here</p>
            </div>
            </>
        )
    } else if (friendsRequest && !allFriends) {
        return (
            <div className="min-h-screen flex items-center justify-center w-screen">
                <h3 className={ userData.friends.filter(friend => friend.status === "Pending") ? "hidden" :"text-xl"}>
                When you have friend requests or suggestions, you'll see them here.
                </h3>
                <ul>
                {userData.friends.filter(friend => friend.status === "Pending").map(x => {
                    return (
                        <> 
                            {x.users.filter( y => y.id !== userData.id).map(user => {
                            return (
                                <li className="flex flex-row border-1 bg-white p-6 rounded-md shadow-md justify-between min-w-[25vw] min-h-[10vh]"
                                key={user.id}>
                                    <div className="flex flex-row gap-2 p-2">
                                        <img src={user.avatar} alt="Friend icon"/>
                                        <p>{user.full_name}</p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                    <button className={ x.sender !== userData.id ? "p-2 bg-green-500 text-white rounded-md": 'hidden'} onClick={() => acceptRequest(x._id)}>Approve</button>
                                    <button className="p-2 bg-red-500 text-white rounded-md" onClick={() => removeRequest(x._id)}>Remove</button>
                                    </div>
                                </li>
                                )
                        })
                    }
                    </>
                    )}
                    )}
                </ul>
            </div>
        )
    } else {
        return (
            <div className="min-h-screen flex items-center w-screen justify-center">
                <h3 className="text-xl">
                When you have friend requests or suggestions, you'll see them here.
                </h3>
            </div>
        )
    }
}

export default FriendsContent