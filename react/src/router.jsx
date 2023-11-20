import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Home from './components/home'
import Error from './components/error'
import Profile from './components/profile'
import Post from './components/post'
import Friends from './components/friends'
import Groups from './components/groups'
import Messenger from './components/messenger'

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
                        path: '/posts/:postid',
                        element: <Post/>
                    },
                    {
                        path: '/profiles/:profileid',
                        element: <Profile/>
                    },
                    {
                        path: '/groups',
                        element: <Groups/>
                    },
                    {
                        path: '/friends',
                        element: <Friends/>
                    },
                    {
                        path: '/messenger',
                        element: <Messenger/>
                    },
                    {
                        path: '/messenger/:messengerid',
                        element: <Messenger/>
                    }
                ]
            }
        ]
    )
    return <RouterProvider router={router}/>
}

export default Router