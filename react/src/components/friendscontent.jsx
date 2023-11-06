import { useContext } from "react"
import { LoginContext } from "./logincontext"

const FriendsContent = () => {
    const { allFriends, friendsRequest } = useContext(LoginContext)
    const friends = []

    if (allFriends && !friendsRequest) {
        return (
            <>
            <div className={ friends.length ===0 ? "none" : "flex min-h-screen items-center w-screen"}>
                {friends.map(friend => {
                    return (
                        <li>{friend}</li>
                    )
                })}
            </div>
            <div className={ friends.length === 0 ? "flex flex-col min-h-screen w-screen justify-center items-center" : "none"}>
                <h2 className="text-xl font-bold">
                    No friends to show
                </h2>
                <p>When you become friends with people on Odinbook, they'll appear here</p>
            </div>
            </>
        )
    } else if (friendsRequest && !allFriends) {
        return (
            <div className="min-h-screen flex items-center justify-center w-screen">
                <h3 className="text-xl">
                When you have friend requests or suggestions, you'll see them here.
                </h3>
            </div>
        )
    } else {
        return (
            <div className="min-h-screen flex items-center w-screen justify-center">
                <h3 className="text-xl">
                When you have friend requests or suggestions, you'll see them here.
                </h3>
            </div>
        )
    }
}

export default FriendsContent