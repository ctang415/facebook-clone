import Send from '../assets/send.svg'
import User from '../assets/account.svg'
import { useState } from 'react'

const Comment = () => {
    const [ comment, setComment ] = useState('')

    return (
        <div className='flex gap-2'>
            <img src={User} alt="User icon" className='min-h-[5vh]'></img>
            <div className='flex flex-col gap-3'>
            <div className='flex flex-col bg-slate-100 rounded-xl p-3'>
            <p className='font-bold'>My name</p>
            <p className='break-normal'>Here is my message but what if it gets longer and longer? then what happens</p>
            </div>
            <form className='flex flex-row min-w-full gap-2'>
                <input type="text" placeholder='Write a comment...' className='bg-slate-100 min-w-[35vw] rounded-xl p-2'></input>
                <button className='min-w-fit' type="submit" disabled={ comment === '' ? true : false}>
                    <img src={Send} alt="Send icon"/>
                </button>
            </form>
            </div>
        </div>
    )

}

export default Comment