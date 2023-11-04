import Send from '../assets/send.svg'
import User from '../assets/account.svg'
import Message from './message'
import { useState } from 'react'

const CreateMessage = ( {messageModal, setMessageModal}) => {
    const [ messageSender, setMessageSender ] = useState('')
    
    if (messageModal) {
        return (
            <div className="p-4 fixed right-20 bottom-1 bg-white min-h-[65vh] max-h-[65vh] min-w-[20vw] max-w-[20vw] shadow-2xl rounded">
                <div className="flex flex-row items-center">
                    <p>New message</p>
                    <button onClick={() => setMessageModal(false)} 
                        type="button" className="text-blue-600 bg-transparent hover:bg-gray-200 rounded-full text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                    </button>
                </div>
                <form>
                    <div className="flex gap-2 border-b-2">
                        To:
                        <label htmlFor="user"></label>
                        <input type="text" name="user" onChange={(e) => setMessageSender(e.target.value)}></input>
                    </div>
                    <div className={ messageSender !== '' ? 'flex flex-col items-center min-h-[50vh] max-h-[50vh] overflow-scroll p-2' : 'hidden'}>
                        <img src={User} alt="User icon"></img>
                        <h3 className='font-bold'>My Name</h3>
                        <ul className='flex flex-col gap-3'>
                            <Message/>
                        </ul>
                    </div>
                    <div className={ messageSender !== '' ? 'flex flex-row gap-2 items-center': 'hidden'}>
                        <input className='p-1 min-w-[15vw] rounded-full bg-slate-100' type="text"></input>
                        <img className='cursor-pointer hover:bg-slate-200 p-1 rounded-full' src={Send} alt="Send icon"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateMessage