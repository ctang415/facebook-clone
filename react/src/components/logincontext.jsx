import { createContext } from "react"

export const LoginContext = createContext(
    {
        userData: null,
        setUserData: () => {},
        login: null,
        setLogin: () => {},
        userModal: null,
        setUserModal: () => {},
        editPost: null,
        setEditPost: () => {},
        modal: null,
        setModal: () => {},
        messageModal: null,
        setMessageModal: () => {},
        settingMenu: null,
        setSettingMenu: () => {},
        friendsRequest: null,
        setFriendsRequest: () => {},
        allFriends: null,
        setAllFriends: () => {}
    }
)