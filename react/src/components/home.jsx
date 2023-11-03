import { useContext } from "react"
import { LoginContext } from "./logincontext"
import Navbar from "./navbar"

const Home = () => {
    const { login } = useContext(LoginContext)

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
            <div>

            </div>
            </>
        )
    }
}

export default Home