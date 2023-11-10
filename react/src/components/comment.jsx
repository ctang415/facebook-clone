import Send from '../assets/send.svg'
import { useState } from 'react'
import { useContext } from 'react'
import { LoginContext } from './logincontext'
import { decode } from 'html-entities'
import MoreSettings from '../assets/more.svg'
import CommentsModal from './commentsmodal'

const Comment = ({id, postId, comments}) => {
    const { userData, fetchUser } = useContext(LoginContext)
    const [ comment, setComment ] = useState('')
    const [ commentModal, setCommentModal] = useState(false)
    const [ commentEdit, setCommentEdit] = useState(false)
    const [ commentId, setCommentId] = useState('')

    const createComment = async (e) => {
        e.preventDefault()
        const newComment = { message: comment, author: userData._id, id: id}
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${postId}/comments`, {
                method:'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(newComment)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Successfully created comment')
                setComment('')
                fetchUser()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const updateComment = async (e, id) => {
        e.preventDefault()
        const updatedComment = { message: comment }
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${postId}/comments/${commentId}`, {
                method: 'PUT', headers: {'Content-type': 'application/json'}, body: JSON.stringify(updatedComment)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                fetchUser()
                setCommentEdit(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-3'>
                {comments.map(comment => {
                    return (
                <div className='flex flex-row gap-1' key={comment._id}>
                <CommentsModal postId={postId} comment={comment} 
                commentModal={commentModal} setCommentModal={setCommentModal} commentEdit={commentEdit} setCommentEdit={setCommentEdit} 
                commentid={comment._id} setCommentId={setCommentId} commentId={commentId}/>
                <img src={comment.author.avatar} alt="User icon" className='min-w-[2vw] self-start mt-4'></img>
                <div className='bg-slate-100 rounded-xl p-3 min-w-[37vw]'>
                    <p className='font-bold'>{comment.author.full_name}</p>
                    
                    <p className={ commentEdit ? 'hidden' : 'break-normal'}>{decode(comment.message)}</p>
                    <form className={commentEdit ? 'flex min-w-[82%]' : 'hidden'} onSubmit={updateComment}>
                        <input className={ 'min-w-[82%]'} type="text" defaultValue={decode(comment.message)} onChange={(e) => setComment(e.target.value)}></input>
                        <button className='min-w-fit' type="submit">
                            <img className='min-w-[2vw]' src={Send} alt="Send icon"/>
                        </button>
                    </form>
                    <div className='group'>
                        <img onClick={() => setCommentModal(true)}
                        className={ comment.author.id === userData.id ? 'group-hover: block' : 'hidden'} src={MoreSettings} alt="More settings icon"></img>
                    </div>
                </div>
                </div>  
                    )
                })}
                <form className='flex flex-row gap-2 min-w-fit' onSubmit={createComment}>
                    <img className='min-w-[2vw]' src={userData.avatar} alt="User icon"></img>
                    <input type="text" placeholder='Write a comment...' className='min-w-[82%] bg-slate-100 rounded-xl p-2' 
                    onChange={(e) => setComment(e.target.value)} required></input>
                    <button className='min-w-fit' type="submit" disabled={ comment === '' ? true : false}>
                    <img className='min-w-[2vw]' src={Send} alt="Send icon"/>
                    </button>
                </form>
            </div>
        </div>
    )

}

export default Comment