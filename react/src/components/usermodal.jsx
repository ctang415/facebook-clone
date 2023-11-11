import { useContext, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import User from '../assets/account.svg'
import { LoginContext } from "./logincontext"

const UserModal = ( {userModal, setUserModal}) => {
    const { setLogin, userData } = useContext(LoginContext)
    const userMenuRef = useRef(null)

    const logout = async () => {
        setUserModal(false)
        try {
            const response = await fetch ('http://localhost:3000/logout', {
                method: 'POST', headers: {'Content-type': 'application/json'}
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Successfully logged out')
                setLogin(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const closeUserMenu = (e) => {
        if (userMenuRef.current && userModal && !userMenuRef.current.contains(e.target)){
          setUserModal(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeUserMenu);
      }, [closeUserMenu]);
    
    if (userModal) {
        return (
            <ul className="flex flex-col gap-4 bg-white absolute top-1 right-1 rounded-xl shadow-2xl my-16 p-4" ref={userMenuRef}>
                <Link to={`/profiles/${userData.id}`} onClick={() => setUserModal(false)}>
                <li className="p-4 cursor-pointer hover:bg-slate-100 rounded-md shadow-lg border-[1px]
                font-medium flex flex-row gap-2">
                    <img src={userData.avatar} alt="User icon"></img>
                    {userData.full_name}
                </li>
                </Link>
                <li className="p-4 cursor-pointer hover:bg-slate-100 rounded-md">Settings & privacy</li>
                <li onClick={() => logout()} className="p-4 cursor-pointer hover:bg-slate-100 rounded-md">Log Out</li>
            </ul>
        )
        }
}

export default UserModal