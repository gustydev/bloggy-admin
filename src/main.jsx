import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import ErrorPage from './components/errorPage/ErrorPage.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import Post from './components/post/Post.jsx';
import NewPost from './components/post/new/NewPost.jsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      { path: 'login', element: <Login/>},
      { path: 'register', element: <Register/>},
      { element: <ProtectedRoute/>, children: [
        { index: true, element: <Dashboard/> },
        { path: 'post/:postId', element: <Post/> },
        { path: 'post/new', element: <NewPost/>}
      ]}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
