import { useRef } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { LoginContext } from "./logincontext"

const CommentsModal = ({ postId,
    commentModal, setCommentModal, comment, commentEdit, setCommentEdit, commentid, setCommentId}) => {
    const { userData, fetchUser} = useContext(LoginContext)
    const commentRef = useRef(null)

    const closeCommentMenu = (e) => {
        if (commentRef.current && commentModal && !commentRef.current.contains(e.target)) {
          setCommentModal(false)
        }
    }

    const editComment = () => {
        setCommentModal(false)
        setCommentEdit(true)
        setCommentId(commentid)
    }

    const deleteComment = async () => {
        console.log(comment)
        try {
            const response = await fetch (`http://localhost:3000${userData.url}${postId}${comment.url}`, {
                method: 'DELETE', headers: {'Content-type': 'application/json'}
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Post successfully deleted')
                fetchUser()
                setCommentModal(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
     document.addEventListener("mousedown", closeCommentMenu);
      }, [closeCommentMenu]);

    if (commentModal) {
        return (
            <ul className='absolute bg-white rounded-lg gap-2 flex flex-col shadow-xl z-4 border-2'
            ref={commentRef}>
                <li onClick={() => editComment()} className="p-2 hover:bg-slate-100 cursor-pointer">Edit</li>
                <li onClick={() => deleteComment() } className="p-2 hover:bg-slate-100 cursor-pointer">Delete</li>
            </ul>
        )
    }
}

export default CommentsModal