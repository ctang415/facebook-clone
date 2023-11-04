import User from '../assets/account.svg'

const HeaderProfile = ({profileTabs}) => {

    return (
        <div className="bg-white shadow-md">
        <div className="w-[80vw] mx-[10vw] pt-[9vh]">
            <div className="min-h-[75vh]">
                <div className="bg-slate-200 min-h-[55vh]">
                </div>
                <div className="flex flex-row justify-between p-6 border-b-2 z-1 relative">
                    <div className="flex flex-row items-center">
                    <img className="rounded-full border-white min-h-[20vh] bg-white absolute z-1 mb-20" src={User} alt="User icon"></img>
                    <h1 className="text-4xl mx-[12.5vw] font-semibold">My Name</h1>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-blue-600 rounded-lg p-2 text-white">Add friend</button>
                        <button className="bg-slate-300 p-2 rounded-lg">Message</button>
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
}

export default HeaderProfile