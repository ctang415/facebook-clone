import Send from '../assets/send.svg'
import User from '../assets/account.svg'
import { useState } from 'react'
import { useContext } from 'react'
import { LoginContext } from './logincontext'

const Comment = ({id, postId, comments}) => {
    const { userData } = useContext(LoginContext)
    const [ comment, setComment ] = useState('')
    
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
                <img src={comment.author.avatar} alt="User icon" className='min-w-[2vw] self-start mt-4'></img>
                <div className='bg-slate-100 rounded-xl p-3 min-w-[37vw]'>
                    <p className='font-bold'>{comment.author.full_name}</p>
                    <p className='break-normal'>{comment.message}</p>
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