import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center gap-6 my-40">
            <h1 className="text-4xl">
                Page not found
            </h1>
            <button className="p-2 px-8 rounded-md bg-blue-600 text-white hover:bg-blue-700" onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
}

export default Error