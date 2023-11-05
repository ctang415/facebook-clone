import { useRef } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { LoginContext } from "./logincontext"

const SettingsModal = () => {
    const { settingMenu, setSettingMenu, setEditPost, setModal} = useContext(LoginContext)
    const settingRef = useRef(null)

    const closeSettingMenu = (e) => {
        if (settingRef.current && settingMenu && !settingRef.current.contains(e.target)){
          setSettingMenu(false)
        }
    }

    const edit = () => {
        setSettingMenu(false)
        setEditPost(true)
        setModal(true)
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeSettingMenu);
      }, [closeSettingMenu]);

    if (settingMenu) {
        return (
            <ul className='absolute bg-white rounded-lg gap-2 flex flex-col shadow-xl z-4 ml-[35vw] mt-[5vh] border-2'
            ref={settingRef}>
                <li onClick={() => edit()} className="p-2 hover:bg-slate-100 cursor-pointer">Edit Post</li>
                <li className="p-2 hover:bg-slate-100 cursor-pointer">Delete Post</li>
            </ul>
        )
    }
}

export default SettingsModal