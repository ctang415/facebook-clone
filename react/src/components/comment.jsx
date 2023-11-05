import Send from '../assets/send.svg'
import User from '../assets/account.svg'
import { useState } from 'react'

const Comment = () => {
    const [ comment, setComment ] = useState('')

    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-row gap-1'>
                <img src={User} alt="User icon" className='min-w-[2vw] self-start mt-4'></img>
                <div className='bg-slate-100 rounded-xl p-3'>
                    <p className='font-bold'>My name</p>
                    <p className='break-normal'>Here is my message but what if it gets longer and longer? then what happens</p>
                </div>
                </div>  
                <form className='flex flex-row gap-2 min-w-fit'>
                    <img className='min-w-[2vw]' src={User} alt="User icon"></img>
                    <input type="text" placeholder='Write a comment...' className='min-w-[82%] bg-slate-100 rounded-xl p-2'></input>
                    <button className='min-w-fit' type="submit" disabled={ comment === '' ? true : false}>
                    <img className='min-w-[2vw]' src={Send} alt="Send icon"/>
                    </button>
                </form>
            </div>
        </div>
    )

}

export default Comment