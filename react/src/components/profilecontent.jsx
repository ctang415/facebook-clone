import Post from "./post"

const ProfileContent = () => {
    const fakeInfo = {location: 'United States', birthday: 'April 15', school: 'CUNY Baruch'}
    return (
        <div className="w-[75vw] mx-[10vw] pt-[6vh] grid grid-cols-2">
            <div className="flex flex-col gap-8">
                <div className="p-4 max-w-[30vw] bg-white rounded shadow-md flex flex-col gap-2">
                    <h2 className="text-xl font-medium">Intro</h2>
                    <p className="flex gap-1">Birthday on <p className="font-medium">{fakeInfo.birthday}</p></p>
                    <p className="flex gap-1">Lives in <p className="font-medium">{fakeInfo.location}</p></p>
                    <p className="flex gap-1">Studied at <p className="font-medium">{fakeInfo.school}</p></p>
                </div>
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
                <Post/>
            </div>
        </div>
    )
}

export default ProfileContent