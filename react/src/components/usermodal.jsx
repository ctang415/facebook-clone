import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import User from '../assets/account.svg'

const UserModal = ( {userModal, setUserModal}) => {
    const userMenuRef = useRef(null)

    const logout = () => {
        setUserModal(false)
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
                <Link to={`/profiles/profiles`} onClick={() => setUserModal(false)}>
                <li className="p-4 cursor-pointer hover:bg-slate-100 rounded-md shadow-lg border-[1px]
                font-medium flex flex-row gap-2">
                    <img src={User} alt="User icon"></img>
                    My account
                </li>
                </Link>
                <li className="p-4 cursor-pointer hover:bg-slate-100 rounded-md">Settings & privacy</li>
                <li className="p-4 cursor-pointer hover:bg-slate-100 rounded-md">Log Out</li>
            </ul>
        )
        }
}

export default UserModal