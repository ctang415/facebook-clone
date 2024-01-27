import { useContext } from "react";
import { LoginContext } from "./logincontext";

const GroupNav = () => {
    const { myGroups, setMyGroups, discover, setDiscover, feed, setFeed} = useContext(LoginContext);
    
    return (
        <div className="bg-white min-h-screen w-[25vw] p-2 shadow-xl">
            <h1 className="px-8 py-4 text-2xl font-bold">Groups</h1>
            <input type="search" className="bg-slate-100 min-w-full rounded-md"></input>
            <ul className="flex flex-col gap-4 p-4">
                <li onClick={() => { setFeed(true); setDiscover(false); setMyGroups(false)}} className="p-4 hover:bg-slate-100 cursor-pointer text-lg rounded-md">Your feed</li>
                <li onClick={() => { setFeed(false); setDiscover(true); setMyGroups(false)}} className="p-4 hover:bg-slate-100 cursor-pointer text-lg rounded-md">Discover</li>
                <li onClick={() => { setFeed(false); setMyGroups(true); setDiscover(false)}} className="p-4 hover:bg-slate-100 cursor-pointer text-lg rounded-md">Your groups</li>
            </ul>
        </div>
    )
    
}

export default GroupNav