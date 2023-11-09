import { useRef } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { LoginContext } from "./logincontext"

const SettingsModal = ({settingMenu, setSettingMenu, post}) => {
    const { setEditPost, setModal} = useContext(LoginContext)
    const settingRef = useRef(null)

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

    useEffect(() => {
     document.addEventListener("mousedown", closeSettingMenu);
      }, [closeSettingMenu]);

    if (settingMenu) {
        return (
            <ul className='absolute bg-white rounded-lg gap-2 flex flex-col shadow-xl z-4 border-2 right-1'
            ref={settingRef}>
                <li ref={settingRef} onClick={() => editPost()} className="p-2 hover:bg-slate-100 cursor-pointer">Edit Post</li>
                <li className="p-2 hover:bg-slate-100 cursor-pointer">Delete Post</li>
            </ul>
        )
    }
}

export default SettingsModal