import { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { LoginContext } from "./logincontext"

const HeaderProfile = ({profileTabs, setProfileEdit, fetchProfile, userProfile, setUserProfile }) => {
    const { userData, fetchUser } = useContext(LoginContext)
    const params = useParams()
    
    const addFriend = async () => {
        const friendRequest = { id: userData.id, friendid: params.profileid}
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/friends`, {
                method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(friendRequest) 
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }

    if (userData.id === params.profileid) {
    return (
        <div className="bg-white shadow-md">
        <div className="w-[80vw] mx-[10vw] pt-[9vh]">
            <div className="min-h-[75vh]">
                <div className="bg-slate-200 min-h-[55vh]">
                </div>
                <div className="flex flex-row justify-between p-6 border-b-2 z-1 relative">
                    <div className="flex flex-row items-center">
                    <img className="rounded-full border-white min-h-[20vh] bg-white absolute z-1 mb-20" src={userData.avatar} alt="User icon"></img>
                    <h1 className="text-4xl mx-[12.5vw] font-semibold">{userData.full_name}</h1>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-blue-600 rounded-lg p-2 text-white">Add to story</button>
                        <button onClick={() => setProfileEdit(true)} className="bg-slate-300 p-2 rounded-lg">Edit profile</button>
                    </div>
                </div>
                <div>
                    <ul className="flex flex-row gap-8 p-2">
                        {profileTabs.map(tab => {
                            return (
                                <li className="cursor-pointer hover:bg-slate-200 p-2 rounded">{tab.name}</li>
                            )
                        })
                        }
                    </ul>
                </div>
            </div>
        </div>
        </div>
    )
    } else {
        return (
            <div className="bg-white shadow-md">
            <div className="w-[80vw] mx-[10vw] pt-[9vh]">
                <div className="min-h-[75vh]">
                    <div className="bg-slate-200 min-h-[55vh]">
                    </div>
                    <div className="flex flex-row justify-between p-6 border-b-2 z-1 relative">
                        <div className="flex flex-row items-center">
                        <img className="rounded-full border-white min-h-[20vh] bg-white absolute z-1 mb-20" src={userProfile.avatar} alt="User icon"></img>
                        <h1 className="text-4xl mx-[12.5vw] font-semibold">{userProfile.full_name}</h1>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => addFriend()} className={ userProfile.friends && userProfile.friends.length !== 0 || userProfile.friends.map(friend => friend.users).includes(userProfile.id)
                            ? "hidden" : "bg-blue-600 rounded-lg p-2 text-white"}>Add friend</button>
                            <button className="bg-slate-300 p-2 rounded-lg">Message</button>
                        </div>
                    </div>
                    <div>
                        <ul className="flex flex-row gap-8 p-2">
                            {profileTabs.map(tab => {
                                return (
                                    <li key={tab.name} className="cursor-pointer hover:bg-slate-200 p-2 rounded">{tab.name}</li>
                                )
                            })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        )    
    }
}

export default HeaderProfile