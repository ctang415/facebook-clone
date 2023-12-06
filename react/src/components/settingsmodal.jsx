import { useRef } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { LoginContext } from "./logincontext"

const SettingsModal = ({settingMenu, setSettingMenu, post}) => {
    const { setLogin, setEditPost, setModal, userData, fetchUser, refreshToken} = useContext(LoginContext)
    const settingRef = useRef(null)
    const navigate = useNavigate()

    const closeSettingMenu = (e) => {
        if (settingRef.current && settingMenu && !settingRef.current.contains(e.target)) {
          setSettingMenu(false)
        }
    }

    const editPost = () => {
        setSettingMenu(false)
        setEditPost(post)
        setModal(true)
    }

    const deletePost = async (e) => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${post.url}`, {
                method: 'DELETE', headers: {'Content-type': 'application/json'}, credentials: 'include'
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken(e, deletePost)
                } else if (response.status === 404) {
                    setLogin(false)
                    navigate('/')
                } else {
                throw await response.json()
                }
            }
            await response.json()
            if (response.status === 200) {
                alert('Post successfully deleted')
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
     document.addEventListener("mousedown", closeSettingMenu);
      }, [closeSettingMenu]);

    if (settingMenu) {
        return (
            <ul className='absolute bg-white rounded-lg gap-2 flex flex-col shadow-xl z-4 border-2 right-1'
            ref={settingRef}>
                <li ref={settingRef} onClick={() => editPost()} className="p-2 hover:bg-slate-100 cursor-pointer">Edit Post</li>
                <li onClick={() => deletePost() } className="p-2 hover:bg-slate-100 cursor-pointer">Delete Post</li>
            </ul>
        )
    }
}

export default SettingsModal