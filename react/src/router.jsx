import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './components/home'
import Register from './components/register'
import Error from './components/error'
import Profile from './components/profile'
import Post from './components/post'
import Friends from './components/friends'

const Router = () => {
    const router = createBrowserRouter (
        [
            {
                element: <App/>,
                errorElement: <Error/>,
                children: [
                    {
                        path: '/',
                        element: <Home/>
                    },
                    {
                        path: '/register',
                        element: <Register/>
                    },
                    {
                        path: '/posts/:postid',
                        element: <Post/>
                    },
                    {
                        path: '/profiles/:profileid',
                        element: <Profile/>
                    },
                    {
                        path: '/friends',
                        element: <Friends/>
                    }
                ]
            }
        ]
    )
    return <RouterProvider router={router}/>
}

export default Router