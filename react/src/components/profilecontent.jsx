import Post from "./post"

const ProfileContent = () => {
    return (
        <div className="w-[75vw] mx-[10vw] pt-[6vh] grid grid-cols-2">
            <div className="flex flex-col gap-8">
                <div className="p-4 max-w-[30vw] bg-white rounded shadow-md">
                    <h2 className="text-xl font-medium">Intro</h2>
                </div>
                <div className="p-4 bg-white max-w-[30vw] rounded shadow-md">
                    <h2 className="text-xl font-medium">Photos</h2>
                </div>
                <div className="p-4 bg-white rounded max-w-[30vw] shadow-md">
                    <h2 className="text-xl font-medium">Friends</h2>
                </div>
            </div>
            <div className="flex flex-col gap-6 min-w-fit">
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-medium">Posts</h2>
                </div>
                <Post/>
            </div>
        </div>
    )
}

export default ProfileContent