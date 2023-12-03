import { useContext } from "react"
import { useState } from "react"
import { LoginContext } from "./logincontext"

const AvatarModal = ( {avatarEdit, setAvatarEdit} ) => {
    const { userData, fetchUser, refreshToken } = useContext(LoginContext)
    const [ avatar, setAvatar ] = useState(null)
    const [ errors, setErrors ] = useState([])

    const updatedAvatar = async (e) => {
        setErrors([])
        e.preventDefault()
           const data = new FormData();
            data.append("avatar", avatar);
        try {
            const response = await fetch (`http://localhost:3000${userData.url}/avatar`, {
                method: 'PUT', credentials: "include", body: data
            })
            if (!response.ok) {
                if (response.status === 403) {
                    refreshToken()
                } else {
                    throw await response.json()
                }
            }
            await response.json()
            if (response.status === 200) {
                alert('Successfully updated profile!')
                fetchUser()
                setAvatar(null)
                setAvatarEdit(false)
            }
        } catch (err) {
            console.log(err)
            setErrors(err.errors)
        }
    }
    
    if (avatarEdit) {
        return (
            <dialog open className="fixed z-10">
            <div className="fixed inset-0 bg-black/50"/>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex items-center border-b-2 p-2">
                            <p className="text-lg font-bold leading-6 text-gray-900">
                                Edit Avatar
                            </p>
                            <button onClick={() => {setAvatarEdit(false); setErrors([])} } 
                            type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                        <form className="mt-2 gap-4 flex flex-col" encType="multipart/form-data" onSubmit={updatedAvatar}>
                            <input className="min-w-fit self-center" type="file" name="avatar" onChange={(e) => setAvatar(e.target.files[0])}/>
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

export default AvatarModal