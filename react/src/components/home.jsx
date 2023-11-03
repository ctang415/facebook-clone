import { useContext, useEffect, useState } from "react"
import { LoginContext } from "./logincontext"
import Navbar from "./navbar"
import Post from './post'
import NewMessage from '../assets/newmessage.svg'
import User from '../assets/account.svg'
import CreatePost from "./createpost"

const Home = () => {
    const { login } = useContext(LoginContext)
    const [ modal, setModal ] = useState(false)
    
    useEffect(() => {
        console.log(modal)
    }, [modal])

    if (!login) {
        return (
            <>
                <div className="flex flex-row h-screen w-screen items-center justify-center gap-10">
                <div className="flex flex-col flex-wrap max-w-md gap-4">
                    <h1 className="text-blue-600 font-bold text-6xl">odinbook</h1>
                    <h2 className="text-3xl">Connect with your friends and the world around you on Odinbook</h2>
                </div>
                <div className="flex flex-col border-slate border-2 rounded shadow-2xl bg-white w-1/3">
                    <form className="flex flex-col gap-5 p-4">
                        <input className="p-2 border-slate border-2 rounded" type="string" placeholder="Email" required></input>
                        <input className="p-2 border-slate border-2 rounded" type="password" placeholder="Password" required></input>
                        <button type="submit" className="p-3 rounded bg-blue-600 text-white font-medium">Log In</button>
                        <button className="p-2 rounded bg-lime-600 text-white font-medium">Create new account</button>
                    </form>
                </div>
                </div>
            </>
        )
    } else {
        return (
            <>
            <Navbar/>
            <CreatePost modal={modal} setModal={setModal} />
            <div className="flex flex-col items-center justify-center gap-[7.5vh]">
            <div className="p-6 mt-[12.5vh] min-w-[42.5vw] bg-white flex flex-row justify-center rounded shadow-xl gap-2">
                <img src={User} alt="User avatar"></img>
                <input onClick={() => setModal(true)}
                className="p-2 bg-slate-100 rounded-full min-w-full" placeholder="What's on your mind?" type="text"></input>
            </div>
            <img className="fixed right-1 bottom-1 min-h-[5vh]" src={NewMessage} alt="Chat icon"></img>
            <div className="flex flex-col">
                <Post/>
            </div>
            </div>
            </>
        )
    }
}

export default Home