import { useState, useContext, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { LoginContext } from "./logincontext"
import Post from "./post"

const ProfileContent = ( {userProfile, setUserProfile, userPosts, setUserPosts }) => {
    const { userData, fetchUser } = useContext(LoginContext)
    const [ editInformation, setEditInformation ] = useState(false)
    const [ school, setSchool] = useState('')
    const [ location, setLocation ] = useState('')
    const params = useParams()
    
    const updatedInformation = async (e) => {
        e.preventDefault()
        const newInformation = {school: school, location: location}
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/information`, {
                method: 'PUT', headers: {'Content-type': 'application/json'}, body: JSON.stringify(newInformation)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Successfully updated information!')
                setSchool('')
                setLocation('')
                setEditInformation(false)
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }
        
    if (userData.id === params.profileid) {
    return (
        <div className="w-[75vw] mx-[10vw] pt-[6vh] grid grid-cols-2">
            <div className="flex flex-col gap-8">
                <div className={ editInformation === true ? "hidden" : "p-4 max-w-[30vw] bg-white rounded shadow-md flex flex-col gap-2"}>
                    <h2 className="text-xl font-medium">Intro</h2>
                    <p className="flex gap-1">Birthday on <p className="font-medium">{userData.birthdate_formatted}</p></p>
                    <p className={ userData.location === '' ? 'hidden' : "flex gap-1"}>Lives in <p className="font-medium">{userData.location}</p></p>
                    <p className={ userData.school === '' ? 'hidden' : "flex gap-1"}>Studied at <p className="font-medium">{userData.school}</p></p>
                    <button className="p-2 bg-slate-200 hover:bg-slate-300 rounded" onClick={() => setEditInformation(true)}>Edit information</button>
                </div>
                <form onSubmit={updatedInformation}
                    className={ editInformation === true ? "p-4 max-w-[30vw] bg-white rounded shadow-md flex flex-col gap-2" : "hidden"}>
                    <input className="p-2 border-2 rounded border-grey"
                    type="text" name="location" placeholder="Location" onChange={(e) => setLocation(e.target.value)}></input>
                    <input className="p-2 border-2 rounded border-grey"
                    type="text" name="school" placeholder="School" onChange={(e) => setSchool(e.target.value)}></input>
                    <button className="p-2 rounded bg-blue-500 hover:bg-blue-600 font-bold text-white" type="submit">Save changes</button>
                </form>
                <div className="p-4 bg-white max-w-[30vw] rounded shadow-md flex flex-col gap-2">
                    <h2 className="text-xl font-medium">Photos</h2>
                </div>
                <div className="p-4 bg-white rounded max-w-[30vw] shadow-md flex flex-col gap-2">
                    <h2 className="text-xl font-medium">Friends</h2>
                </div>
            </div>
            <div className="flex flex-col gap-6 min-w-fit">
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-medium">Posts</h2>
                </div>
                {userPosts.map(post => {
                    return (
                        <Post key={post._id} post={post}/>
                    )
                })}
            </div>
        </div>
    )
    } else {
        return (
            <div className="w-[75vw] mx-[10vw] pt-[6vh] grid grid-cols-2">
                <div className="flex flex-col gap-8">
                    <div className="p-4 max-w-[30vw] bg-white rounded shadow-md flex flex-col gap-2">
                        <h2 className="text-xl font-medium">Intro</h2>
                        <p className="flex gap-1">Birthday on <p className="font-medium">{userProfile.birthdate_formatted}</p></p>
                        <p className={ userProfile.location === '' ? 'hidden' : "flex gap-1"}>Lives in <p className="font-medium">{userProfile.location}</p></p>
                        <p className={userProfile.school === '' ? 'hidden' : "flex gap-1"}>Studied at <p className="font-medium">{userProfile.school}</p></p>
                    </div>
                    <div className="p-4 bg-white max-w-[30vw] rounded shadow-md flex flex-col gap-2">
                        <h2 className="text-xl font-medium">Photos</h2>
                    </div>
                    <div className="p-4 bg-white rounded max-w-[30vw] shadow-md flex flex-col gap-2">
                        <h2 className="text-xl font-medium">Friends</h2>
                        <div className="flex max-h-[20vh] overflow-scroll">
                            {userProfile.friends && userProfile.friends.map(friend => {
                                return (
                                    friend.users.filter(user => user.id !== userProfile.id).map(x => {
                                        return (
                                            <Link to={`/profiles/${x.id}`}>
                                                <div className="flex flex-col px-8 p-2 border-2 border-grey items-center gap-2 rounded-md" key={friend.id}>
                                                    <div>
                                                        <img src={x.avatar} alt="User icon"/>
                                                    </div>
                                                    <div className="font-bold">{x.full_name}</div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 min-w-fit">
                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-medium">Posts</h2>
                    </div>
                    {userPosts.map(post => {
                        return (
                            <Post key={post._id} post={post}/>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ProfileContent