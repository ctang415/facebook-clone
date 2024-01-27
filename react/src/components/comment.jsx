import Send from '../assets/send.svg';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { LoginContext } from './logincontext';
import { decode } from 'html-entities';
import MoreSettings from '../assets/more.svg';
import CommentsModal from './commentsmodal';
import { Link, useNavigate } from 'react-router-dom';
import AlwaysScrollToBottom from './scrolltobottom';

const Comment = ({id, postId, comments}) => {
    const { userData, fetchUser, refreshToken, setLogin } = useContext(LoginContext);
    const [ newComment, setNewComment ] = useState('');
    const [ commentModal, setCommentModal] = useState(false);
    const [ commentEdit, setCommentEdit] = useState(false);
    const [ commentId, setCommentId] = useState('');
    const navigate = useNavigate();

    const createComment = async (e) => {
        e.preventDefault();
        const myComment = { message: newComment, author: userData._id, id: id}
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${postId}/comments`, {
                method:'POST', headers: {'Content-type': 'application/json'}, credentials: 'include',
                body: JSON.stringify(myComment)
            });
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken(e, createComment);
                } else if (response.status === 404) {
                    setLogin(false);
                    setNewComment('');
                    navigate('/');
                } else {
                    throw await response.json();
                }
            }
            await response.json();
            if (response.status === 200) {
                alert('Successfully created comment');
                fetchUser();
                setNewComment('');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateComment = async (e) => {
        e.preventDefault();
        const updatedComment = { message: newComment }
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${postId}/comments/${commentId}`, {
                method: 'PUT', headers: {'Content-type': 'application/json'}, credentials: 'include',
                body: JSON.stringify(updatedComment)
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken(e, updateComment);
                } else if (response.status === 404) {
                    setLogin(false);
                    setCommentEdit(false);
                    setNewComment('');
                    navigate('/');
                } else {
                    throw await response.json();
                }
            }
            await response.json();
            if (response.status === 200) {
                fetchUser();
                setCommentEdit(false);
                setNewComment('');
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2 max-h-[25vh] overflow-scroll'>
                {comments.map(comment => {
                    return (
                        <div className='flex flex-row gap-1' key={comment._id}>
                            <CommentsModal postId={postId} comment={comment} commentModal={commentModal} setCommentModal={setCommentModal} 
                            commentEdit={commentEdit} setCommentEdit={setCommentEdit} commentid={comment._id} setCommentId={setCommentId} commentId={commentId}/>
                            <img src={comment.author.avatar} alt="User icon" className='min-w-[2vw] max-h-[3vh] self-start mt-4'></img>
                            <div className='bg-slate-100 rounded-xl p-3 min-w-[37vw] flex flex-col'>
                                <Link to={`/profiles/${comment.author.id}`}>
                                    <p className='font-bold'>{comment.author.full_name}</p>
                                </Link>
                                <div className='flex flex-row items-center'>
                                    <p className={ commentEdit ? 'hidden' : 'break-normal'}>{decode(comment.message)}</p>    
                                    <form className={commentEdit ? 'flex min-w-[82%] gap-1 items-center' : 'hidden' } onSubmit={updateComment}>
                                        <input className={'p-1 min-w-[82%]'} type="text" defaultValue={ newComment === '' ? decode(comment.message) : newComment} onChange={(e) => setNewComment(e.target.value)}></input>
                                        <p className={commentEdit ? 'flex text-blue-500 cursor-pointer' : 'hidden' } onClick={() => setCommentEdit(false)}>Cancel</p>
                                        <button className='min-w-fit' type="submit">
                                            <img className={ newComment !== '' && newComment !== decode(comment.message) ? 'flex min-w-[2vw] max-h-[3vh]' : 'hidden'} src={Send} alt="Send icon"/>
                                        </button>
                                    </form>
                                    <img onClick={() => setCommentModal(true)} className={ comment.author.id === userData.id && !commentEdit ? 'flex cursor-pointer hover:bg-slate-200 rounded-full' : 'hidden'} src={MoreSettings} alt="More settings icon"></img>
                                </div>
                            </div>
                        </div>  
                    )
                })}
            </div>
            <form className='flex flex-row gap-2 min-w-fit' onSubmit={createComment}>
                    <img className='max-w-[3vh]' src={userData.avatar} alt="User icon"></img>
                    <input type="text" placeholder='Write a comment...' className='min-w-[82%] bg-slate-100 rounded-xl p-2' onChange={(e) => setNewComment(e.target.value)} value={newComment} required></input>
                    <button className='min-w-fit' type="submit" disabled={ newComment === '' ? true : false}>
                        <img className='min-w-[2vw]' src={Send} alt="Send icon"/>
                    </button>
            </form>
        </div>
    )
}

export default Comment