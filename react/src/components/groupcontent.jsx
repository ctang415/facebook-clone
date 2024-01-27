import { useContext } from "react";
import { LoginContext } from "./logincontext";

const GroupContent = () => {
    const { feed, discover, myGroups } = useContext(LoginContext);

    if (discover && !feed && !myGroups) {
        return (
            <div className="p-10 flex flex-col gap-10">
                <div>
                <h2 className="text-lg font-bold">Suggested for you</h2>
                <div>
                    <ul className="grid grid-cols-3 gap-10">
                        <li className="min-w-[20vw] bg-white p-4 rounded-xl flex items-center flex-col gap-2">
                            <div className="min-h-[5vh]"></div>
                            <h2 className="text-lg font-bold">NYC Family Events & Vacations</h2>
                            <button className="bg-slate-200 rounded p-2">Join group</button>
                        </li>
                        <li className="min-w-[20vw] bg-white p-4 rounded-xl flex items-center flex-col gap-2">
                            <div className="min-h-[5vh]"></div>
                            <h2 className="text-lg font-bold">Too good to go</h2>
                            <button className="bg-slate-200 rounded p-2">Join group</button>
                        </li>
                        <li className="min-w-[20vw] bg-white p-4 rounded-xl flex items-center flex-col gap-2">
                            <div className="min-h-[5vh]"></div>
                            <h2 className="text-lg font-bold">NYC Housing Connects</h2>
                            <button className="bg-slate-200 rounded p-2">Join group</button>
                        </li>
                    </ul>
                </div>
                </div>
                <div>
                <h2 className="text-lg font-bold">Popular near you</h2>
                <div>
                    <ul className="grid grid-cols-3 gap-10">
                        <li className="min-w-[20vw] bg-white p-4 rounded-xl flex items-center flex-col gap-2">
                            <div className="min-h-[5vh]"></div>
                            <h2 className="text-lg font-bold">Jobs in NYC</h2>
                            <button className="bg-slate-200 rounded p-2">Join group</button>
                        </li>
                        <li className="min-w-[20vw] bg-white p-4 rounded-xl flex items-center flex-col gap-2">
                            <div className="min-h-[5vh]"></div>
                            <h2 className="text-lg font-bold">Old Images of NYC</h2>
                            <button className="bg-slate-200 rounded p-2">Join group</button>
                        </li>
                        <li className="min-w-[20vw] bg-white p-4 rounded-xl flex items-center flex-col gap-2">
                            <div className="min-h-[5vh]"></div>
                            <h2 className="text-lg font-bold">Caribbean Recipes</h2>
                            <button className="bg-slate-200 rounded p-2">Join group</button>
                        </li>
                    </ul>
                </div>
                    
                </div>
            </div>
        )
    } else if (myGroups && !feed && !discover) {
        return (
            <div className="p-10">
                <h2 className="text-lg font-bold">All groups you've joined</h2>
            </div>
        )
    } else {
        return (
            <div className="p-10">
                <h2 className="text-lg font-bold">Suggested for you</h2>
                <ul className="grid grid-cols-3 gap-10">
                        <li className="min-w-[20vw] bg-white p-4 rounded-xl flex items-center flex-col gap-2">
                            <div className="min-h-[5vh]"></div>
                            <h2 className="text-lg font-bold">NYC Family Events & Vacations</h2>
                            <button className="bg-slate-200 rounded p-2">Join group</button>
                        </li>
                        <li className="min-w-[20vw] bg-white p-4 rounded-xl flex items-center flex-col gap-2">
                            <div className="min-h-[5vh]"></div>
                            <h2 className="text-lg font-bold">Too good to go</h2>
                            <button className="bg-slate-200 rounded p-2">Join group</button>
                        </li>
                        <li className="min-w-[20vw] bg-white p-4 rounded-xl flex items-center flex-col gap-2">
                            <div className="min-h-[5vh]"></div>
                            <h2 className="text-lg font-bold">NYC Housing Connects</h2>
                            <button className="bg-slate-200 rounded p-2">Join group</button>
                        </li>
                    </ul>
            </div>
        )
    }
}

export default GroupContent