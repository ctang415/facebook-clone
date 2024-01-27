import { useState } from "react";
import moment from 'moment';
import User from '../assets/account.svg';

const Register = ({register, setRegister}) => {
    const [ errors, setErrors ] = useState([]);
    const [ firstName, setFirstName] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const [ birthday, setBirthday] = useState('');

    const clearForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setBirthday('');
    }

    const registerAccount = async (e) => {
        e.preventDefault();
        setErrors([]);
        const registerData = { first_name: firstName, last_name: lastName, email: email, password: password, birthdate: moment(birthday).format('YYYY-MM-DD'), avatar: User}
        try {
            const response = await fetch ('http://localhost:3000/users', {
            method: 'POST', headers: {'Content-type': 'application/json'}, body: JSON.stringify(registerData)})
            if (!response.ok) {
                throw await response.json();
            }
            await response.json();
            if (response.status === 200) {
                alert('Account successfully created!');
                setRegister(false);
                clearForm();
            }
        } catch (err) {
            setErrors(err.errors);
            console.log(err);
        }
    }

    if (register) {
        return (
            <dialog open className="fixed z-10">
            <div className="fixed inset-0 bg-black/50"/>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex items-center border-b-2 p-2">
                            <p className="text-lg font-bold leading-6 text-gray-900">
                                Sign Up
                            </p>
                            <button onClick={() => setRegister(false)} 
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                        <form className="mt-2 gap-4 flex flex-col" onSubmit={registerAccount}>
                            <div className='flex justify-center gap-2'>
                                <input type="text" className="rounded-md p-2 border-2 bg-slate-100" onChange={(e) => setFirstName(e.currentTarget.value)}
                                placeholder="First name" required/>
                                <input type="text" className="rounded-md p-2 border-2 bg-slate-100" onChange={(e) => setLastName(e.currentTarget.value)}
                                placeholder="Last name" required/>
                            </div>
                            <input type="email" className="rounded-md p-2 border-2 bg-slate-100" onChange={(e) => setEmail(e.currentTarget.value)}
                            placeholder="Email" required/>
                            <input type="password" className="rounded-md p-2 border-2 bg-slate-100" onChange={(e) => setPassword(e.currentTarget.value)}
                            placeholder="Password" required/>
                            <input type="date" className="border-2 p-2 rounded-md" onChange={(e) => setBirthday((e.currentTarget.value))}
                            required/>
                            <div className="mt-4">
                                <button type="submit" className="inline-flex min-w-full justify-center rounded-md border border-transparent text-white bg-green-600 px-4 py-2 text-sm font-medium hover:bg-green-700"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        {errors.map(error => {
                            return (
                                <li className="text-red-500">{error.msg}</li>
                            )
                        })}
                    </div>
                </div>
            </div>
        </dialog>

        )
    }
}

export default Register