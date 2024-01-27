import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./logincontext";

const ProfileModal = ({setProfileEdit, profileEdit}) => {
    const { userData, fetchUser, setLogin, refreshToken } = useContext(LoginContext);
    const navigate = useNavigate();
    const [ errors, setErrors ] = useState([]);
    const [ firstName, setFirstName ] = useState(userData.first_name);
    const [ lastName, setLastName ] = useState(userData.last_name);
    const [ email, setEmail ] = useState(userData.email);
    const [ password, setPassword] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
   
    const updatedProfile = async (e) => {
        setErrors([]);
        e.preventDefault();
        let updatedInformation;
        if (newPassword === '') {
            updatedInformation = { 
            first_name: firstName, last_name: lastName, email: email, 
            password: password, new_password: password
            }
        } else {
            updatedInformation = { 
            first_name: firstName, last_name: lastName, email: email, 
            password: password, new_password: newPassword
        }
    }
        try {
            const response = await fetch(`http://localhost:3000${userData.url}`, {
                method: 'PUT', headers: {'Content-type': 'application/json'}, credentials: 'include',
                body: JSON.stringify(updatedInformation)
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken(e, updatedProfile);
                } else if(response.status === 404) {
                    setLogin(false);
                    setProfileEdit(false);
                    navigate('/');
                } else {
                    throw await response.json();
                }
            }
            await response.json();
            if (response.status === 200) {
                alert('Successfully updated profile!');
                fetchUser();
                setEmail(userData.email);
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setPassword('');
                setNewPassword('');
                setProfileEdit(false);
            }
        } catch (err) {
            console.log(err);
            setErrors(err.errors);
        }
    }

    const resetForm = () => {
        setProfileEdit(false);
        setEmail(userData.email);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setPassword('');
        setNewPassword('');
        setErrors([]);
    }
    
    const deleteAccount = async (e) => {
        try {
            const response = await fetch (`http://localhost:3000${userData.url}`, {
                method :'DELETE', headers: {'Content-type': 'application/json'}, credentials: 'include'
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken(e, deleteAccount);
                } else if (response.status === 404) {
                    setLogin(false);
                    navigate('/');
                } else {
                    throw await response.json();
                }
            }
            await response.json();
            if (response.status === 200) {
                setLogin(false);
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }
    }
    
    if (profileEdit) {
        return (
            <dialog open className="fixed z-10">
            <div className="fixed inset-0 bg-black/50"/>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex items-center border-b-2 p-2">
                            <p className="text-lg font-bold leading-6 text-gray-900">
                                Edit Profile
                            </p>
                            <button onClick={() => resetForm() } 
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                        <form className="mt-2 gap-4 flex flex-col" encType="multipart/form-data" onSubmit={updatedProfile}>
                            <div className='flex justify-center gap-2'>
                                <input type="text" className="rounded-md p-2 border-2 bg-slate-100" value={ firstName === userData.first_name ? userData.first_name : firstName}
                                onChange={(e) => setFirstName(e.currentTarget.value)} placeholder="First name" />
                                <input type="text" className="rounded-md p-2 border-2 bg-slate-100" value={ lastName === userData.last_name ? userData.last_name : lastName}
                                onChange={(e) => setLastName(e.currentTarget.value)} placeholder="Last name"/>
                            </div>
                            <input type="email" className="rounded-md p-2 border-2 bg-slate-100" value={ email === userData.email ? userData.email : email}
                            onChange={(e) => setEmail(e.currentTarget.value)} placeholder="Email"/>
                            <input type="password" className="rounded-md p-2 border-2 bg-slate-100" onChange={(e) => setPassword(e.currentTarget.value)}
                            placeholder="Password" required/>
                            <input type="password" className="rounded-md p-2 border-2 bg-slate-100" onChange={(e) => setNewPassword(e.currentTarget.value)}
                            placeholder="New Password"/>
                            <button className="p-2 rounded-md bg-red-500 text-white font-bold" onClick={() => deleteAccount()}>Delete account</button>
                            <div className="mt-4">
                                <button type="submit" className="inline-flex min-w-full justify-center rounded-md border border-transparent text-white bg-green-600 px-4 py-2 text-sm font-medium hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                        {errors.map(error => {
                            return (
                                <li key={error.msg} className="text-red-500">{error.msg}</li>
                            )
                        })}
                    </div>
                </div>
            </div>
        </dialog>
        )
    }
}

export default ProfileModal