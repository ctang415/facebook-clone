import { useContext, useEffect, useState } from "react"
import { LoginContext } from "./logincontext"
import Navbar from "./navbar"
import Post from './post'
import NewMessage from '../assets/newmessage.svg'
import CreatePost from "./createpost"
import CreateMessage from "./createmessage"
import ChatModal from "./chatmodal"
import Register from './register'

const Home = () => {
    const { setLogin, login, modal, setModal, editModal, setEditModal, messageModal, setMessageModal, userData,
    setPosts, posts, setUserData, setUserList } = useContext(LoginContext) 
    const [ register, setRegister ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ errors, setErrors] = useState([])
    let filteredPosts = [] 
        
    const grabUsers = async () => {
        try {
            const response = await fetch ('http://localhost:3000/users')
            if (!response.ok) {
                throw await response.json()
            }
            const data = await response.json()
            if (response.status === 200) {
                setUserList(data.users)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const loginToAccount = async (e) => {
        e.preventDefault()
        setErrors([])
        const account = { email: email, password: password}
        try {
            const response = await fetch ('http://localhost:3000', {
                method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(account)
            })
            if (!response.ok) {
                throw await response.json()
            }
            const data = await response.json()
            if (response.status === 200) {
                alert('success')
                setLogin(true)
                setUserData(data.user)
                setPosts(data.user.posts)
                data.user.friends.map(friend => friend.status === "Friends" && friend.users.filter( x => x.id !== data.user.id ? x.posts.map(y => setPosts( prev => [...prev, y] )) : x ))
                grabUsers()
                console.log(data)
            }
        } catch (err) {
            console.log(err)
            setErrors(err.errors)
        }
    }

    if (!login) {
        return (
            <>
                <div className="flex flex-row h-screen w-screen items-center justify-center gap-10">
                <div className="flex flex-col flex-wrap max-w-md gap-4">
                    <h1 className="text-blue-600 font-bold text-6xl">odinbook</h1>
                    <h2 className="text-3xl">Connect with your friends and the world around you on Odinbook</h2>
                </div>
                <Register register={register} setRegister={setRegister} />
                <div className="flex flex-col border-slate border-2 rounded shadow-2xl bg-white w-1/3">
                    <form className="flex flex-col gap-5 p-4" onSubmit={loginToAccount}>
                        <input className="p-2 border-slate border-2 rounded" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required></input>
                        <input className="p-2 border-slate border-2 rounded" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required></input>
                        <button type="submit" className="p-3 rounded bg-blue-600 text-white font-medium">Log In</button>
                    </form>
                    <div className="flex p-4">
                    <button onClick={() => setRegister(true)} className="min-w-full p-2 rounded bg-lime-600 text-white font-medium">Create new account</button>
                    </div>
                    <li className="self-center p-2 list-none text-red-500 font-bold">{errors.message}</li>
                </div>
                </div>
            </>
        )
    } else {
        return (
            <div className="pb-10">
            <Navbar/>
            <CreatePost/>
            <ChatModal/>
            <div className="flex flex-col items-center justify-center gap-[7.5vh]">
                <CreateMessage/>
            <div className="p-6 mt-[12.5vh] min-w-[42.5vw] items-center bg-white flex flex-row justify-center rounded shadow-xl gap-2">
                <img className="max-h-[3vh]" src={userData.avatar} alt="User avatar"></img>
                <input onClick={() => setModal(true)}
                className="p-2 bg-slate-100 rounded-full min-w-full" placeholder="What's on your mind?" type="text"></input>
            </div>
            <img onClick={() => setMessageModal(true)} className="fixed right-1 bottom-1 min-h-[5vh] cursor-pointer" src={NewMessage} alt="Chat icon"></img>
            <div className="flex flex-col gap-10">
                {posts.map(post => {
                    return (
                        <Post key={post._id} post={post}/>
                    )
                })}
            </div>
            </div>
            </div>
        )
    }
}

export default Home