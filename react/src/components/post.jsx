import User from '../assets/account.svg'
import Like from '../assets/like.svg'
import Comment from '../assets/comment.svg'

const Post = () => {
    
    return (
        <>
            <div className='p-2 gap-3
            flex flex-col min-w-[42.5vw] max-w-[42.5vw] rounded border-2 border-slate-50 shadow-xl bg-white'>
                <div className='flex flex-row gap-2'>
                    <img src={User} alt="User icon"/>
                    <p className='font-bold'>My Name</p>
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
                        <img src={Comment} alt="Comment icon"/> Comment
                        </div>
                </div>
            </div>
        </>
    )
}

export default Post