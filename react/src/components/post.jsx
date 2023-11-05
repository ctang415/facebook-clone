import User from '../assets/account.svg'
import Like from '../assets/like.svg'
import CommentIcon from '../assets/comment.svg'
import Comment from './comment'
import Settings from '../assets/more.svg'
import { useContext } from 'react'
import { LoginContext } from './logincontext'
import SettingsModal from './settingsmodal'

const Post = () => {
    const { editPost, setEditPost, setModal, modal, settingMenu, setSettingMenu }  = useContext(LoginContext)

    return (
        <>
            <SettingsModal/>
            <div className='p-2 gap-3
            flex flex-col min-w-[42.5vw] max-w-[42.5vw] rounded border-2 border-slate-50 shadow-xl bg-white'>
                <div className='flex flex-row justify-between gap-2'>
                    <div className='flex gap-2'>
                    <img src={User} alt="User icon"/>
                    <p className='font-bold'>My Name</p>
                    </div>
                    <div>
                        <img className='cursor-pointer hover:bg-slate-100 rounded-md' onClick={() => setSettingMenu(true)} src={Settings} alt="Settings icon"/>
                    </div>
                </div>
                <div>
                    <p>Message</p>
                    <div className='flex justify-between gap-2'>
                    <div>
                        # Likes
                    </div>
                    <div>
                        # Comments
                    </div>
                    </div>
                </div>
                <div className='flex flex-row justify-around border-y-2 p-2'>
                    <div className='flex gap-2 hover:bg-slate-200 cursor-pointer p-1'>
                        <img src={Like} alt="Like icon"/> Like
                    </div>
                    <div className='flex gap-2 hover:bg-slate-200 cursor-pointer p-1'>
                    <img src={CommentIcon} alt="Comment icon"/> Comment
                    </div>
                </div>
                <Comment/>
            </div>
        </>
    )
}

export default Post