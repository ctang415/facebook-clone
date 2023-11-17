import Like from '../assets/like.svg'
import CommentIcon from '../assets/comment.svg'
import Comment from './comment'
import Settings from '../assets/more.svg'
import { useContext, useState, useEffect } from 'react'
import { LoginContext } from './logincontext'
import SettingsModal from './settingsmodal'
import { decode } from 'html-entities'
import Liked from '../assets/liked.svg'
import { Link, useParams } from 'react-router-dom'

const Post = ( {post}) => {
    const { editPost, setEditPost, setModal, modal, userData, fetchUser }  = useContext(LoginContext)
    const [settingMenu, setSettingMenu] = useState(false)
    const params = useParams()

    useEffect (() => {
        console.log(post)
    }, [])
    
    const likePost = async () => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${post.url}/likes`, {
                method: 'POST', headers: {'Content-type': 'application/json'}
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const unlikePost = async () => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${post.url}/likes`, {
                method: 'DELETE', headers: {'Content-type': 'application/json'}
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <div className='relative'>
            <SettingsModal post={post} settingMenu={settingMenu} setSettingMenu={setSettingMenu}/> 
            <div className='p-2 gap-3
            flex flex-col min-w-[42.5vw] max-w-[42.5vw] rounded border-2 border-slate-50 shadow-xl bg-white'>
                <div className='flex flex-row justify-between gap-2'>
                    <Link to={`/profiles/${post.author.id}`}> 
                    <div className='flex gap-2'>
                    <img src={post.author.avatar} alt="User icon"/>
                    <p className='font-bold'>{post.author.full_name}</p>
                    </div>
                    </Link>
                    <div>
                        <img className={ userData.id === params.profileid ? 'cursor-pointer hover:bg-slate-100 rounded-md' : 'hidden'} onClick={() => setSettingMenu(true)} src={Settings} alt="Settings icon"/>
                    </div>
                </div>
                <div>
                    <p>{decode(post.message)}</p>
                    <div className='flex justify-between gap-2'>
                    <div>
                        {post.likes.length} Likes
                    </div>
                    <div>
                        {post.comments.length} Comment{ post.comments.length === 1 ? null : 's'}
                    </div>
                    </div>
                </div>
                <div className='flex flex-row justify-around border-y-2 p-2'>
                    <div onClick={ post.likes.includes(userData._id) ? () => unlikePost() : () => likePost()} className={ post.likes.includes(userData._id) ? 'flex gap-2 hover:bg-slate-200 cursor-pointer p-1 text-blue-500 font-bold' : 'flex gap-2 hover:bg-slate:200 cursor-pointer p-1' }>
                        <img src={ post.likes.includes(userData._id) ? Liked : Like} alt="Like icon"/> Like
                    </div>
                    <div className='flex gap-2 hover:bg-slate-200 cursor-pointer p-1'>
                        <img src={CommentIcon} alt="Comment icon"/> Comment
                    </div>
                </div>
                <Comment postId={post.url} id={post._id} comments={post.comments}/>
            </div>
        </div>
    )
    } 

export default Post