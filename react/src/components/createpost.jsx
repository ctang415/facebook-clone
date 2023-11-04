import { useState, useRef, useEffect } from 'react'
import User from '../assets/account.svg'

const CreatePost = ({modal, setModal}) => {
    const postRef = useRef(null)
    const [ post, setPost ] = useState('')

    const closePostMenu = (e) => {
        if (postRef.current && modal && !postRef.current.contains(e.target)){
          setModal(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closePostMenu);
      }, [closePostMenu]);
    
    if (modal) {
        return (
            <dialog open className="relative z-10">
                <div className="fixed inset-0 bg-black/50" ref={postRef} />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <div className="flex items-center border-b-2 p-2">
                                <p className="text-lg font-bold leading-6 text-gray-900">
                                    Create Post
                                </p>
                                <button onClick={() => setModal(false)} 
                                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </button>
                            </div>
                            <form className="mt-2 gap-4 flex flex-col">
                                <div className='flex gap-2'>
                                    <img src={User} alt="User icon"/>
                                    <p>My name</p>
                                </div>
                                <div>
                                    <textarea className='min-w-full resize-none' rows='5' onChange={(e) => setPost(e.target.value)} placeholder='What is on your mind?'></textarea>
                                </div>
                                <div className="mt-4">
                                    <button type="submit" disabled={ post === '' ? true : false} className={ post === '' ? 
                                    "inline-flex min-w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-white " :
                                    "inline-flex min-w-full justify-center rounded-md border border-transparent text-white bg-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-600"}
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        )
    }
}

export default CreatePost