import { useRef } from "react"
import { useState, useEffect, useContext } from "react"
import { LoginContext } from "./logincontext"
import {Link} from 'react-router-dom'

const Searchbar = ( {search, setSearch} ) => {
    const { userList } = useContext(LoginContext)
    const [ result, setResult ] = useState([])
    const searchRef = useRef(null)

    const closeSearchMenu = (e) => {
        if (searchRef.current && search !== '' && !searchRef.current.contains(e.target)) {
          setSearch('')
        }
    }
    useEffect(() => {
     document.addEventListener("mousedown", closeSearchMenu);
      }, [closeSearchMenu]);


    useEffect(() => {
        setResult(userList.filter(user => user.full_name.includes(search)))
    }, [search])
    
    if (search !== '') {
        return (
            <div className="h-[40vh] absolute top-14 z-30 bg-white p-4 w-[20vw] rounded-md shadow-md overflow-scroll" ref={searchRef}>
                {result.map(res => {
                    return (
                        <Link to={`/profiles/${res.id}`} key={res.id}>
                        <li className="flex flex-row gap-1 hover:bg-slate-100 rounded-md p-2">
                            <img src={res.avatar} alt="User icon"/>
                            {res.full_name}
                        </li>            
                        </Link>
                    )
                })}
            </div>
        )
    }
}

export default Searchbar